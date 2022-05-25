from django.db import models
from django.utils.translation import ugettext_lazy as _

class Category(models.Model):
    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")

    category = models.CharField(_("Category"), max_length=255)

    def __str__(self) -> str:
        return self.category

class Product(models.Model):

    name = models.CharField(_("Name"), max_length=255)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    price = models.FloatField(_("Price"))
    tags = models.CharField(_("Tags"), max_length=255)
    discount = models.FloatField(_("Discount"))
    seller = models.ForeignKey('accounts.Seller', on_delete=models.CASCADE)
    description = models.TextField(_("Description"))
    # image = models.ImageField(_("Image"), upload_to='images/')
    quantity = models.IntegerField(_("Quantity"))

    def discounted_price(self):
        return self.price - (self.price * (self.discount/100)) 
    
    def __str__(self) -> str:
        return f"{self.name} - {self.price}"


