from django.urls import path
from .views import Register,Login

urlpatterns = [
    path('api/register',Register, name="register"),
    path('api/login',Login, name="login"),
]