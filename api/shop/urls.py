from django.urls import path
from . import views
app_name = 'shop'

urlpatterns = [
    path('product/<int:pk>/', views.ProductDetailAPIView.as_view() , name='product_detail'),
    path('product/<int:pk>/update/', views.ProductUpdateAPIView.as_view() , name='product_update'),
    path('product/<int:pk>/delete/', views.ProductDeleteAPIView.as_view() , name='product_delete'),
    path('product/create/', views.ProductCreateAPIView.as_view() , name='product_create'),
    path('product/list/', views.ProductListAPIView.as_view() , name='product_list'),
    path('product/owned/', views.ProductOwnedAPIView.as_view() , name='product_owned'),

    path('category/list/', views.CategoryListAPIView.as_view() , name='category_list'),
    path('category/<int:pk>/', views.CategoryDetailAPIView.as_view() , name='category_detail'),
    path('category/<int:pk>/products/', views.CategoryProductListAPIView.as_view() , name='category_products'),
    path('category/create/', views.CategoryCreateAPIView.as_view() , name='category_create'),
    path('category/<int:pk>/update/', views.CategoryUpdateAPIView.as_view() , name='category_update'),
    path('category/<int:pk>/delete/', views.CategoryDeleteAPIView.as_view() , name='category_delete'),

]
