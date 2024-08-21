from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/equipamentos/', include('api_rest.urls')),
    path('', include('equipamento_front.urls'), name='front_urls')
]
