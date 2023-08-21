from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import personData,emailModel
from .serializer import PersonDataSerializer , OpenAiContextSerializer ,emailHandleSerializer
from django.core.paginator import Paginator
from .customPagination import customPagination
from .EmailGeneratorManager import responseGenerator
import openai
from django.core import serializers
import json
from django.core.mail import send_mail
from django.conf import settings


# handle api response
def handleResponse(error,result,success,status):
  return Response({
      "error":error,
      "result":result,
      "success":success ,
      "status":status
    })

@api_view(['GET'])
def Person(request):
 
 if request.method == "GET":   
  page_number = request.GET.get('page',1)
  limit = request.GET.get('limit',10)
  search_query = request.GET.get('name',"")
  try:
   allPerson = personData.objects.filter(first_name__contains=f'{search_query}')

   page_obj = Paginator(allPerson,limit)
   paginatedResult = customPagination(allPerson,page_obj,page_number)
   serializer = PersonDataSerializer(paginatedResult['results'], many=True) 
   return Response({
   "info": paginatedResult['pagination'],
    "status":status.HTTP_200_OK,
    "result":serializer.data,
    "success":True,
    "error":{}
   })
  except ValueError as ve:
    
    return handleResponse({"msg":f"{ve.args[0]}"},{},False,status.HTTP_404_NOT_FOUND)

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
    return handleResponse({"msg":"User does not exist"},{},False,status.HTTP_404_NOT_FOUND) 
  
  if request.method == 'GET':
    serializer = PersonDataSerializer(person)
    return handleResponse({},serializer.data,True,status.HTTP_200_OK) 
    
  
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
      openAiResponse =  responseGenerator(personSerializer.data ,Attributes )
      
      finalResponse = [vv["message"]["content"] for vv in openAiResponse]
      # finalResponse = json.loads(finalResponse)
     
      return handleResponse({},finalResponse,True,status.HTTP_200_OK)  
    else:
      return handleResponse(openAiSerializer.errors,{},False,status.HTTP_400_BAD_REQUEST) 
        
      
  except personData.DoesNotExist:
    return handleResponse({"msg":"User does not exist"},{},False,status.HTTP_404_NOT_FOUND) 
    
  except ValueError as ve:
    return handleResponse({"msg":f"{ve.args[0]}"},{},False,status.HTTP_404_NOT_FOUND)
    
  except openai.error.AuthenticationError as e:
    return handleResponse({"msg":"Incorrect Api Key provided"},{},False,status.HTTP_401_UNAUTHORIZED)
        
  except openai.error.Timeout as e:
    return handleResponse({"msg":"Service timed out! Try after some time"},{},False,status.HTTP_408_REQUEST_TIMEOUT)
    
  except openai.error.ServiceUnavailableError as e:
    return handleResponse({"msg":"Service unavailable ! Try after some time"},{},False,status.HTTP_503_SERVICE_UNAVAILABLE)

  except openai.error.RateLimitError as e:      
    return handleResponse({"msg":"Rate Limit ! Try after some time"},{},False,status.HTTP_425_TOO_EARLY)   
        
  except openai.error.InvalidRequestError as e:      
    return handleResponse({"msg":"Invalid data provided"},{},False,status.HTTP_404_NOT_FOUND)   
  
  except openai.error.APIError as e:      
    return handleResponse({"msg":"Having problem with OpenAi Api"},{},False,status.HTTP_400_BAD_REQUEST)   

  except Exception as e:
    print(e)
    return handleResponse({"msg":"Some error occured! Try after some time"},{},False,status.HTTP_500_INTERNAL_SERVER_ERROR)   

@api_view(['POST'])
def sendEmail(request):
  try:
    print("called")
    if request.method == 'POST':
        emailSerializer = emailHandleSerializer(data=request.data)

        if emailSerializer.is_valid():
            
            subject = emailSerializer.validated_data.get('subject')
            receiverEmail = emailSerializer.validated_data.get('receiverEmail')
            message = emailSerializer.validated_data.get('message')

            emailSerializer.save()
            
            from_email = settings.EMAIL_HOST_USER
            recipient_list = [receiverEmail]
            res = send_mail(
              subject,
              message,
              from_email,
              recipient_list=recipient_list,
              fail_silently=False,
            )
            return handleResponse({},res,True,status.HTTP_200_OK)  
        else:
           return handleResponse(emailSerializer.errors,{},False,status.HTTP_400_BAD_REQUEST) 
    
  except Exception as e:
   print(e)
   return handleResponse({"msg":"Some error occured! Try after some time"},{},False,status.HTTP_400_BAD_REQUEST) 
  
@api_view(['GET']) 
def allMails(request):
 
 if request.method == "GET":   
  try:
   allMail = emailModel.objects.all()
   serializer = emailHandleSerializer(allMail, many=True)
   return handleResponse({},serializer.data,True,status.HTTP_200_OK)
  except Exception as ve:
   return handleResponse({"msg":"some error occurred"},{},False,status.HTTP_404_NOT_FOUND)
