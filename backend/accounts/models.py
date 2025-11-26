from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone = models.CharField(max_length=32, blank=True)
    chama_name = models.CharField(max_length=128, blank=True)
    chama_type = models.CharField(max_length=128, blank=True)

    def __str__(self):
        return f"Profile({self.user.username})"
