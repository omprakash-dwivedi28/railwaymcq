# Generated by Django 5.0.3 on 2024-03-27 08:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_feedback'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedback',
            name='name',
            field=models.IntegerField(max_length=500),
        ),
    ]
