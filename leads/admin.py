from django.contrib import admin
from .models import Lead, Contact, Notes

# Register your models here.
admin.site.register(Lead)
admin.site.register(Contact)
admin.site.register(Notes)