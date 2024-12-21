from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, mixins, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Task
from .permissions import IsOwnerOrReadOnly
from .serializers import TaskSerializer, UserSerializer
from .services import TaskService


class UserViewSet(
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    """
    A simple ViewSet for viewing and editing users.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["username", "email"]


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
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.updated_by = self.request.user
        instance.save()

    @action(detail=True, methods=["patch"], url_path="mark-completed")
    def mark_completed(self, request, pk=None):
        task = self.get_object()
        task.updated_by = self.request.user
        TaskService.mark_task_as_completed(task)
        return Response({"message": "Task marked as completed."})
