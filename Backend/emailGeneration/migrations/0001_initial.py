# Generated by Django 4.2.3 on 2023-07-29 18:44

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='personData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=200)),
                ('first_name', models.CharField(blank=True, max_length=150)),
                ('middle_initial', models.CharField(blank=True, max_length=150)),
                ('last_name', models.CharField(blank=True, max_length=150)),
                ('address', models.CharField(blank=True, max_length=200)),
                ('county', models.CharField(blank=True, max_length=30)),
                ('city', models.CharField(blank=True, max_length=30)),
                ('state', models.CharField(blank=True, max_length=30)),
                ('age_range', models.CharField(blank=True, max_length=10)),
                ('income_range', models.CharField(blank=True, max_length=50)),
                ('gender', models.CharField(blank=True, max_length=20)),
                ('zipcode', models.IntegerField()),
                ('countycode', models.IntegerField()),
                ('potential_investor', models.CharField(blank=True, max_length=100)),
                ('hobbies', models.CharField(blank=True, max_length=200)),
                ('language', models.CharField(blank=True, max_length=100)),
                ('ethnicity', models.CharField(blank=True, max_length=100)),
                ('marital_status', models.CharField(blank=True, max_length=50)),
                ('home_owner', models.CharField(blank=True, max_length=20)),
                ('neighbourhood', models.CharField(blank=True, max_length=200)),
                ('estimated_household_income', models.CharField(blank=True, max_length=200)),
                ('housing_type', models.CharField(blank=True, max_length=200)),
                ('estimated_home_vale', models.CharField(blank=True, max_length=100)),
                ('year_home_built', models.IntegerField()),
                ('mail_order_purchase', models.CharField(blank=True, max_length=1000)),
                ('actual_age', models.IntegerField()),
                ('subject_interest', models.CharField(blank=True, max_length=200)),
                ('birth_month', models.CharField(blank=True, max_length=50)),
                ('number_of_children', models.IntegerField()),
                ('veterans', models.CharField(blank=True, max_length=10)),
                ('home_size', models.IntegerField()),
                ('cosmectics', models.CharField(blank=True, max_length=250)),
                ('magzines', models.CharField(blank=True, max_length=100)),
                ('sports', models.CharField(blank=True, max_length=100)),
                ('health', models.CharField(blank=True, max_length=150)),
                ('motor_intrest', models.CharField(blank=True, max_length=100)),
                ('outdoor_recreation', models.CharField(blank=True, max_length=100)),
                ('personal_finance', models.CharField(blank=True, max_length=50)),
                ('pet_animals', models.CharField(blank=True, max_length=50)),
                ('photography', models.CharField(blank=True, max_length=50)),
                ('politics', models.CharField(blank=True, max_length=70)),
                ('purchase_behaviour', models.CharField(blank=True, max_length=100)),
                ('technology_entertainment', models.CharField(blank=True, max_length=100)),
                ('travel', models.CharField(blank=True, max_length=80)),
            ],
        ),
    ]
