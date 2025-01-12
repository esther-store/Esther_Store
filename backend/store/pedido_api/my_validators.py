from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

def validate_value_gte_cero(value):
    if value < 0:
        raise ValidationError(
            _('%(value)s is not greater than cero'),
            params={'value': value},
        )