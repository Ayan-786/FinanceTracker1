from rest_framework.filters import SearchFilter
from rest_framework.generics import ListAPIView, UpdateAPIView, GenericAPIView, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from core.utils.pagination import pagination
from users.models import User
from users.serializers.users import UserSerializer, ChangePasswordValidator, UserFilterSerializer


class UsersListView(ListAPIView):
    serializer_class = UserSerializer
    filter_backends = (SearchFilter,)
    search_fields = ('first_name', 'last_name', 'email')

    def get_queryset(self):
        return User.objects.filter(is_active=True, company=self.request.user.company).order_by('id')

    def get(self, request):
        params = UserFilterSerializer.check(request.GET)
        queryset = User.objects.filter()
        serializer = UserSerializer(queryset, many=True)
        data = pagination(queryset, serializer, params.get('page'), )
        return Response(data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(company=request.user.company)
        return Response(serializer.data, 201)


class UserSettingsView(UpdateAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class ChangePasswordView(GenericAPIView):
    serializer_class = ChangePasswordValidator

    def put(self, request):
        user = request.user
        data = ChangePasswordValidator.check(request.data, context={'request': request})

        user.set_password(data.get('new_password'))
        user.save()
        return Response(status=200)


class UserDetailView(APIView):
    def get(self, request, pk):
        instance = get_object_or_404(User, id=pk)
        data = UserSerializer(instance).data
        return Response(data)

    def put(self, request, pk):
        instance = get_object_or_404(User, id=pk)
        serializer = UserSerializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        instance = get_object_or_404(User, id=pk)
        instance.delete()
        return Response({}, 204)
