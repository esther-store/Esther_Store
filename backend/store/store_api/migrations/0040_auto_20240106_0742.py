# Generated by Django 3.2.16 on 2024-01-06 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store_api', '0039_auto_20240106_0738'),
    ]

    operations = [
        migrations.AlterField(
            model_name='promotion',
            name='active',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='promotion',
            name='is_special',
            field=models.BooleanField(default=False),
        ),
    ]
