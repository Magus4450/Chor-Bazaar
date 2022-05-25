
from .serializers import UserRegisterSerializer
from rest_framework.response import Response
from .models import User
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken


from .serializers import MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# To add information in the JWT token > URLs in core/urls.py
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



class RegisterUserView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)

        if not serializer.is_valid():
            print(serializer.errors)
            return Response(
                {
                    "error": "Invalid data",
                    "data": serializer.errors
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer.save()

        user = User.objects.get(email=serializer.data['email'])
        # Generate Refresh Token
        refresh = RefreshToken.for_user(user)
        return Response({
            # "status": 200,
            # "payload": serializer.data,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        },
        status=status.HTTP_200_OK,)



