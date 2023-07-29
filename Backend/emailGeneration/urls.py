from django.contrib import admin
from django.urls import path
from .views import Person,person_detail

urlpatterns = [
    path('api/persons/',Person, name="person"),
    path('api/persons/<int:id>',person_detail, name="person_detail"),
]