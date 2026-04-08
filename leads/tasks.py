from celery import shared_task
from .models import Lead

@shared_task
def send_lead_reminder(lead_id):
    try:
        lead = Lead.objects.get(id=lead_id)
        print(f"REMINDER: Check on lead {lead.lead_name} Company: {lead.company_name}")
        return f"Reminder sent for {lead.lead_name}"
    except Lead.DoesNotExist:
        return "Lead not found"
    
@shared_task
def test_task():
    print("HELLO FROM CELERY", flush=True)
    return "Work works!"
# @shared_task
# def test_task():
#     print("HELLO FROM CELERY", flush=True) # Added flush=True
#     return "Work works!"
