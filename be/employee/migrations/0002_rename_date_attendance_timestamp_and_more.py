# Generated by Django 4.1 on 2022-12-02 11:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('employee', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='attendance',
            old_name='date',
            new_name='timestamp',
        ),
        migrations.CreateModel(
            name='CustomerRatingAnswers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('q1', models.CharField(choices=[('VERYPOSITIVE', 'Very Positive'), ('SOMEWHATPOSITIVE', 'Somewhat Positive'), ('NEUTRAL', 'Negative'), ('SOMEWHATNEGATIVE', 'Somewhat Negative'), ('VERYNEGATIVE', 'Very Negative')], help_text='Overall, how would you rate the quality of your customer service experience', max_length=50)),
                ('q2', models.CharField(choices=[('EXTREMELYWELL', 'Extremely Well'), ('VERYWELL', 'Very well'), ('SOMEWHATWELL', 'Somewhat Well'), ('NOTSOWELL', 'Not So Well'), ('NOTATALLWELL', 'Not at all well')], help_text='How well we understand and address your questions and concerns?', max_length=50)),
                ('q3', models.CharField(choices=[('MUCHSHORTERTHANEXPECTED', 'Much shorter than expected'), ('ABOUTWHATIEXPECT', 'About what I expected'), ('SHORTERTHANEXPECTED', 'Shorter than expected'), ('LONGERTHANIEXPECTED', 'Longer than I expected'), ('MUCHLONGERTHANIEXPECTED', 'Much longer than I expected')], help_text='How much time did it take us to address your questions and concerns?', max_length=50)),
                ('q4', models.IntegerField(help_text='How likely is it that you would recommend our company/product/services to a friend or colleagues? Rate us between 1 to 5, wherein 5 is the Highest and 1 is the Lowest: ')),
                ('q5', models.TextField(help_text='Do you have any other comments, question or concerns', max_length=500)),
                ('q6', models.CharField(help_text='Do you know the name of the person who assisted you', max_length=255)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='customer_employeeratings', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]