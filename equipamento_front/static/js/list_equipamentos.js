const fetchEquipamentos = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/equipamentos/");
        const data = await response.json();
        displayTable(data);
    } catch (error) {
        console.error('[FETCH_EQUIPAMENTOS_ERROR]:', error);
    }
};

document.addEventListener('DOMContentLoaded', fetchEquipamentos);

let currentPage = 1;
const itemsPerPage = 8;

const displayTable = (data) => {
    const tableBody = document.querySelector('#equipamento-table tbody');
    tableBody.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedData = data.slice(start, end);

    paginatedData.forEach(equipamento => {
        const row = `
            <tr>
                <td class="text-center">${equipamento.id}</td>
                <td class="text-center">${equipamento.tipo}</td>
                <td class="text-center">${equipamento.fabricante}</td>
                <td class="text-center">${equipamento.modelo}</td>
                <td class="text-center">
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-primary btn-sm flex-fill me-1" onclick="formEquipamento(${equipamento.id}, 'detailModal')">Visualizar</button>
                        <button class="btn btn-warning btn-sm flex-fill mx-1" onclick="formEquipamento(${equipamento.id}, 'editModal')">Editar</button>
                        <button class="btn btn-danger btn-sm flex-fill ms-1" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="setDeleteId(${equipamento.id})">Excluir</button>
                    </div>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });

    updatePaginationControls(data.length);
};

const updatePaginationControls = (totalItems) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages;
    document.getElementById('page-info').textContent = `Página ${currentPage} de ${totalPages}`;
};

document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchEquipamentos();
    }
});

document.getElementById('next-page').addEventListener('click', () => {
    currentPage++;
    fetchEquipamentos();
});

const formEquipamento = async (id, modalId) => {
    try {
        const response = await fetch(`/api/equipamentos/${id}/`);
        const data = await response.json();

        const form = document.getElementById(modalId);

        form.querySelector('#equipamento_id').value = data.id;
        form.querySelector('#tipo').value = data.tipo;
        form.querySelector('#fabricante').value = data.fabricante;
        form.querySelector('#modelo').value = data.modelo;
        form.querySelector('#numero_de_serie').value = data.numero_de_serie;
        form.querySelector('#data_de_compra').value = data.data_de_compra;
        form.querySelector('#valor_de_compra').value = data.valor_de_compra;

        const modal = new bootstrap.Modal(form, {});
        modal.show();
    
    } catch (error) {
        console.error('[FORM_EQUIPAMENTO_ERROR]:', error);
    }
};

const deleteEquipamento = async (id) => {
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
        console.error('[DELETE_EQUIPAMENTO_ERROR]:', error);
    }
};