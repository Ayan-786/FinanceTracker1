from django.db import models

from core.models import BaseModel
from main.querysets.category import CategoryQuerySet
from main.querysets.expese import ExpenseQuerySet


class Expense(BaseModel):
    name = models.CharField(max_length=255, blank=True, null=True)
    category = models.ForeignKey('main.Category', on_delete=models.CASCADE, blank=True, null=True,
                                 related_name='expenses')
    amount = models.BigIntegerField(blank=True, null=True, )
    date = models.DateField(blank=True, null=True, )
    comment = models.TextField(blank=True, null=True)
    objects = ExpenseQuerySet.as_manager()

    def __str__(self):
        return f"Expense: {self.name} - {self.amount}"

    class Meta:
        verbose_name = "Expense"
        verbose_name_plural = "Expenses"
        ordering = ["-created_at"]


class Category(BaseModel):
    name = models.CharField(max_length=255)
    objects = CategoryQuerySet.as_manager()
