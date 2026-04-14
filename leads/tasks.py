from celery import shared_task
from .models import Lead, Reminder
from django.utils import timezone

# @shared_task
# def send_lead_reminder(lead_id):
#     try:
#         lead = Lead.objects.get(id=lead_id)
#         print(f"REMINDER: Check on lead {lead.lead_name} Company: {lead.company_name}")
#         return f"Reminder sent for {lead.lead_name}"
#     except Lead.DoesNotExist:
#         return "Lead not found"
    
# @shared_task
# def test_task():
#     print("HELLO FROM CELERY", flush=True)
#     return "Work works!"

@shared_task
def check_pending_reminders():
    now = timezone.now()
    # reminders not yet sent
    due_reminders = Reminder.objects.filter(reminder_time__lte = now, is_sent=False)

    for r in due_reminders:
        print(f"Alarm: {r.message} for {r.lead.lead_name}")
        r.is_sent = True
        r.save()
    return f"Processed {due_reminders.count()} reminders"
