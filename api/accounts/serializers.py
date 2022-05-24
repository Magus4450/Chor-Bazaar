
from rest_framework import serializers, fields
from .models import User

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
            user_type = validated_data['user_type']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password does not match"}
            )
        return attrs


from django.contrib.auth import authenticate

# class UserLoginSerializer(serializers.Serializer):s

#     class Meta:
#         model = User
#         fields = ['email', 'password']

#     def validate(self, attrs):
#         user = User.objects.filter(email=attrs["email"])
#         if user is None:
#             raise serializers.ValidationError(
#                 {"email": "Email does not exist"}
#             )
#         user = authenticate(email=attrs["email"], password=attrs["password"])
#         if user is None:
#             raise serializers.ValidationError(
#                 {"password": "Password is incorrect"}
#             )
#         return attrs
        
        

