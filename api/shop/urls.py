from django.urls import path
from . import views
app_name = 'shop'

urlpatterns = [
    path('product/<int:pk>/', views.ProductDetailAPIView.as_view() , name='product_detail'),
    path('product/<int:pk>/update/', views.ProductUpdateAPIView.as_view() , name='product_update'),
    path('product/<int:pk>/delete/', views.ProductDeleteAPIView.as_view() , name='product_delete'),
    path('product/create/', views.ProductCreateAPIView.as_view() , name='product_create'),
    path('product/list/', views.ProductListAPIView.as_view() , name='product_list'),

    path('category/list/', views.CategoryListAPIView.as_view() , name='category_list'),

]
