from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import personData
from .serializer import PersonDataSerializer , OpenAiContextSerializer
from django.core.paginator import Paginator
from .customPagination import customPagination
from .EmailGeneratorManager import responseGenerator
from django.http import JsonResponse
import openai
import json

@api_view(['GET'])
def Person(request):
 if request.method == "GET":   
  page_number = request.GET.get('page',1)
  limit = request.GET.get('limit',10)
  search_query = request.GET.get('name',"")

  allPerson = personData.objects.filter(first_name__contains=f'{search_query}')

  page_obj = Paginator(allPerson,limit)
  paginatedResult = customPagination(allPerson,page_obj,page_number)
  serializer = PersonDataSerializer(paginatedResult['results'], many=True) 
  return Response({
   "info": paginatedResult['pagination'],
    "status":status.HTTP_200_OK,
    "results":serializer.data,
    "success":True,
    "error":{}
  })

  # if request.method=="POST":
  #       print(type(request.data), "jjjjjjjjjjj")
  #       for i in request.data:
  #       serializer = PersonDataSerializer(data=i) #Process is Deserializing       
  #      if serializer.is_valid():          
  #           serializer.save()
  #         else:
  #           return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  #        return Response(serializer.data, status=status.HTTP_201_CREATED)
       
@api_view(['GET'])
def person_detail(request,id):
  try:
   person = personData.objects.get(pk=id)

  except personData.DoesNotExist:
    return Response({
      "error":{"msg":"User does not exist"},
      "result":{},
      "success":False ,
      "status":status.HTTP_404_NOT_FOUND
    })
  
  if request.method == 'GET':
    serializer = PersonDataSerializer(person)
    return Response({
      "status":status.HTTP_200_OK,
      "result":serializer.data,
      "success":True ,
       "error":{}
    })
  
@api_view(['POST'])
def EmailGeneration(request , id):
  try:
    personal_information = personData.objects.get(pk=id)

    personSerializer  = PersonDataSerializer(personal_information)   
    openAiSerializer = OpenAiContextSerializer(data=request.data)

    if openAiSerializer.is_valid():
            
      productDescription = openAiSerializer.data.get('product_description')
      emailTone = openAiSerializer.data.get('email_tone')
      emailDescription = openAiSerializer.data.get('email_description')

      Attributes={"Product Description":productDescription,"Email Tone":emailTone,"Email Tone Description":emailDescription}
      finalResponse =  responseGenerator(personSerializer.data ,Attributes )
      
      return Response({
        'result': finalResponse,
        "success":True,
        "error":{},
        "status":status.HTTP_200_OK  
      })
        
    else:
      return Response({
        "error":openAiSerializer.errors,
        "success":False,
        "result":{}, 
        "status":status.HTTP_400_BAD_REQUEST
      })   
      
  except personData.DoesNotExist:
    return Response({
      "error":{"msg":"User does not exist"},
      "result":{},
      "success":False ,
      "status":status.HTTP_404_NOT_FOUND
    })
  except ValueError as ve:
    return Response({
      "error":{"msg":"Please, enter a valid product description."},
      "result":{},
      "success":False ,
      "status":status.HTTP_404_NOT_FOUND
    })
  except openai.error.AuthenticationError as e:
    return Response({
      "error":{"msg":"Incorrect Api Key provided"},
      "result":{},
      "success":False ,
      "status":status.HTTP_404_NOT_FOUND
    })      
  
  except openai.error.ServiceUnavailableError or openai.error.RateLimitError or openai.error.APIError as e:
    return Response({
      "error":{"msg":"Service unavailable! Try after some time"},
      "result":{},
      "success":False ,
      "status":status.HTTP_404_NOT_FOUND
    })      
        
        
  

 
