# Generated by Django 4.1 on 2023-01-01 08:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hr', '0006_alter_evaluationrubriccriteria_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='employeeevaluation',
            name='year',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
