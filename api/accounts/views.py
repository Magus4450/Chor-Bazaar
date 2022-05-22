from .serializers import UserSerializer
from rest_framework.response import Response
from .models import User
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
class RegisterUserView(APIView):


    def post(self, request):
        serializer = UserSerializer(data=request.data)

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

