from django.contrib import admin
from .models import Lead, Contact, Notes, Reminder

# Register your models here.
admin.site.register(Lead)
admin.site.register(Contact)
admin.site.register(Notes)
admin.site.register(Reminder)