from rest_framework import generics
from transactions.serializers import AccountSerializer, TransactionSerializer

from .models import Account, Transaction


class TransactionsList(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def perform_create(self, serializer):
        account_id = self.request.data['account_id']
        amount = self.request.data['amount']
        account = Account.objects.get(account_id=account_id)
        account.balance -= amount
        account.save()
        serializer.save()


class TransactionDetails(generics.RetrieveAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class AccountList(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class AccountDetails(generics.RetrieveAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
