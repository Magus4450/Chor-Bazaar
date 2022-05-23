from multiprocessing import AuthenticationError
from .serializers import UserRegisterSerializer
from rest_framework.response import Response
from .models import User
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

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

from django.contrib.auth import authenticate

# class LoginUserView(APIView):
#     def post(self, request):
#         serializer = UserLoginSerializer(data=request.data)

#         if not serializer.is_valid():
#             print(serializer.errors)
#             return Response(
#                 {
#                     "error": "Invalid dataaa",
#                     "data": serializer.errors
#                 },
#                 status=status.HTTP_400_BAD_REQUEST,
#             )
#         user = authenticate(email=serializer.data['email'], password=serializer.data['password'])
#         # Generate Refresh Token
#         refresh = RefreshToken.for_user(user)
#         return Response({
#             # "status": 200,
#             # "payload": serializer.data,
#             "refresh": str(refresh),
#             "access": str(refresh.access_token),
#         },
#         status=status.HTTP_200_OK,)

