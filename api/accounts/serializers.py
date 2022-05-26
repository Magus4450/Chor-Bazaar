
from rest_framework import serializers
from .models import Buyer, Seller, User

class UserRegisterSerializer(serializers.ModelSerializer):
    # dob = fields.DateField(input_formats=['%Y-%m-%d'])

    password2 = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
      
        # Use password only for POST requests not for GET
        extra_kwargs = {'password': {'write_only': True}}

        fields = ['id', 'email', 'password', 'password2', 'first_name', 'last_name', 'phone', 'gender', 'user_type', 'dob']
    
    def create(self, validated_data):

        # Creating user object
        user = User.objects.create(
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            phone = validated_data['phone'],
            gender = validated_data['gender'],
            user_type = validated_data['user_type'],
            dob = validated_data['dob'],
        )
        # Hashing the string password and storing it in the user object
        user.set_password(validated_data['password'])
        # Saving the user object in the database
        user.save()

        # If the user is a buyer, create a buyer object and save in database
        if validated_data["user_type"] == "Buyer":
            buyer = Buyer.objects.create(
                user = user
            )
            buyer.save()
        # If the user is a seller, create a seller object and save in database
        elif validated_data["user_type"] == "Seller":
            seller = Seller.objects.create(
                user = user
            )
            seller.save()
        return user
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password does not match"}
            )
    
        return attrs




from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        # token['id'] = user.id
        # ...

        return token


    def validate(self, attrs):
    
        try:
            user = User.objects.get(email=attrs['email'])
            # password = make_password(attrs['password'])
            # password = make_password("1234")
            # print(f"Password: {password}")
            # print(f"User Password: {user.password}")
            user = None
            user = authenticate(email=attrs['email'], password=attrs['password'])

            if user is None:
                raise serializers.ValidationError(
                    {"password": "Incorrect password"}
                )
        except User.DoesNotExist:
            raise serializers.ValidationError(
                {"email": "Email does not exist"}
            )
     
        data = super().validate(attrs)


        return data

    
        

