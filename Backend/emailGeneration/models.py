from django.db import models
from django.utils import timezone


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
    gender= models.CharField(max_length=20,blank=True)
    zipcode= models.IntegerField()
    countycode= models.IntegerField()
    potential_investor = models.CharField(max_length=100,blank=True)
    hobbies = models.CharField(max_length=200,blank=True)
    language = models.CharField(max_length=100,blank=True)
    ethnicity = models.CharField(max_length=100,blank=True)
    marital_status = models.CharField(max_length=50,blank=True)
    home_owner = models.CharField(max_length=20,blank=True)
    neighbourhood = models.CharField(max_length=200,blank=True)
    estimated_household_income = models.CharField(max_length=200,blank=True)
    housing_type = models.CharField(max_length=200,blank=True)
    estimated_home_vale = models.CharField(max_length=100,blank=True)
    year_home_built = models.IntegerField()
    mail_order_purchase = models.CharField(max_length=1000,blank=True)
    actual_age =models.IntegerField()
    subject_interest = models.CharField(max_length=200,blank=True)
    birth_month = models.CharField(max_length=50,blank=True)
    number_of_children=models.IntegerField()
    veterans=models.CharField(max_length=10,blank=True)
    home_size=models.IntegerField()
    cosmectics=models.CharField(max_length=250,blank=True)
    magzines=models.CharField(max_length=100,blank=True)
    sports=models.CharField(max_length=100,blank=True)
    health=models.CharField(max_length=150,blank=True)
    motor_intrest=models.CharField(max_length=100,blank=True)
    outdoor_recreation=models.CharField(max_length=100,blank=True)
    personal_finance=models.CharField(max_length=50,blank=True)
    pet_animals=models.CharField(max_length=50,blank=True)
    photography=models.CharField(max_length=50,blank=True)
    politics=models.CharField(max_length=70,blank=True)
    purchase_behaviour=models.CharField(max_length=100,blank=True)
    technology_entertainment=models.CharField(max_length=100,blank=True)
    travel=models.CharField(max_length=80,blank=True)


    def __str__(self) -> str:
         return self.title


