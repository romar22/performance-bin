# Generated by Django 4.1 on 2022-12-25 11:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hr', '0003_employeepositions_rubrictemplate_rubriccriteria'),
        ('users', '0003_employee_next_sunday'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='type',
        ),
        migrations.AddField(
            model_name='employee',
            name='designation',
            field=models.CharField(choices=[('SUPERVISOR', 'Supervisor'), ('STAFF', 'Staff')], default='STAFF', max_length=50),
        ),
        migrations.AlterField(
            model_name='employee',
            name='position',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='user_employee2', to='hr.employeepositions'),
        ),
    ]
