from rest_framework.pagination import PageNumberPagination

class NoPagination(PageNumberPagination):
    page_size = None

class MyCustomPagination(PageNumberPagination):
    page_size = 14
    page_size_query_param = 'page_size'