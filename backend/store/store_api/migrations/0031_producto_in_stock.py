# Generated by Django 3.2.16 on 2023-05-30 21:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store_api', '0030_alter_producto_product_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='in_stock',
            field=models.IntegerField(blank=True, default=1, null=True),
        ),
    ]
