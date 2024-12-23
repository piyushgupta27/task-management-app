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
    data = {"title": "New Task", "description": "Task Description"}
    response = client.post(url, data)
    assert response.status_code == status.HTTP_201_CREATED
    assert response.data["title"] == "New Task"
    assert response.data["created_by"] == user.id


@pytest.mark.django_db
def test_list_tasks():
    user = User.objects.create_user(username="testuser", password="testpassword")
    Task.objects.create(
        title="Task 1", description="Description 1", created_by=user, updated_by=user
    )
    Task.objects.create(
        title="Task 2", description="Description 2", created_by=user, updated_by=user
    )
    client = APIClient()
    client.force_authenticate(user=user)
    url = reverse("task-list")
    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 2


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
