import pytest
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from tasks.models import Task


@pytest.mark.django_db
def test_permission_restriction():
    user1 = User.objects.create_user(username="user1", password="password")
    user2 = User.objects.create_user(username="user2", password="password")
    task = Task.objects.create(
        title="Task 1", description="Description", created_by=user1, updated_by=user1
    )
    client = APIClient()
    client.force_authenticate(user=user2)
    url = reverse("task-detail", args=[task.id])
    response = client.patch(url, {"title": "Unauthorized Update"})
    assert response.status_code == status.HTTP_403_FORBIDDEN
