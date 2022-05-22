from django.urls import path
from . import views
app_name = 'shop'

urlpatterns = [
    path('<int:pk>/', views.ProductDetailAPIView.as_view() , name='detail'),
    path('<int:pk>/update/', views.ProductUpdateAPIView.as_view() , name='update'),
    path('<int:pk>/delete/', views.ProductDeleteAPIView.as_view() , name='delete'),
    path('create/', views.ProductCreateAPIView.as_view() , name='create'),
    path('list/', views.ProductListAPIView.as_view() , name='list'),
]
