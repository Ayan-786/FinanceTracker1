import random

from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.serializers import ModelSerializer

from core.utils.serializers import ValidatorSerializer
from users.models import User


class UserSerializer(ModelSerializer):

    def create(self, validated_data):
        first_name = validated_data.get('first_name', '').strip().lower()
        last_name = validated_data.get('last_name', '').strip().lower()
        email = f"{first_name}{last_name}@gmail.com"
        password = str(random.randint(100000, 999999))
        print(password)
        user = User.objects.create(
            email=email,
            code=password,
            **validated_data
        )
        user.username = email
        user.set_password(password)
        user.save()

        return user
    class Meta:
        model = User
        fields = (
            'id', 'first_name', 'last_name', 'email', 'username', 'code', 'invitation_token', 'invitation',
            'admin',)
        extra_kwargs = {
            'email': {'read_only': True},
            'invitation_token': {'required': False},
        }


class SimpleUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'username',)


class ChangePasswordValidator(ValidatorSerializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, min_length=8)

    def validate_old_password(self, password):
        if not self.context['request'].user.check_password(password):
            raise ValidationError('Incorrect old password.')
        return password

class UserFilterSerializer(ValidatorSerializer):
    page = serializers.IntegerField(default=1)
    size = serializers.IntegerField(default=15)
