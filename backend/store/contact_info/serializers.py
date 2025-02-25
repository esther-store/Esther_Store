from django.forms import ValidationError
from rest_framework import serializers
from .models import ContactInfo
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError as DjangoValidationError
import re

class ContactInfoSerializer(serializers.ModelSerializer):
    whatsapp = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    
    class Meta:
        model = ContactInfo
        fields = "__all__"
    
    def validate(self, data):
        errors = {}
        
        # Email
        if 'email' in data and not data['email']:
            errors['email'] = "Debes ingresar un email válido"
        
        # WhatsApp
        if 'whatsapp' in data:
            try:
                self.validate_phone_number(data['whatsapp'], 'WhatsApp')
            except ValidationError as e:
                errors['whatsapp'] = str(e)
        
        # Phone
        if 'phone' in data:
            try:
                self.validate_phone_number(data['phone'], 'Teléfono')
            except ValidationError as e:
                errors['phone'] = str(e)
        
        # Facebook
        if 'facebook' in data:
            try:
                self.validate_url(data['facebook'], 'Facebook')
            except ValidationError as e:
                errors['facebook'] = str(e)
        
        # Instagram
        if 'instagram' in data:
            try:
                self.validate_url(data['instagram'], 'Instagram')
            except ValidationError as e:
                errors['instagram'] = str(e)

        if errors:
            raise serializers.ValidationError(errors)
        return data
    
    def validate_phone_number(self, number, field):
        if len(number) != 11:
            raise ValidationError(f"El número de {field} no es válido")
        patron = r'^(\+?1?)?(\d{10}|\d{3}[-.\s]?\d{3}[-.\s]?\d{4}|\(\d{3}\)[-.\s]?\d{3}[-.\s]?\d{4})$'
        if not re.match(patron, number):
            raise ValidationError(f"Debes ingresar un número de {field} válido. Ej: +5354535170")

    def validate_url(self, url, field_name):
        if url:
            try:
                URLValidator()(url)
            except DjangoValidationError:
                raise ValidationError(f"La URL de {field_name} no es correcta")

