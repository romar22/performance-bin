# Generated by Django 4.1 on 2022-12-02 18:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0005_alter_attendance_signature'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customerratinganswers',
            name='q5',
            field=models.TextField(blank=True, help_text='Do you have any other comments, question or concerns', max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='customerratinganswers',
            name='q6',
            field=models.CharField(blank=True, help_text='Do you know the name of the person who assisted you', max_length=255, null=True),
        ),
    ]
