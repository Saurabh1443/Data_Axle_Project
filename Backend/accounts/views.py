from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializer import RegestrationSerializer , LoginSerializer 
from django.contrib.auth import authenticate 
from django.core.exceptions import ObjectDoesNotExist


# Handle Response object
def handleResponse(error,result,success,status):
  return Response({
      "error":error,
      "result":result,
      "success":success ,
      "status":status
    })

@api_view(['POST'])
def Register(request):
  serializer = RegestrationSerializer(data=request.data)
  if serializer.is_valid():
        serializer.save( )
        return handleResponse({},serializer.data,True,status.HTTP_201_CREATED) 
  
  return handleResponse(serializer.errors,{},False,status.HTTP_400_BAD_REQUEST) 

@api_view(['POST'])
def Login(request):
  serializer = LoginSerializer(data=request.data)
  
  if serializer.is_valid():
       email = serializer.data.get('email')
       password = serializer.data.get('password')
       
       try:
        check  = customUser.objects.get(email = email)
       except ObjectDoesNotExist:
           return handleResponse({"error":{"msg":f'User with the given email : " {email} " does not exist'}},{},False,status.HTTP_404_NOT_FOUND) 

       user = authenticate(email = email,password = password)
       if user is None:
          return handleResponse({"msg":"Wrong password given"},{},False,status.HTTP_401_UNAUTHORIZED) 
          
       return handleResponse({},serializer.data,True,status.HTTP_200_OK) 
      
  return handleResponse(serializer.errors,{},False,status.HTTP_400_BAD_REQUEST) 
