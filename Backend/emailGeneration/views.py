from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import personData
from .serializer import PersonDataSerializer
from django.core.paginator import Paginator
from .customPagination import customPagination
from django.contrib.auth import get_user_model

user = get_user_model()

@api_view(['GET'])
def Person(request):
 if request.method == "GET":
    print(request.GET.get('limit'), "uuuuuuuuuu")
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
        "success":True 
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
         "status":status.HTTP_400_BAD_REQUEST,
         "results":serializer.data
        })
  if request.method == 'GET':
        serializer = PersonDataSerializer(person)
        return Response({
         "status":status.HTTP_200_OK,
         "result":serializer.data,
         "success":True 
        })
 
