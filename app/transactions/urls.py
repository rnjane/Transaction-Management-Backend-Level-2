from django.urls import path

from .views import (AccountDetails, AccountList, TransactionDetails,
                    TransactionsList)

urlpatterns = [
    path('transactions/', TransactionsList.as_view()),
    path('transactions/<uuid:pk>/', TransactionDetails.as_view()),
    path('accounts/<uuid:pk>/', AccountDetails.as_view()),
    path('accounts/', AccountList.as_view()),
]