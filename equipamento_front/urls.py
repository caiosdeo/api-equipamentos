from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('add-equipamento', views.add_equipamento, name='add-equipamento'),
    path('edit-equipamento/<int:pk>', views.edit_equipamento, name='edit-equipamento'),
]
