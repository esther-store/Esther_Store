# Generated by Django 3.2.16 on 2023-04-23 21:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store_api', '0015_producto_recommended'),
    ]

    operations = [
        migrations.AddField(
            model_name='categoria',
            name='img',
            field=models.ImageField(default='productos_images/blank.png', upload_to='categories_images'),
        ),
    ]
