import pytest
from tasks.models import Task
from tasks.services import TaskService
from django.contrib.auth.models import User


@pytest.mark.django_db
def test_mark_task_as_completed():
    user = User.objects.create_user(username="testuser", password="testpassword")
    task = Task.objects.create(
        title="Test Task",
        description="Test Description",
        created_by=user,
        updated_by=user,
    )
    assert not task.completed
    TaskService.mark_task_as_completed(task)
    task.refresh_from_db()
    assert task.completed
