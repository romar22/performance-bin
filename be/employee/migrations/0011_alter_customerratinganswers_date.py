# Generated by Django 4.1 on 2022-12-06 16:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0010_alter_customerratinganswers_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customerratinganswers',
            name='date',
            field=models.CharField(default='', max_length=255),
        ),
    ]