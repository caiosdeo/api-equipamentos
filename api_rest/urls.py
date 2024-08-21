from django.urls import path

from . import views

urlpatterns = [
    path('', views.EquipamentoList.as_view(), name='list_create'),
    path('<int:id>/', views.EquipamentoDetails.as_view(), name='read_update_delete'),
]
