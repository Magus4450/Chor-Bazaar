from rest_framework import generics
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer, ProductCreateSerializer
from rest_framework import mixins, permissions
from .permissions import IsStaffEditorPermission, IsProductofSeller
from rest_framework_simplejwt.authentication import JWTAuthentication
from accounts.models import Seller



class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'


class CategoryDetailAPIView(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
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
    serializer_class = ProductCreateSerializer

    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]



    # Implement more logic when it is being created
    # def perform_create(self, serializer):
    #     serializer.save(seller=Seller.objects.get(pk=self.request.user.id))
    #     return super().perform_create(serializer)

class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductOwnedAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user.id
        seller = Seller.objects.get(user=user)
        return Product.objects.filter(seller=seller.id)
        

class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    
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
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser, IsProductofSeller]



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