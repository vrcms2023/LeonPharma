# Generated by Django 4.2.5 on 2024-06-20 09:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_alter_category_description_alter_product_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='originalname',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]