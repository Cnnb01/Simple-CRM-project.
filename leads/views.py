from django.shortcuts import render
from .models import Lead, Notes, Contact
from .serializers import LeadSerializer, NotesSerializer, ContactSerializer
from rest_framework import generics, permissions, filters
from .permissions import IsManagerOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
# Create your views here.
# manager to leads get, post, delete(RetrieveUpdateDestroyAPIView)
# agents to leads get, post(RetrieveUpdateAPIView)
# leads
class LeadListCreate(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
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
