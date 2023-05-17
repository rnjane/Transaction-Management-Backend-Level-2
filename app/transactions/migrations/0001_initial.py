# Generated by Django 4.1.4 on 2023-05-17 08:51

import uuid

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('account_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('balance', models.IntegerField()),
            ],
            options={
                'db_table': 'account',
            },
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('transaction_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('amount', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('account_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='account', to='transactions.account')),
            ],
            options={
                'db_table': 'transaction',
                'ordering': ['-created_at'],
            },
        ),
    ]
