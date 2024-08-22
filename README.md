# API Equipamentos

Projeto que contempla uma API Rest e uma aplicação web que permite um usuário cadastrar, editar, deletar e visualizar equipamentos.

Foi desenvolvido utilizando Python, Django, Django Rest Framework, SQLite, HTML, CSS, Bootstrap e JavaScript.

## Estrutura do projeto

### api_root

O projeto conta com o diretório `api_root` onde estão as configurações do mesmo no arquivo `settings.py`.
Também nele estão definidas e incluídas as URLs do projeto.

### api_rest

Aplicação responsável pela API do projeto, nela estão definidas as rotas, as views, serializers e o modelo de dados de Equipamento.

Também conta com a definição do painel de administrador com as seguintes credenciais: 

```
user: admin
senha: admin
```

### equipamentos_front

Aplicação resposável pelo front-end, onde estão definidos os templates e os scripts de interação com a API.

## Pré-requisito

Ter instalado no mínimo a versão 3.10.12 do Python.

## Instalação

1. Clone o repositório: 
```sh
git clone https://github.com/caiosdeo/api-equipamentos.git
```

2. Entre no repositório clonado
```sh
cd api-equipamentos/
```

3. Crie e ative um ambiente virtual. 
```sh
python3 -m venv equips_api_venv

# Linux/MacOS
source equips_api_venv/bin/activate

# Windows
equips_api_venv\Scripts\activate
```

Se preferir, use o *conda* para criar o ambiente, lembrando de usar a versão mínima de 3.10.12 do Python.
```sh
conda create --name equips_api_venv python=3.10

conda activate equips_api_venv
```

4. Instale as dependências
```sh
pip install -r requirements.txt
```

5. Inicie o servidor
```sh
python3 manage.py runserver
```

6. Acesse a aplicação com a URL fornecida na saída do comando anterior
```sh
Starting development server at http://127.0.0.1:8000/
```

### Banco de dados

Já existe um banco de dados de modelo junto com o repositório, `db.sqlite3`.
Ele contém 17 registros de equipamentos diversos.
Caso queira utilizar um banco vazio, é só remover o atual do diretório, movendo ou excluindo e criar um novo.

1. Remova o banco de dados existente
```sh
rm db.sqlite3
```

2. Crie um novo banco
```sh
python3 manage.py migrate
```

3. Crie um novo superuser, caso queira usar o painel de administrador
```sh
python3 manage.py createsuperuser

# Username
admin
# Email address
pressione Enter
# Password
admin
# Password (again)
admin
# Bypass
Y
```

Feito isso, só executar os passos anteriores a partir do 5.

### Painel de Admin

É possível acessar o painel de admin para ter outra visualização da API.
O acesso é feito com a seguinte URL: `http://127.0.0.1:8000/admin`

## API 

A URL base para todos os endpoints é: `http://127.0.0.1:8000/`.

### Listar equipamentos

Endpoint para listar todos os equipamentos cadastrados.

- **URL:** `/api/equipamentos`
- **Método:** GET

### Criar equipamento

Endpoint para criar um novo equipamento.
- **URL:** `/api/equipamentos`
- **Método:** POST
- **Corpo da requisição:**
```json
{
  "tipo": "Tipo de equipamento",
  "fabricante": "Fabricante do equipamento",
  "modelo": "Modelo do equipamento",
  "numero_de_serie": "Numero de serie",
  "data_de_compra": "2024-08-21", (opcional)
  "valor_de_compra": "" (opcional)
}
```

### Detalhes de um equipamento

Endpoint para obter os detalhes de um equipamento específico.

- **URL:** `/api/equipamentos/{id}/`
- **Método:** GET
- **Parâmetros de rota:** `id` do equipamento

### Atualizar equipamento

Endpoint para atualizar os dados de um equipamento existente.

- **URL**: `/api/equipamentos/{id}/`
- **Método:** PUT
- **Parâmetros de rota:** `id` do equipamento
- **Corpo da Requisição:**
```json
{
  "tipo": "Tipo de equipamento", (opcional)
  "fabricante": "Fabricante do equipamento", (opcional)
  "modelo": "Modelo do equipamento", (opcional)
  "numero_de_serie": "Numero de serie", (opcional)
  "data_de_compra": "2024-08-21", (opcional)
  "valor_de_compra": "" (opcional)
}
```

### Deletar um equipamento

Endpoint para deletar um equipamento específico.

- **URL:** `/api/equipamentos/{id}/`
- **Método:** DELETE
- **Parâmetros de rota:** `id` do equipamento