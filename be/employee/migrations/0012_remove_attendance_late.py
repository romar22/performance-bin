# Generated by Django 4.1 on 2022-12-25 16:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0011_alter_attendance_minutes_late'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='attendance',
            name='late',
        ),
    ]