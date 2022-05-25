from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from accounts.views import MyTokenObtainPairView

urlpatterns = [
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', MyTokenObtainPairView.as_view(), name='token_refresh'),
    path('admin/', admin.site.urls),
    path('api/shop/', include('shop.urls')),
    path('api/accounts/', include('accounts.urls')),
]
