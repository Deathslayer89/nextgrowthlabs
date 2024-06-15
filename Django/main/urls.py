from django.urls import path
from .views import (
    AppCreateView, AppListView, AppDetailView,
    TaskCreateView, TaskListView, TaskDetailView,
    PendingTasksView, CompletedTasksView, UserPointsView, CompleteTaskView
)

urlpatterns = [
    # App URLs
    path('apps/', AppListView.as_view(), name='app-list'),
    path('apps/create/', AppCreateView.as_view(), name='app-create'),
    path('apps/<int:pk>/', AppDetailView.as_view(), name='app-detail'),

    # Task URLs
    path('tasks/', TaskListView.as_view(), name='task-list'),
    path('tasks/create/', TaskCreateView.as_view(), name='task-create'),
    path('tasks/<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
    path('tasks/pending/', PendingTasksView.as_view(), name='pending-tasks'),
    path('tasks/completed/', CompletedTasksView.as_view(), name='completed-tasks'),
    path('tasks/<int:pk>/complete/', CompleteTaskView.as_view(), name='complete-task'),

    # User Points
    path('user-points/', UserPointsView.as_view(), name='user-points'),
]

