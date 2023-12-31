from django.contrib import admin
from django.urls import path
from .views import Person,person_detail , EmailGeneration , sendEmail,allMails,deleteMails

urlpatterns = [
    path('api/persons',Person, name="person"),
    path('api/persons/<int:id>',person_detail, name="person_detail"),
    path('api/persons/generateEmail/<int:id>',EmailGeneration, name="Email_Generation"),
    path('api/persons/sendEmail',sendEmail,name = "send-email"),
    path('api/persons/getMail',allMails,name = "allEmail"),
    path('api/persons/mail/delete/<int:id>',deleteMails,name = "deleteMail")
    # path('api/login',person_detail, name="person_detail"),
]