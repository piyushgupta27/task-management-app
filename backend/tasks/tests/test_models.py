import pytest
from django.contrib.auth.models import User
from tasks.models import Task


@pytest.mark.django_db
def test_task_str():
    user = User.objects.create_user(username="testuser", password="testpassword")
    task = Task.objects.create(
        title="Test Task",
        description="Test Description",
        created_by=user,
        updated_by=user,
    )
    assert str(task) == "Test Task"
