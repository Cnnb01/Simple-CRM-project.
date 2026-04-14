from django.shortcuts import render
from .models import User
from .serializers import UserSerializer
from rest_framework import generics, permissions

# Create your views here.
class IsManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'manager'

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsManager] # only managers can see list of users
