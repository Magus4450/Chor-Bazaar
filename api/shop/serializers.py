from pickletools import read_floatnl, read_long1
from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    discounted_price = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Product
        fields = ('id', 'name', 'category', 'price', 'tags', 'discount', 'description', 'quantity', 'discounted_price')

    def get_discounted_price(self, obj):
        return obj.discounted_price()
