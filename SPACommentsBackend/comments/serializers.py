from rest_framework import serializers
from .models import Post, Comment


class FileFieldSerializer(serializers.FileField):
    def to_internal_value(self, data):
        return data


class PostCreateSerializer(serializers.ModelSerializer):
    image = FileFieldSerializer(required=False)
    file = FileFieldSerializer(required=False)

    class Meta:
        model = Post
        fields = ('id', 'username', 'email', 'text', 'created_at', 'image', 'file')


class CommentCreateSerializer(serializers.ModelSerializer):
    image = FileFieldSerializer(required=False)
    file = FileFieldSerializer(required=False)

    class Meta:
        model = Comment
        fields = ('id', 'username', 'email', 'text', 'created_at', 'post', 'parent', 'image', 'file')


class CommentSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ('id', 'username', 'email', 'text', 'created_at', 'file', 'image', 'replies')

    @staticmethod
    def get_replies(obj):
        replies = obj.replies.all()
        serializer = CommentSerializer(instance=replies, many=True)
        return serializer.data


class PostSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'username', 'text', 'created_at', 'image', 'file', 'comments')

    @staticmethod
    def get_comments(obj):
        comments = obj.comments.filter(parent=None)
        serializer = CommentSerializer(instance=comments, many=True)
        return serializer.data
