from django.shortcuts import render
from .models import Lead, Notes, Contact
from .serializers import LeadSerializer, NotesSerializer, ContactSerializer
from rest_framework import generics, permissions
from .permissions import IsManagerOrReadOnly
# Create your views here.
# manager to leads get, post, delete(RetrieveUpdateDestroyAPIView)
# agents to leads get, post(RetrieveUpdateAPIView)
# leads
class LeadListCreate(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes= [permissions.IsAuthenticated]


    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class LeadDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [IsManagerOrReadOnly]

# notes
class NoteListCreate(generics.ListCreateAPIView):
    queryset = Notes.objects.all()
    serializer_class = NotesSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class NotesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notes.objects.all()
    serializer_class = NotesSerializer
    permission_classes = [IsManagerOrReadOnly]


# contacts
class ContactListCreate(generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class ContactsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [IsManagerOrReadOnly]
