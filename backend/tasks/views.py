from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    """
    This viewset helps perform CRUD operations on Task model
    """

    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = [
        "completed",
        "created_at",
        "updated_at",
        "created_by",
        "updated_by",
    ]
    search_fields = ["title", "description"]
    ordering_fields = [
        "completed",
        "created_at",
        "updated_at",
        "created_by",
        "updated_by",
    ]
