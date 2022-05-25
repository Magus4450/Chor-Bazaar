from django import views
from rest_framework import permissions
from .models import Product

class IsStaffEditorPermission(permissions.DjangoModelPermissions):

    # From class definition
    perms_map = {
        'GET': ['%(app_label)s.view_%(model_name)s'],
        'OPTIONS': [],
        'HEAD': [],
        'POST': ['%(app_label)s.add_%(model_name)s'],
        'PUT': ['%(app_label)s.change_%(model_name)s'],
        'PATCH': ['%(app_label)s.change_%(model_name)s'],
        'DELETE': ['%(app_label)s.delete_%(model_name)s'],
    }

    # def has_permission(self, request, view):
    #     if not request.user.is_staff:
    #         return False
    #     return super().has_permission(request, view)

class IsProductofSeller(permissions.DjangoModelPermissions):

    def has_permission(self, request, view):

        # print(f" Current User: {request.user.id}")
        # print(f" Product Owner: {Product.objects.get(pk=view.kwargs['pk']).seller.id}")
        
        # If the user is the seller of the product
        if request.user.id == Product.objects.get(pk=view.kwargs['pk']).seller.id:
            return True
            

        return False


    # def has_permission(self, request, view):
    #     user = request.user
    #     if user.is_staff:
    #         # print(user.get_all_permissions())
           
    #         if user.has_perm("shop.view_product"):  # appname.command_modelname
    #             return True
    #         if user.has_perm("shop.add_product"):
    #             return True
    #         if user.has_perm("shop.change_product"):
    #             return True
    #         if user.has_perm("shop.delete_product"):
    #             return True
    #         return False
    #     return False