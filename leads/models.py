from django.db import models
from django.conf import settings #helps link to mangaer/agent

# Create your models here.
class Lead(models.Model):
    class LeadType(models.TextChoices):
        HOT = 'HOT','Hot',
        WARM = 'WARM','Warm',
        COLD = 'COLD', 'Cold'
    class Status(models.TextChoices):
        NEW = 'NEW', 'New'
        CONTACTED = 'CONTACTED', 'Contacted'
        IN_PROGRESS = 'IN_PROGRESS', 'In Progress'
        CLOSED = 'CLOSED', 'Closed'

    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='leads')
    lead_name = models.CharField(max_length=100, null=False)
    email = models.EmailField()
    company_name = models.CharField(max_length=100, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    lead_type = models.CharField(max_length=20, choices=LeadType.choices)
    status = models.CharField(max_length=20,choices=Status.choices, default=Status.NEW)

    def __str__(self):
        return self.lead_name
    
class Notes(models.Model):
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name='notes')
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Note for {self.lead.lead_name}"

class Contact(models.Model):
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name='contacts')
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=12)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Contact for {self.lead.lead_name}"