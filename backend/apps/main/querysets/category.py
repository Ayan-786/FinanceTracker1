from django.db.models import Sum

from core.querysets.base_queryset import BaseQuerySet


class CategoryQuerySet(BaseQuerySet):
    def list(self, search=None):
        query = self.filter(name__icontains=search) if search else self
        return query.annotate(total_expense=Sum('expenses__amount')).order_by('id')
