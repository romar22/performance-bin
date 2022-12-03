# Generated by Django 4.1 on 2022-12-02 12:23

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0002_rename_date_attendance_timestamp_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='attendance',
            options={'verbose_name_plural': 'Attendance'},
        ),
        migrations.AlterModelOptions(
            name='customerratinganswers',
            options={'verbose_name_plural': 'Customer answer ratings'},
        ),
        migrations.AddField(
            model_name='customerratinganswers',
            name='date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]