from rest_framework import serializers
from .models import personData

class PersonDataSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = personData
        fields = "__all__" # if you want all the fields of model to be rendered then simply write ; {fields: " all "}


class OpenAiContextSerializer(serializers.Serializer):
    product_description = serializers.CharField()
    email_tone = serializers.CharField() 
    email_description = serializers.CharField()  
    index = serializers.IntegerField() 
        