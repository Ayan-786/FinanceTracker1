# Generated by Django 3.0.5 on 2020-10-05 09:52
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('users', '0004_user_inviter'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='inviter',
        ),
        migrations.AddField(
            model_name='user',
            name='invitation_token',
            field=models.CharField(blank=True, max_length=8, null=True),
        ),
    ]
