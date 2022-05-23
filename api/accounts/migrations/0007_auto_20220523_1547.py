# Generated by Django 3.2.13 on 2022-05-23 10:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_auto_20220522_1049'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='gender',
            field=models.CharField(choices=[('Other', 'Other'), ('Male', 'Male'), ('Female', 'Female')], max_length=10, verbose_name='Gender'),
        ),
        migrations.AlterField(
            model_name='user',
            name='user_type',
            field=models.CharField(choices=[('Seller', 'Seller'), ('Buyer', 'Buyer')], max_length=10, verbose_name='User Type'),
        ),
    ]