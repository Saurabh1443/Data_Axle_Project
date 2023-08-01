from django.contrib import admin
from django.urls import path
from .views import Person,person_detail , EmailGeneration

urlpatterns = [
    path('api/persons',Person, name="person"),
    path('api/persons/<int:id>',person_detail, name="person_detail"),
    path('api/persons/generateEmail/<int:id>',EmailGeneration, name="Email_Generation"),
    
    # path('api/login',person_detail, name="person_detail"),
]