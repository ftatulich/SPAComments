from django.db import models
from django.core.validators import MinLengthValidator, MaxLengthValidator


class Post(models.Model):
    username = models.CharField(max_length=50, blank=False, null=False)
    email = models.EmailField(blank=False, null=False)
    text = models.TextField(validators=[MinLengthValidator(1), MaxLengthValidator(5000)], blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to='', blank=True, null=True)
    image = models.FileField(upload_to='', blank=True, null=True)

    def __str__(self):
        return f'{self.username} - {self.created_at.strftime("%d/%m/%Y %H:%M:%S")}'


class Comment(models.Model):
    username = models.CharField(max_length=50, blank=False, null=False)
    email = models.EmailField(blank=False, null=False)
    text = models.TextField(validators=[MinLengthValidator(10), MaxLengthValidator(5000)], blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments', blank=False, null=False)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='replies')
    file = models.FileField(upload_to='', blank=True, null=True)
    image = models.FileField(upload_to='', blank=True, null=True)

    def __str__(self):
        return f'{self.username} - {self.created_at.strftime("%d/%m/%Y %H:%M:%S")}'
