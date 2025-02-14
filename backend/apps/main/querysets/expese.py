from core.querysets.base_queryset import BaseQuerySet


class ExpenseQuerySet(BaseQuerySet):
    def list(self, search=None, start_date=None, end_date=None, category=None, subcategory=None):
        query = self.filter(count__icontains=search) if search else self
        query = query.filter(category=category) if category else query
        query = query.filter(subcategory=subcategory) if subcategory else query

        if start_date and end_date:
            query = query.filter(created_at__range=[start_date, end_date])
        elif start_date:
            query = query.filter(created_at__gte=start_date)
        elif end_date:
            query = query.filter(created_at__lte=end_date)

        return query

