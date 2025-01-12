# Generated by Django 3.2.16 on 2023-05-05 23:24

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store_api', '0026_alter_score_comment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='score',
            name='score',
            field=models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)]),
        ),
    ]
