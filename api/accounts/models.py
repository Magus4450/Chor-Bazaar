from email.policy import default
from tkinter import N
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import ugettext_lazy as _
from .managers import CustomUserManager
from django.utils import timezone

class User(AbstractBaseUser, PermissionsMixin):
    # username = None
    email = models.EmailField(_('Email Address'), unique=True)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    first_name = models.CharField(_("First Name"), max_length=30)
    last_name = models.CharField(_("Last Name"), max_length=30)
    phone = models.IntegerField(_("Phone Number"))
    GENDER_CHOICES = {
        ('Male','Male'),
        ('Female','Female'),
        ('Other', 'Other')
    }
    gender = models.CharField(_("Gender"), choices = GENDER_CHOICES, max_length=10)
    dob = models.DateField(_("Date of Birth"))

    TYPE_CHOICES = {
        ('Buyer' ,'Buyer'),
        ('Seller' ,'Seller')
    }
    user_type = models.CharField(_("User Type"), max_length=10, choices=TYPE_CHOICES)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

class Buyer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.email


class Seller(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.email
    


