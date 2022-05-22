
from rest_framework import serializers, fields
from .models import User

class UserSerializer(serializers.ModelSerializer):
    # dob = fields.DateField(input_formats=['%Y-%m-%d'])
    class Meta:
        model = User
        # fields = ['email', 'password']
        fields = ['id', 'email', 'password', 'first_name', 'last_name', 'phone', 'gender', 'user_type', 'dob']
    
    def create(self, validated_data):
        user = User.objects.create(
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            phone = validated_data['phone'],
            gender = validated_data['gender'],
            user_type = validated_data['user_type'],
            dob = validated_data['dob']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user