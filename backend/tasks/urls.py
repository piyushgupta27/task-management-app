from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, TaskViewSet

# Create a router and register the viewset
router = DefaultRouter()
router.register(r"users", UserViewSet, basename="user")
router.register(r"tasks", TaskViewSet, basename="task")

# The API URLs are now determined automatically by the router
urlpatterns = [
    path("", include(router.urls)),
]
