from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


def pagination(queryset, page, size=15):
    paginator = Paginator(queryset, size)
    try:
        paginated_queryset = paginator.page(page)
    except PageNotAnInteger:
        paginated_queryset = paginator.page(1)
    except EmptyPage:
        paginated_queryset = paginator.page(paginator.num_pages)

    return {
        'queryset': paginated_queryset,
        'count': paginator.count
    }
