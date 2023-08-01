from rest_framework import serializers
from .models import customUser

class RegestrationSerializer(serializers.ModelSerializer):
      
    class Meta:
        model = customUser
        extra_kwargs = {'password': {'write_only': True}}
        fields = ["email","first_name","user_bio","password","last_name"] # if you want all the fields of model to be rendered then simply write ; {fields: " all "}
    

    def create(self,validate_data):
        return customUser.objects.create_user(**validate_data)
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    

