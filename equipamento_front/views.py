from django.shortcuts import render

def index(request):
    return render(request, "pages/index.html")

def add_equipamento(request):
    return render(request, "pages/add-equipamento.html")

def edit_equipamento(request, pk):
    context = {'pk': pk}
    return render(request, "pages/edit-equipamento.html", context)