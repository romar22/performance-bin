# Generated by Django 4.1 on 2022-12-18 07:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0004_customerratinganswers_q1_score_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='attendance',
            name='late',
            field=models.BooleanField(default=False),
        ),
    ]
