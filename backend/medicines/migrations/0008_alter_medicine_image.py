# Generated by Django 5.1.7 on 2025-03-19 16:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medicines', '0007_alter_medicine_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicine',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='medicines/'),
        ),
    ]
