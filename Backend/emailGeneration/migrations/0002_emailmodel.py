# Generated by Django 4.2.3 on 2023-08-09 06:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('emailGeneration', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='emailModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('receiverEmail', models.EmailField(max_length=254)),
                ('subject', models.CharField(max_length=100)),
                ('message', models.CharField(max_length=1000)),
                ('targetPerson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='emailGeneration.persondata')),
            ],
        ),
    ]
