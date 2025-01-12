from django.forms import ValidationError
from rest_framework import serializers
from .models import ContactInfo

class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = "__all__"
    
    #validate if whatsapp number starts with country code and have not blank spaces
    def validate(self, data):
        try:
            whatsapp = data["whatsapp"]
            if whatsapp.startswith("+") == False:
                raise ValidationError(message="Country code most be included")
            if ' ' in whatsapp:
                raise ValidationError(message="Number cant include spaces")
        except ValidationError as e:
            raise serializers.ValidationError({"whatsapp":e.message}) 
        except:
            pass  
        return data
           