from django.contrib import admin
from .models import User, Seller, Buyer
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserChangeForm, CustomUserCreationForm

class UserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ('email', 'is_staff', 'is_active')
    list_filter = ('email', 'is_staff', 'is_active', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields':('is_staff', ('is_active', 'is_superuser'), )}),
        # {'Important Dates', {'fields': ('last_login', 'date_joined')}},
        ('Advanced Options', {
            'classes': ('collapse',),
            'fields': ('groups', 'user_permissions'),
        }),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions'),}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)


admin.site.register(User, UserAdmin)
admin.site.register(Seller)
admin.site.register(Buyer)