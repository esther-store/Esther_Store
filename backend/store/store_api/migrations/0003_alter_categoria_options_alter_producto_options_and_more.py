# Generated by Django 4.0.4 on 2022-09-09 18:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store_api', '0002_alter_producto_product_img'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='categoria',
            options={'ordering': ['id']},
        ),
        migrations.AlterModelOptions(
            name='producto',
            options={'ordering': ['id']},
        ),
        migrations.AddField(
            model_name='producto',
            name='precio',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='producto',
            name='product_img',
            field=models.ImageField(default='productos_images/blank.png', upload_to='productos_images'),
        ),
    ]
