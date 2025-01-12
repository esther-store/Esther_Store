from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Create your models here.
class UserProfileManager(BaseUserManager):
    def create_user(self, email, username, password = None):
        if not email:
            raise ValueError('User most have email')
        email = self.normalize_email(email) 
        user = self.model(email=email, username = username)   
        user.set_password(password)
        user.save(using = self._db)
        return user
    
    def create_superuser(self, email, username, password = None):
        user = self.create_user(email, username, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using = self._db)
        return user
    
class UserProfile(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True, default=None)
    username = models.CharField(max_length=255, default=None, unique = True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    name = models.CharField(max_length=255, blank=True, null=True, default=None)
    last_name = models.CharField(max_length=255, blank = True, null=True, default=None)
    address = models.CharField(max_length=255, blank = True, null=True, default=None)
    phone = models.CharField(max_length=255, blank = True, null=True, default=None)
    zip_code = models.CharField(max_length=255, blank = True, null=True, default=None)
    country = models.CharField(max_length=255, blank = True, null=True, default=None)
    state = models.CharField(max_length=255, blank = True, null=True, default=None)
    
    objects = UserProfileManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    class Meta:
        ordering = ["-id"]
    
    def get_full_name(self):
        return self.username
    
    def __str__(self):
        return self.email
