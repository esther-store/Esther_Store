# Generated by Django 3.2.16 on 2023-06-04 18:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pedido_api', '0003_listapedido_updated_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='listapedido',
            name='finalizado',
            field=models.BooleanField(default=False),
        ),
    ]
