import pytest
from tasks.serializers import TaskSerializer
from django.contrib.auth.models import User
from tasks.models import Task


@pytest.mark.django_db
def test_task_serializer_valid_data():
    user = User.objects.create_user(username="testuser", password="testpassword")
    data = {
        "title": "Test Task",
        "description": "Test Description",
        "completed": False,
        "created_by": user.id,
        "updated_by": user.id,
    }
    serializer = TaskSerializer(data=data)
    assert serializer.is_valid()


@pytest.mark.django_db
def test_task_serializer_invalid_title():
    user = User.objects.create_user(username="testuser", password="testpassword")
    data = {
        "title": "a",
        "description": "Test Description",
        "completed": False,
        "created_by": user.id,
        "updated_by": user.id,
    }
    serializer = TaskSerializer(data=data)
    assert not serializer.is_valid()
    assert "Title must be atleast 3 characters long." in serializer.errors["title"]
