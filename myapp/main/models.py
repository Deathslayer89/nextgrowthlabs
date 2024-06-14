from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

User = get_user_model()

class App(models.Model):
    appname = models.CharField(max_length=255)
    appcategory = models.CharField(max_length=255)
    applink = models.URLField()
    points = models.PositiveIntegerField()
    image = models.ImageField(upload_to='app_images/')

    def __str__(self):
        return self.appname

class Task(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
    ]

    user = models.ForeignKey(User, related_name='tasks', on_delete=models.CASCADE)
    app = models.ForeignKey(App, related_name='tasks', on_delete=models.CASCADE)
    taskname = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    screenshot = models.ImageField(upload_to='task_screenshots/', null=True, blank=True)
    app_image = models.ImageField(upload_to='task_app_images/', null=True, blank=True)  # New field

    def __str__(self):
        return self.taskname

# Signal to create tasks for new users
@receiver(post_save, sender=User)
def create_tasks_for_new_user(sender, instance, created, **kwargs):
    if created:
        apps = App.objects.all()
        for app in apps:
            Task.objects.create(
                user=instance,
                app=app,
                taskname=f'Download {app.appname}',
                description=f'Download and install the {app.appname} app.',
                app_image=app.image  
            )

# Signal to create tasks for all users when a new app is added
@receiver(post_save, sender=App)
def create_tasks_for_new_app(sender, instance, created, **kwargs):
    if created:
        users = User.objects.all()
        for user in users:
            Task.objects.create(
                user=user,
                app=instance,
                taskname=f'Download {instance.appname}',
                description=f'Download and install the {instance.appname} app.',
                app_image=instance.image 
            )
