from dj_rest_auth.views import UserDetailsView
from user_profile_api.serializers import UserProfileSerializer

class CustomUserDetailsView(UserDetailsView):
    serializer_class = UserProfileSerializer