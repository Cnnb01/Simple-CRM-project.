from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    class Roles(models.TextChoices):
        MANAGER = "manager", "Manager"
        AGENT = "agent", "Agent"

    role = models.CharField(
        max_length=20,
        choices=Roles.choices,
        default=Roles.AGENT,
    )