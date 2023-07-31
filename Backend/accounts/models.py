from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import UserManager


# Create your models here.
class customUser(AbstractUser):
     username = None
     email = models.EmailField(unique=True,max_length=250)
     user_bio = models.CharField(max_length=50,blank=True,null=True)
     first_name = models.CharField(max_length=50)
     last_name =  models.CharField(max_length=30,blank=True,null=True)
     
     
     USERNAME_FIELD = 'email'
     REQUIRED_FIELDS=['first_name']

     objects = UserManager()

     def __str__(self) -> str:
         return self.first_name
