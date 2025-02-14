from rest_framework import serializers

from core.utils.serializers import ValidatorSerializer
from main.models import Expense, Category
from main.serializers.category import CategorySerializer


class ExpenseSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['select_category'] = CategorySerializer(instance.category).data
        return data

    class Meta:
        model = Expense
        fields = ('id', 'name', 'category', 'amount', 'date', 'comment', 'created_at', 'updated_at')


class ExpenseFilterSerializer(ValidatorSerializer):
    page = serializers.IntegerField(default=1)
    size = serializers.IntegerField(default=15)
    search = serializers.CharField(required=False)
    start_date = serializers.DateField(required=False)
    end_date = serializers.DateField(required=False)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), required=False)
