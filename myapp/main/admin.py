from django.contrib import admin
from .models import App,Task

class AppAdmin(admin.ModelAdmin):
    list_display = ['appname', 'appcategory', 'applink', 'points']
    search_fields = ['appname', 'appcategory']
    list_filter = ['appcategory']
    ordering = ['appname']

admin.site.register(App, AppAdmin)

class TaskAdmin(admin.ModelAdmin):
    list_display = ('taskname', 'user', 'app', 'status')
    list_filter = ('status', 'user__username')
    search_fields = ('taskname', 'user__username')
    
    def app(self, obj):
        return obj.app.appname

    def user(self, obj):
        return obj.user.username
    
admin.site.register(Task,TaskAdmin)