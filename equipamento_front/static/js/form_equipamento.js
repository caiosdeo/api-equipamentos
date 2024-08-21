const convertEmptyToNull = (value) => value === '' ? null : value;

const handleSubmit = async (event, formId, method) => {
    event.preventDefault(); 

    let url = '/api/equipamentos/';

    const formData = new FormData(document.getElementById(formId));

    const data = {};
    formData.forEach((value, key) => {
        data[key] = convertEmptyToNull(value);
    });

    if (method === 'PUT') {
        const id = data.equipamento_id;
        delete data.equipamento_id;
        url = `${url}${id}/`;
    }

    const jsonData = JSON.stringify(data);

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: jsonData
        });

        const result = await response.json();

        if (response.ok) {
            showMessageModal('Sucesso', `Equipamento ${method === 'POST' ? 'adicionado' : 'editado'} com sucesso!`);
            fetchEquipamentos();
        } else {
            throw new Error(result);
        }
    
    } catch (error) {
        console.error(`[${method}_EQUIPAMENTO_ERROR]:`, error);
        showMessageModal('Erro', `Ocorreu um erro ao ${method === 'POST' ? 'adicionar' : 'editar'} o equipamento.`);
    }
};

document.getElementById('add-equipamento-form').addEventListener('submit', (event) => {
    handleSubmit(event, 'add-equipamento-form', 'POST');
});

document.getElementById('edit-equipamento-form').addEventListener('submit', (event) => {
    handleSubmit(event, 'edit-equipamento-form', 'PUT');
});