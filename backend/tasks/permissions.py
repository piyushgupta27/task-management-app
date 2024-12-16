from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Allow read-only permissions for GET requests
        if request.method in permissions.SAFE_METHODS:
            return True
        # Restrict write permissions to the task creator
        return obj.created_by == request.user
