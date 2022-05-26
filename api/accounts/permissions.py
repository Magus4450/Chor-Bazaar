
from rest_framework import permissions



class UserDetailPermission(permissions.DjangoModelPermissions):

    def has_permission(self, request, view):


        # User can only request their own data. Admin and staff can request all user data
        if request.user.id == view.kwargs['pk'] or request.user.is_superuser or request.user.is_staff:
            return True
            

        return False


