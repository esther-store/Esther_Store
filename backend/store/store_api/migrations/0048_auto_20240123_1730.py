# Generated by Django 3.2.16 on 2024-01-23 22:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store_api', '0047_alter_producto_product_img1'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='producto',
            name='about',
        ),
        migrations.AlterField(
            model_name='producto',
            name='product_description',
            field=models.CharField(blank=True, default='', max_length=500, null=True),
        ),
    ]
