from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile


class SignUpSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150, required=False, allow_blank=True)
    phone = serializers.CharField(max_length=32)
    email = serializers.EmailField(required=False, allow_blank=True)
    password = serializers.CharField(write_only=True)
    create_chama = serializers.BooleanField(default=False)
    chama_name = serializers.CharField(max_length=128, required=False, allow_blank=True)
    chama_type = serializers.CharField(max_length=128, required=False, allow_blank=True)

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError('Password must be at least 8 characters')
        return value

    def validate(self, data):
        # Determine username (email or phone) and ensure it's present and unique
        username = data.get('email') or data.get('phone')
        if not username:
            raise serializers.ValidationError({'username': 'Either email or phone is required'})
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError({'username': 'A user with this email or phone already exists'})
        return data

    def create(self, validated_data):
        base_username = (validated_data.get('email') or validated_data.get('phone'))
        username = base_username
        # if username exists, append a numeric suffix until unique
        suffix = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}-{suffix}"
            suffix += 1

        user = User.objects.create_user(
            username=username,
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
        )
        Profile.objects.create(
            user=user,
            phone=validated_data.get('phone', ''),
            chama_name=validated_data.get('chama_name', ''),
            chama_type=validated_data.get('chama_type', ''),
        )
        return user
