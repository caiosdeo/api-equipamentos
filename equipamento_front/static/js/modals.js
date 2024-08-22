const setDeleteId = (id) => {
    const form = document.getElementById("deleteModal");
    form.querySelector('#equipamento_id').setAttribute('value', id);
}

const cleanForm = (modalId) => {
    const form = document.getElementById(modalId);

    form.querySelector('#equipamento_id').value = '';
    form.querySelector('#tipo').value = '';
    form.querySelector('#fabricante').value = '';
    form.querySelector('#modelo').value = '';
    form.querySelector('#numero_de_serie').value = '';
    form.querySelector('#data_de_compra').value = '';
    form.querySelector('#valor_de_compra').value = '';

};

const showMessageModal = (type, message) => {
    
    const modalTitle = document.getElementById('dynamicModalTitle');

    if (type === 'Sucesso') {
        modalTitle.setAttribute('class', 'text-success');
        modalTitle.innerHTML = '<i class="material-icons me-2">&#xE86C;</i><span>Sucesso</span>';
    } else {
        modalTitle.setAttribute('class', 'text-danger');
        modalTitle.innerHTML = '<i class="material-icons me-2">&#xE000;</i><span>Erro</span>';
    }

    const modalBody = document.getElementById('dynamicModalBody');
    modalBody.textContent = message; 

    const messageModal = new bootstrap.Modal(document.getElementById('messageModal'), {});
    messageModal.show();
}

const closeModal = (modalId) => {
    const modalElement = document.getElementById(modalId);
    const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);

    modalInstance.hide();

    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
        backdrop.remove();
    }

    document.body.classList.remove('modal-open');
    document.body.style.overflow = ''; 

    const form = document.getElementById(modalId.replace('Modal', '-equipamento-form'));
    if (form) {
        form.reset();
    }
}