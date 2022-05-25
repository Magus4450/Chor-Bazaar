
from rest_framework import serializers
from .models import Buyer, Seller, User

class UserRegisterSerializer(serializers.ModelSerializer):
    # dob = fields.DateField(input_formats=['%Y-%m-%d'])

    password2 = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        # fields = ['email', 'password']
        fields = ['id', 'email', 'password', 'password2', 'first_name', 'last_name', 'phone', 'gender', 'user_type', 'dob']
    
    def create(self, validated_data):
        user = User.objects.create(
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            phone = validated_data['phone'],
            gender = validated_data['gender'],
            user_type = validated_data['user_type'],
            dob = validated_data['dob'],
        )
        user.set_password(validated_data['password'])
        user.save()
        if validated_data["user_type"] == "Buyer":
            buyer = Buyer.objects.create(
                user = user
            )
            buyer.save()
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





from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['id'] = user.id
        # ...

        return token
        

