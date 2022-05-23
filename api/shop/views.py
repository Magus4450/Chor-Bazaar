from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from rest_framework import mixins, permissions
from .permissions import IsStaffEditorPermission, IsProductofSeller
from rest_framework_simplejwt.authentication import JWTAuthentication




class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'

    # Uses session cookies to make sure user is logged in before accessing the API

    # Permissions according to the user
    # permission_classes = [permissions.DjangoModelPermissions]

    # Orderming matters
    # First check if user is_staff, if not, check if user has other permission
    # Custom Permissions IsStaffEditorPermission
    # permission_classes = [permissions.IsAdminUser, IsStaffEditorPermission]


class ProductCreateAPIView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]



    # Implement more logic when it is being created
    def perform_create(self, serializer):
        # serializer.save(seller=self.request.user)
        return super().perform_create(serializer)

class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    
class ProductUpdateAPIView(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'

    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsProductofSeller]


    
    # def perform_update(self, serializer):
    #     return super().perform_update(serializer)

class ProductDeleteAPIView(generics.DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'

    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsProductofSeller, permissions.IsAdminUser]



    # def perform_destroy(self, instance):
    #     return super().perform_destroy(instance)


# Using Generic and Mixins to create custom class views
class ProductMixinView(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    generics.GenericAPIView
    ):

    # For listmodel mixins
    queryset = Product.objects.all()
    serializer = ProductSerializer
    # For retrieve model mixins
    lookup_field = 'pk'

    # Handles both list view and detail view
    def get(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        if pk is not None:
            return self.retrieve(request, *args, **kwargs) # From retrievemodel mixins
        return self.list(request, *args, **kwargs) # From listmodel mixins
    
    def post(self, request, *args, **kwargs):
        return