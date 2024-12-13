from django.contrib import admin
from .models import Task


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "completed", "created_at", "updated_at")
    search_fields = ("title", "description")
    ordering = ("-created_at",)
