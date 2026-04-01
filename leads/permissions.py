from rest_framework import permissions

class IsManagerOrReadOnly(permissions.BasePermission):
    "custom permission to only allow managers to delete a lead"
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.method == 'DELETE':
            return request.user.role == 'manager'    
        return True
