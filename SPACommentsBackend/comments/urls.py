from django.urls import path
from .views import PostCreateView, CommentCreateView, PostsView, PostDetailView

urlpatterns = [
    path('posts/', PostsView.as_view(), name='posts'),
    path('posts/<int:pk>/', PostDetailView.as_view(), name='posts'),
    path('posts/create/', PostCreateView.as_view(), name='create_post'),
    path('comments/create/', CommentCreateView.as_view(), name='create_comment'),
]
