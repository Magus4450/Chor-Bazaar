from pickletools import read_floatnl, read_long1
from rest_framework import serializers
from .models import Product, Category
from accounts.models import Seller


class ProductSerializer(serializers.ModelSerializer):
    discounted_price = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Product
        fields = ('id', 'name', 'category', 'price', 'tags', 'discount', 'description', 'quantity', 'discounted_price', 'seller')

    def get_discounted_price(self, obj):
        return obj.discounted_price()

class ProductCreateSerializer(serializers.ModelSerializer):
    discounted_price = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Product
        fields = ('id', 'name', 'category', 'price', 'tags', 'discount', 'description', 'quantity', 'discounted_price')


    def get_discounted_price(self, obj):
        return obj.discounted_price()

    def create(self, validated_data):
        print(validated_data['category'])
        product = Product.objects.create(
            name = validated_data['name'],
            category = validated_data['category'],
            price = validated_data['price'],
            tags = validated_data['tags'],
            discount = validated_data['discount'],
            description = validated_data['description'],
            quantity = validated_data['quantity'],
            seller = Seller.objects.get(user=self.context['request'].user)

        )
        product.save()
        return product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'category')
