from django.urls import path

from main.views.category import CategoryListView, CategoryDetailView
from main.views.expense import ExpenseListView, ExpenseDetailView

urlpatterns = [
    path('expense', ExpenseListView.as_view(), name='expense-list'),
    path('expense/<int:pk>', ExpenseDetailView.as_view(), name='expense-detail'),
    path('category', CategoryListView.as_view(), name='category-list'),
    path('category/<int:pk>', CategoryDetailView.as_view(), name='category-detail'),
]
