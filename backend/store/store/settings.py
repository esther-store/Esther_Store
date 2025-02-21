from pathlib import Path
import os
from decouple import config

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-x*7=_1q3&&=5@c=g5ab%033zt8t_5x*p_qhb+nfp0tqib_8j0-'

# SECURITY WARNING: don't run with debug turned on in production!
if config('DEBUG_SERVER') == '1':
    DEBUG = True
else:
    DEBUG = False    


ALLOWED_HOSTS = ['127.0.0.1', config('PRODUCTION_HOST')]


# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # rest framework
    'rest_framework',
    'rest_framework.authtoken',
    'django_filters',

    # allauth to register users
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',

    # rest_auth to login users
    'dj_rest_auth',

    # Cors Headers to recive requests in ours APIs
    'corsheaders',

    # local apps
    'store_api',
    'authentication_api',
    'pedido_api',
    'user_profile_api',
    'contact_info',
    'import_export',
    'seed'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'allauth.account.middleware.AccountMiddleware'
]

ROOT_URLCONF = 'store.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [str(BASE_DIR.joinpath("static/frontend"))],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'store.wsgi.application'
ASGI_APPLICATION = "store.asgi.application"


# Database
if config('USE_DEBUG_DATABASE') == '1':
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }

    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': config("POSTGRES_DATABASE_NAME"),
            'USER': config("POSTGRES_DATABASE_USER"),
            'PASSWORD': config("POSTGRES_DATABASE_PASS"),
            'HOST': config("POSTGRES_DATABASE_HOST"),
            'DATABASE_PORT': config("POSTGRES_DATABASE_PORT"),
        }
    }

# Cache
if config('USE_CACHE') == '1':
    CACHES = {
        "default": {
            "BACKEND": "django_redis.cache.RedisCache",
            "LOCATION": f"redis://{config('REDIS_USERNAME')}:{config('REDIS_PASSWORD')}@{config('REDIS_HOST')}:{config('REDIS_PORT')}",
            "OPTIONS": {
                "CLIENT_CLASS": "django_redis.client.DefaultClient",
            }
        }
    }

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_PROFILE_MODULE = "user_profile.models.UserProfile"

# configurations of rest_framework
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [],
    'DEFAULT_AUTHENTICATION_CLASSES': ['rest_framework.authentication.SessionAuthentication',
                                       'rest_framework.authentication.TokenAuthentication',],
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    'DEFAULT_PAGINATION_CLASS': 'store_api.paginators.MyCustomPagination',
}
# configuration for dj_rest_auth
REST_AUTH_SERIALIZERS = {
    'LOGIN_SERIALIZER': 'authentication_api.login_serializer.LoginSerializer',
    'USER_DETAILS_SERIALIZER': 'user_profile_api.serializers.UserProfileSerializer',
}
# configuration for allauth(register of users)
SITE_ID = 1
ACCOUNT_EMAIL_VERIFICATION = 'none'
ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USERNAME_REQUIRED = False

# email backend config
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USERNAME = config('EMAIL_HOST_USERNAME')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')


AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
)

AUTH_USER_MODEL = 'authentication_api.UserProfile'

# configuration for corsheaders
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = ["http://localhost:4321", config('FRONTEND_ORIGIN')]

