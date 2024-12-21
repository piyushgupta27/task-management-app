from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Task


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name"]


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            "id",
            "title",
            "description",
            "completed",
            "created_at",
            "updated_at",
            "created_by",
            "updated_by",
        ]
        read_only_fields = [
            "id",
            "completed",
            "created_at",
            "updated_at",
            "created_by",
            "updated_by",
        ]

    def validate_title(self, value):
        if not value.strip():
            raise serializers.ValidationError("Title is required.")
        if len(value.strip()) < 3:
            raise serializers.ValidationError(
                "Title must be atleast 3 characters long."
            )
        return value
