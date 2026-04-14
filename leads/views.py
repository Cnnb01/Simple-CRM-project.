from django.shortcuts import render
from .models import Lead, Notes, Contact, Reminder
from .serializers import LeadSerializer, NotesSerializer, ContactSerializer, ReminderSerializer
from rest_framework import generics, permissions, filters
from .permissions import IsManagerOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
# Create your views here.
# manager to leads get, post, delete(RetrieveUpdateDestroyAPIView)
# agents to leads get, post(RetrieveUpdateAPIView)
# leads
class LeadListCreate(generics.ListCreateAPIView):
    serializer_class = LeadSerializer
    permission_classes= [permissions.IsAuthenticated]

    # to enable enginees
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]

    # 1 filter exact matches(owner)[filtering on specific model fields]
    filterset_fields =['status','lead_type','created_by']
    # 2 search partial text matches [scans multiple text fields]
    search_fields = ['lead_name', 'company_name','email']
    # 3 ordering/sorting[specify which fields a user is allowed to sort the results by using the ?ordering=]
    ordering_fields = ['created_at', 'lead_name']

    def get_queryset(self):
        user = self.request.user
        if user.role == 'manager':
            return Lead.objects.all()
        return Lead.objects.filter(created_by=user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class LeadDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LeadSerializer
    permission_classes = [IsManagerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'manager':
            return Lead.objects.all()
        return Lead.objects.filter(created_by=user)

# notes
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NotesSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'manager':
            return Notes.objects.all()
        return Notes.objects.filter(lead__created_by=user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class NotesDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NotesSerializer
    permission_classes = [IsManagerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'manager':
            return Notes.objects.all()
        return Notes.objects.filter(lead__created_by=user)


# contacts
class ContactListCreate(generics.ListCreateAPIView):
    serializer_class = ContactSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'manager':
            return Contact.objects.all()
        return Contact.objects.filter(lead__created_by=user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class ContactsDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ContactSerializer
    permission_classes = [IsManagerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'manager':
            return Contact.objects.all()
        return Contact.objects.filter(lead__created_by=user)
# reminders
class ReminderListCreate(generics.ListCreateAPIView):
    serializer_class = ReminderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'manager':
            return Reminder.objects.all()
        return Reminder.objects.filter(lead__created_by=user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class ReminderDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReminderSerializer
    permission_classes = [IsManagerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'manager':
            return Reminder.objects.all()
        return Reminder.objects.filter(lead__created_by=user)