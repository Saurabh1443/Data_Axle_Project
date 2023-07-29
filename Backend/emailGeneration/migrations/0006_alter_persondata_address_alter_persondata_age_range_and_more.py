# Generated by Django 4.2.3 on 2023-07-29 10:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('emailGeneration', '0005_rename_martial_status_persondata_marital_status_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='persondata',
            name='address',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='persondata',
            name='age_range',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AlterField(
            model_name='persondata',
            name='city',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AlterField(
            model_name='persondata',
            name='county',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AlterField(
            model_name='persondata',
            name='ethnicity',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='persondata',
            name='first_name',
            field=models.CharField(blank=True, max_length=150),
        ),
        migrations.AlterField(
            model_name='persondata',
            name='hobbies',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='persondata',
            name='home_owner',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AlterField(
            model_name='persondata',
            name='income_range',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='persondata',
            name='language',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='persondata',
            name='last_name',
            field=models.CharField(blank=True, max_length=150),
        ),
        migrations.AlterField(
            model_name='persondata',
            name='marital_status',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='persondata',
            name='middle_initial',
            field=models.CharField(blank=True, max_length=150),
        ),
        migrations.AlterField(
            model_name='persondata',
            name='neighborhood',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='persondata',
            name='potential_investor',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='persondata',
            name='state',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AlterField(
            model_name='persondata',
            name='title',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
