import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
from tasks.models import Task


@pytest.mark.django_db
def test_create_task():
    user = User.objects.create_user(username="testuser", password="testpassword")
    client = APIClient()
    client.force_authenticate(user=user)
    url = reverse("task-list")
    data = {
        "title": "New Task",
        "description": "Task Description",
        "created_by": user,
        "updated_by": user,
    }
    response = client.post(url, data)
    assert response.status_code == status.HTTP_201_CREATED
    assert response.data["title"] == "New Task"
    assert response.data["created_by"] == user.id


@pytest.mark.django_db
def test_create_task_without_title():
    user = User.objects.create_user(username="testuser", password="testpassword")
    client = APIClient()
    client.force_authenticate(user=user)
    url = reverse("task-list")
    data = {
        "description": "Task without title",
        "created_by": user,
        "updated_by": user,
    }
    response = client.post(url, data)
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert "title" in response.data


@pytest.mark.django_db
def test_mark_task_completed():
    user = User.objects.create_user(username="testuser", password="testpassword")
    task = Task.objects.create(
        title="Task 1", description="Description 1", created_by=user, updated_by=user
    )
    client = APIClient()
    client.force_authenticate(user=user)
    url = reverse("task-mark-completed", args=[task.id])
    response = client.patch(url)
    assert response.status_code == status.HTTP_200_OK
    task.refresh_from_db()
    assert task.completed


@pytest.mark.django_db
def test_retrieve_task():
    user = User.objects.create_user(username="testuser", password="testpassword")
    task = Task.objects.create(
        title="Task 1", description="Description 1", created_by=user, updated_by=user
    )
    client = APIClient()
    client.force_authenticate(user=user)
    url = reverse("task-detail", args=[task.id])
    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert response.data["title"] == "Task 1"
