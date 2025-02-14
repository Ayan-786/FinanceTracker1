from django.db.models import Sum, Min, Max
from rest_framework.generics import get_object_or_404
from rest_framework.views import APIView
from rest_framework.views import Response

from core.utils.pagination import pagination
from main.models import Category, Expense
from main.serializers.category import CategorySerializer, CategoryFilterSerializer


class CategoryListView(APIView):
    def get(self, request):
        params = CategoryFilterSerializer.check(request.GET)

        # Get filtered queryset with category-wise annotations
        queryset = Category.objects.list(search=params.get('search')).annotate(
            first_expense_date=Min('expenses__date'),
            last_expense_date=Max('expenses__date')
        )

        total_expense = queryset.aggregate(total=Sum('total_expense'))['total'] or 0


        # Serialize the category-wise data
        serializer = CategorySerializer(queryset, many=True)


        aggregated_data = Expense.objects.aggregate(
            first_expense_date=Min('date'),
            last_expense_date=Max('date')
        )
        # Paginate the response
        paginated_data = pagination(queryset, serializer, params.get('page'), params.get('size'))

        # Include aggregated totals in response
        response_data = {
            **paginated_data,
            "total_expense": total_expense,
            "first_expense_date": aggregated_data["first_expense_date"],
            "last_expense_date": aggregated_data["last_expense_date"]
        }

        return Response(response_data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class CategoryDetailView(APIView):
    def get(self, request, pk):
        instance = get_object_or_404(Category, id=pk)
        data = CategorySerializer(instance).data
        return Response(data)

    def put(self, request, pk):
        instance = get_object_or_404(Category, pk=pk)
        serializer = CategorySerializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        instance = get_object_or_404(Category, id=pk)
        instance.delete()
        return Response({}, 204)
