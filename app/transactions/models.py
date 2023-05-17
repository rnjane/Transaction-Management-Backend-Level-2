import uuid

from django.db import models


class Account(models.Model):
    account_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    balance = models.IntegerField()

    def __str__(self):
        return self.account_id
    
    class Meta: 
        db_table = 'account'


class Transaction(models.Model):
    transaction_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    account_id = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='account')
    amount = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.transaction_id
    
    class Meta: 
        db_table = 'transaction'
        ordering = ['-created_at']
