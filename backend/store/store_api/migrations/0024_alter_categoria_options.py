# Generated by Django 3.2.16 on 2023-05-01 18:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store_api', '0023_auto_20230430_1222'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='categoria',
            options={'ordering': ['nombre', 'id']},
        ),
    ]
