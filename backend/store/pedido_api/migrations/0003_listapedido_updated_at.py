# Generated by Django 3.2.16 on 2023-06-04 18:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pedido_api', '0002_pedido_updated_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='listapedido',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
