# Generated by Django 5.1.7 on 2025-03-11 16:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_alter_account_employee'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='employee',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, to='authentication.employee'),
            preserve_default=False,
        ),
    ]
