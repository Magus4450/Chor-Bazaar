from rest_framework import generics
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer, ProductCreateSerializer
from rest_framework import mixins, permissions
from .permissions import IsStaffEditorPermission, IsProductofSeller
from rest_framework_simplejwt.authentication import JWTAuthentication
from accounts.models import Seller
from rest_framework import status
from rest_framework import filters

################################################################################################################################
################################################# Product Views ################################################################
################################################################################################################################


class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'


class ProductCreateAPIView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductCreateSerializer

    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]


class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'tags', 'description')
    


class CategoryProductListAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        # Get category id from url
        cat = self.kwargs['pk']
        return Product.objects.filter(category=cat)


class ProductOwnedAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Get current user
        user = self.request.user.id
        # Get seller object of that user insatnce
        seller = Seller.objects.get(user=user)
        # Get all products of that seller
        return Product.objects.filter(seller=seller.id)
        

class ProductUpdateAPIView(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'

    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsProductofSeller]


class ProductDeleteAPIView(generics.DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'pk'

    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser, IsProductofSeller]



################################################################################################################################
################################################# Category Views ###############################################################
################################################################################################################################

class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    
class CategoryDetailAPIView(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'pk'

class CategoryDeleteAPIView(generics.DestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'pk'

    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

class CategoryUpdateAPIView(generics.UpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'pk'

    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

class CategoryCreateAPIView(generics.CreateAPIView):

    serializer_class = CategorySerializer

    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]




    