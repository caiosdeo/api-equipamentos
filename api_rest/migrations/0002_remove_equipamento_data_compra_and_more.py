# Generated by Django 5.1 on 2024-08-21 03:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_rest', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='equipamento',
            name='data_compra',
        ),
        migrations.RemoveField(
            model_name='equipamento',
            name='valor_compra',
        ),
        migrations.AddField(
            model_name='equipamento',
            name='data_de_compra',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='equipamento',
            name='valor_de_compra',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=12, null=True),
        ),
    ]
