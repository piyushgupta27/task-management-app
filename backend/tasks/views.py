from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, mixins, viewsets

from .models import Task
from .serializers import TaskSerializer, UserSerializer


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
