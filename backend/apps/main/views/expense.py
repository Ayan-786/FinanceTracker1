from django.db.models import Sum
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from core.utils.pagination import pagination
from main.models import Expense
from main.serializers.expense import ExpenseFilterSerializer, ExpenseSerializer


class ExpenseListView(APIView):
    def get(self, request):
        params = ExpenseFilterSerializer.check(request.GET)
        queryset = Expense.objects.list(search=params.get('search'), start_date=params.get('start_date'),
                                        end_date=params.get('end_date'),
                                        )

        serializer = ExpenseSerializer(queryset, many=True)
        total_expense = queryset.aggregate(total=Sum('amount'))['total'] or 0

        paginated_data = pagination(queryset, serializer, params.get('page'), params.get('size'))
        response_data = {
            **paginated_data,
            "total_expense": total_expense
        }

        return Response(response_data)

    def post(self, request):
        serializer = ExpenseSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)


class ExpenseDetailView(APIView):
    def get(self, request, pk):
        instance = get_object_or_404(Expense, id=pk)
        data = ExpenseSerializer(instance).data
        return Response(data)

    def put(self, request, pk):
        instance = get_object_or_404(Expense, pk=pk)
        serializer = ExpenseSerializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        instance = get_object_or_404(Expense, id=pk)
        instance.delete()
        return Response({}, 204)
