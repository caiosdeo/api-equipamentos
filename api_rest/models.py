from django.db import models

class Equipamento(models.Model):
    tipo = models.CharField(max_length=150)
    fabricante = models.CharField(max_length=150)
    modelo = models.CharField(max_length=150)
    numero_de_serie = models.CharField(max_length=150)
    data_de_compra = models.DateField(blank=True, null=True) 
    valor_de_compra = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True, default=0)

    def __str__(self):
        return f"{self.modelo} - {self.fabricante}"
