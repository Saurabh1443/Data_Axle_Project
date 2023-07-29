from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class personData(models.Model):
    title = models.CharField(max_length=200,blank=True)
    first_name = models.CharField(max_length=150,blank=True)
    middle_initial = models.CharField(max_length=150,blank=True)
    last_name = models.CharField(max_length=150,blank=True)
    address = models.CharField(max_length=200,blank=True)
    county = models.CharField(max_length=30,blank=True)
    city = models.CharField(max_length=30,blank=True)
    state = models.CharField(max_length=30,blank=True)
    age_range = models.CharField(max_length=10,blank=True)
    income_range = models.CharField(max_length=50,blank=True)
    gender: models.CharField(max_length=20,blank=True)
    zipcode: models.IntegerField()
    countycode: models.IntegerField()
    potential_investor = models.CharField(max_length=100,blank=True)
    hobbies = models.CharField(max_length=200,blank=True)
    language = models.CharField(max_length=100,blank=True)
    ethnicity = models.CharField(max_length=100,blank=True)
    marital_status = models.CharField(max_length=50,blank=True)
    home_owner = models.CharField(max_length=20,blank=True)
    neighborhood = models.CharField(max_length=200,blank=True)

    def __str__(self) -> str:
         return self.title

