from django.db.models import Sum, Min, Max
from rest_framework import serializers

from core.utils.serializers import ValidatorSerializer
from main.models import Category


class CategorySerializer(serializers.ModelSerializer):
    total_expense = serializers.SerializerMethodField()
    first_expense_date = serializers.SerializerMethodField()
    last_expense_date = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ('id', 'name', 'total_expense', 'created_at', 'first_expense_date', 'last_expense_date',)

    def get_total_expense(self, obj):
        return obj.expenses.aggregate(total=Sum('amount'))['total'] or 0

    def get_first_expense_date(self, obj):
        return obj.expenses.aggregate(first_date=Min('date'))['first_date']

    def get_last_expense_date(self, obj):
        return obj.expenses.aggregate(last_date=Max('date'))['last_date']


class CategoryFilterSerializer(ValidatorSerializer):
    page = serializers.IntegerField(default=1)
    size = serializers.IntegerField(default=15)
    search = serializers.CharField(required=False)
