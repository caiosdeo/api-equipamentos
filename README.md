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

## Instalação

1. Clone o repositório: 
```sh
git clone https://github.com/caiosdeo/api-equipamentos.git
```

2. No diretório onde o repositório foi clonado, crie e ative um ambiente virtual
```sh
python3 -m venv equips_api_venv

# Linux/MacOS
source equips_api_venv/bin/activate

# Windows
equips_api_venv\Scripts\activate
```

3. Instale as dependências
```sh
pip install -r requirements.txt
```

4. Inicie o servidor
```sh
python3 manage.py runserver
```

5. Acesse a aplicação com a URL fornecida na saída do comando anterior
```sh
Starting development server at http://127.0.0.1:8000/
```

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