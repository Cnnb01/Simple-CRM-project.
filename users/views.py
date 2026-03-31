from django.shortcuts import render
from .models import User
from .serializers import UserSerializer
from rest_framework import generics

# Create your views here.
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
