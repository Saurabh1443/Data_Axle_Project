from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializer import RegestrationSerializer , LoginSerializer
from django.contrib.auth import authenticate 

# Create your views here.

@api_view(['POST'])
def Register(request):
  serializer = RegestrationSerializer(data=request.data)
  if serializer.is_valid():
            serializer.save( )
            return Response({"result":serializer.data,"success":True ,"status":status.HTTP_201_CREATED})
  
  return Response({"error":serializer.errors,"success":False, "status":status.HTTP_400_BAD_REQUEST})


@api_view(['POST'])
def Login(request):
  serializer = LoginSerializer(data=request.data)
  if serializer.is_valid():
      email = serializer.data.get('email')
      password = serializer.data.get('password')
      user = authenticate(email = email,password = password)
      if user is None:
          return Response({"error":{"msg":f'User with the given email : " {email} " does not exist'},"success":False ,"status":status.HTTP_404_NOT_FOUND}) 
      return Response({"result":serializer.data,"success":True ,"status":status.HTTP_201_CREATED})
  
  return Response({"error":serializer.errors,"success":False, "status":status.HTTP_400_BAD_REQUEST})