from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    """
    This viewset helps perform CRUD operations on Task model
    """

    queryset = Task.objects.all()
    serializer_class = TaskSerializer
