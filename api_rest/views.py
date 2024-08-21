from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status

from .models import Equipamento
from .serializers import EquipamentoSerializer

# Endpoints para listar equipamentos e criar um novo
class EquipamentoList(APIView):
    def get(self, request):

        equipamentos = Equipamento.objects.all()

        serializer = EquipamentoSerializer(equipamentos, many=True)
        return Response(serializer.data)

    def post(self, request):

        serializer = EquipamentoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return(Response(status=status.HTTP_400_BAD_REQUEST))


# Endpoints específicos a um equipamento: detalhes, edição e deleção
class EquipamentoDetails(APIView):

    def get_equipamento(self, id):
        try:
            equipamento = Equipamento.objects.get(pk=id)
            return equipamento;
        except:
            raise NotFound(detail="Equipamento não encontrado", code=404)  

    def get(self, request, id):

        equipamento = self.get_equipamento(id)
        serializer = EquipamentoSerializer(equipamento)
        return Response(serializer.data)
    
    def put(self, request, id):

        equipamento = self.get_equipamento(id)
        serializer = EquipamentoSerializer(instance=equipamento, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        
        return(Response(status=status.HTTP_400_BAD_REQUEST))
    
    def delete(self, request, id):
        equipamento = self.get_equipamento(id)

        equipamento.delete()
        return Response("Equipamento removido com sucesso!", status=status.HTTP_204_NO_CONTENT)


