
def pagination(queryset, serializer_class, page, size=15):
    paginated_qs = pagination_queryset(queryset, page, size)['queryset']
    serializer_instance = serializer_class(paginated_qs, many=True)
    serialized_data = serializer_instance.data
    return {'count': queryset.count(), 'results': serialized_data}


def pagination_queryset(queryset, page, size=15):
    page = int(page or 1)
    offset = (page - 1) * size
    limit = offset + size
    return {'queryset': queryset[offset:limit], 'limit': limit, 'offset': offset}
