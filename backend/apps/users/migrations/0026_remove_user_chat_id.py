# Generated by Django 3.0.5 on 2025-02-07 19:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0025_user_code'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='chat_id',
        ),
    ]
