from django.urls import path
from .views import LeadListCreate,LeadDetail,NoteListCreate, NotesDetail,ContactListCreate,ContactsDetail

urlpatterns = [
    path('',LeadListCreate.as_view(),name='lead-list-create'),
    path('<int:pk>/',LeadDetail.as_view(),name='lead-detail'),
    # path('notes/',NoteListCreate.as_view(),name='note-list-create'),
    # path('notes/<int:pk>/',NotesDetail.as_view(),name='note-detail'),
    # path('contacts/',ContactListCreate.as_view(),name='contact-list-create'),
    # path('contacts/<int:pk>/',ContactsDetail.as_view(),name='contact-detail'),
]