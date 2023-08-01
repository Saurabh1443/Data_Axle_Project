from django.contrib.auth.models import BaseUserManager
from rest_framework.authtoken.models import Token


class UserManager(BaseUserManager):   
    def create_user(self , email, first_name, last_name=None, user_bio=None ,password = None, **extraFields):
        if not email:
         raise ValueError("Email is required")

        email = self.normalize_email(email)
        user = self.model(email = email, first_name = first_name ,last_name=last_name,user_bio = user_bio, **extraFields)
        user.set_password(password)
        user.save(self.db)
        # token = Token.objects.create(user=user)
        # user.token = token.key
        # print
        return user