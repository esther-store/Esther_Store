# Generated by Django 5.1.4 on 2025-02-18 17:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store_api', '0062_alter_promotion_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='product_img1',
            field=models.ImageField(default='seed/blank.webp', upload_to='productos_images'),
        ),
        migrations.AlterField(
            model_name='producto',
            name='product_img2',
            field=models.ImageField(blank=True, default='seed/blank.webp', null=True, upload_to='productos_images'),
        ),
        migrations.AlterField(
            model_name='producto',
            name='product_img3',
            field=models.ImageField(blank=True, default='seed/blank.webp', null=True, upload_to='productos_images'),
        ),
    ]
