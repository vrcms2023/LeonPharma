# Generated by Django 4.2.5 on 2024-06-20 09:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gallery', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gallery',
            name='originalname',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
