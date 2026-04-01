from rest_framework import serializers
from .models import *

class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = ['id','lead','content','created_at', 'created_by']
        read_only_fields = ['created_by']

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'lead' ,'phone_number', 'created_by', 'created_at']
        read_only_fields = ['created_by']

class LeadSerializer(serializers.ModelSerializer):
    # These 'related_names' from your Models allow us to nest the data
    notes = NotesSerializer(many=True, read_only=True)
    contacts = ContactSerializer(many=True, read_only=True)
    #to see the name of the user who created it, not just the ID
    created_by_name = serializers.ReadOnlyField(source='created_by.username')
    class Meta:
        model = Lead
        fields = [
            'id', 'lead_name', 'email', 'company_name', 
            'created_by', 'created_by_name', 'notes', 'contacts'
        ]
        read_only_fields = ['created_by']