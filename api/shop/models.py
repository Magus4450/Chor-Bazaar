from django.db import models
from django.utils.translation import ugettext_lazy as _
from PIL import Image


class Category(models.Model):
    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")

    category = models.CharField(_("Category"), max_length=255)

    def __str__(self) -> str:
        return self.category


class Product(models.Model):

    name = models.CharField(_("Name"), max_length=255)
    category = models.ManyToManyField(Category)
    price = models.FloatField(_("Price"))
    tags = models.CharField(_("Tags"), max_length=255)
    discount = models.FloatField(_("Discount"))
    seller = models.ForeignKey('accounts.Seller', on_delete=models.CASCADE)
    description = models.TextField(_("Description"))
    image = models.ImageField(
        _("Image"), upload_to='images/', default='images/default.jpg', blank=True, null=True)
    quantity = models.IntegerField(_("Quantity"))

    def discounted_price(self):
        return self.price - (self.price * (self.discount/100))

    def __str__(self) -> str:
        return f"{self.name} - {self.price}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        img = Image.open(self.image.path)

        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.image.path)
