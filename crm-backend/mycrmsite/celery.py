import os
from celery import Celery

#setting the default Django settings module for celery
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mycrmsite.settings')
app = Celery("mycrmsite")

#where configuration of settings for celery is located
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()