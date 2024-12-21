from .models import Task


class TaskService:
    @staticmethod
    def mark_task_as_completed(task: Task):
        task.completed = True
        task.save()
