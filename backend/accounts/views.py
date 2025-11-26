from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import SignUpSerializer
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import IntegrityError


@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    """Simple login endpoint for development: authenticates and creates a session.

    Exempt from CSRF for development convenience. In production, use proper CSRF handling
    or token-based authentication.
    """
    def post(self, request, *args, **kwargs):
        username = request.data.get('identifier')
        password = request.data.get('password')
        # allow phone or email as username; our SignUp used email or phone as username
        user = authenticate(request, username=username, password=password)
        if user is None:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        login(request, user)
        return Response({'id': user.id, 'username': user.username})


@method_decorator(csrf_exempt, name='dispatch')
class SignUpView(APIView):
    """Signup endpoint. Marked csrf_exempt for simple dev flow so the frontend can POST without a CSRF token.

    In production, remove csrf_exempt and use a proper authentication/token flow or ensure CSRF token is sent.
    """
    def post(self, request, *args, **kwargs):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()
            except IntegrityError:
                return Response({'detail': 'User with this username already exists'}, status=status.HTTP_400_BAD_REQUEST)
            # create JWT tokens for the new user
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    'id': user.id,
                    'username': user.username,
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
