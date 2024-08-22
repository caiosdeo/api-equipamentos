const convertEmptyToNull = (value) => value === '' ? null : value;

const formatFormData = (formId) => {
    const formData = new FormData(document.getElementById(formId));
    const data = {};
    formData.forEach((value, key) => {
        data[key] = convertEmptyToNull(value);
    });
    return data;
};

const sendRequest = async (url, method) => {


    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            console.log('Response não OK');
            const result = await response.json();
            throw new Error(result);
        }

        return response.json();
    } catch (error) {
        console.error(`[${method}_REQUEST_ERROR]:`, error);
        throw error;
    }
};

const handleSubmit = async (event, formId, method) => {
    event.preventDefault();

    const data = formatFormData(formId);
    let url = '/api/equipamentos/';

    // Tratando o data para não ser enviado o id 
    if (method === 'PUT') {
        url =  `${url}${data.equipamento_id}/`
        delete data.equipamento_id;
    }
    data.valor_de_compra = data.valor_de_compra ? numberFromBRL(data.valor_de_compra) : 0;

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            showMessageModal('Sucesso', `Equipamento ${method === 'POST' ? 'adicionado' : 'editado'} com sucesso!`);
            fetchEquipamentos();
        } else {
            showMessageModal('Erro', `Ocorreu um erro ao ${method === 'POST' ? 'adicionar' : 'editar'} o equipamento.`);
        }

    } catch (error) {
        console.error(`[${method}_REQUEST_ERROR]:`, error);
    }
    closeModal(method === 'POST' ? 'addModal' : 'editModal');
};

const handleDelete = async (event) => {
    event.preventDefault();

    const data = formatFormData('delete-equipamento-form');
    const id = data.equipamento_id;

    try {
        const response = await fetch(`/api/equipamentos/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
            },
        });

        if (response.ok) {
            showMessageModal('Sucesso', 'Equipamento excluído com sucesso!');
            fetchEquipamentos();
        } else {
            showMessageModal('Erro', 'Erro ao excluir equipamento!');
        }

    } catch (error) {
        console.error('[HANDLE_DELETE_ERROR]:', error);
    }

    closeModal('deleteModal');
};

document.getElementById('add-equipamento-form').addEventListener('submit', (event) => handleSubmit(event, 'add-equipamento-form', 'POST'));
document.getElementById('edit-equipamento-form').addEventListener('submit', (event) => handleSubmit(event, 'edit-equipamento-form', 'PUT'));

document.getElementById('delete-equipamento-form').addEventListener('submit', handleDelete);