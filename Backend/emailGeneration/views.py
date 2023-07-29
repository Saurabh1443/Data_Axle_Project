from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import personData
from .serializer import PersonDataSerializer
from django.core.paginator import Paginator
from .customPagination import customPagination


@api_view(['GET'])
def Person(request):
 if request.method == "GET":
    page_number = request.GET.get('page',1)
    limit = request.GET.get('limit',15)
    search_query = request.GET.get('name',"")
    sort_query = request.GET.get("sort","asc")
    allPerson = personData.objects.filter(first_name__contains=f'{search_query}').order_by("first_name" if sort_query=="asc" else "-first_name")
    page_obj = Paginator(allPerson,limit)
    paginatedResult = customPagination(allPerson,page_obj,page_number)
    serializer = PersonDataSerializer(paginatedResult['results'], many=True) 
    return Response({
      "info": paginatedResult['pagination'],
         "status":status.HTTP_200_OK,
        "results":serializer.data
    })
 

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
         "result":serializer.data
        })
 

