from django.db.models import Q
from rest_framework import filters
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView

from .models import Post
from .serializers import PostCreateSerializer, CommentCreateSerializer, PostSerializer


class PostCreateView(CreateAPIView):
    serializer_class = PostCreateSerializer


class CommentCreateView(CreateAPIView):
    serializer_class = CommentCreateSerializer


class PostsView(ListAPIView):
    serializer_class = PostCreateSerializer
    filter_backends = (filters.OrderingFilter,)

    ordering_fields = ('username', 'email', 'created_at')

    def get_queryset(self):
        queryset = Post.objects.all()
        sort_field = self.request.query_params.get('sort', 'created_at')
        sort_order = self.request.query_params.get('order', 'desc')
        if sort_order == 'asc':
            queryset = queryset.order_by(sort_field)
        else:
            queryset = queryset.order_by(f'-{sort_field}')

        filter_field = self.request.query_params.get('filter', None)
        filter_value = self.request.query_params.get('value', None)
        if filter_field and filter_value:
            queryset = queryset.filter(Q(**{f'{filter_field}__icontains': filter_value}))

        return queryset


class PostDetailView(RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
