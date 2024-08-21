const setDeleteId = (id) => {
    const confirmButton = document.getElementById('confirmDelete');
    confirmButton.setAttribute('onclick', `deleteEquipamento(${id})`);
}

const showMessageModal = (title, message) => {
    const modalTitle = document.getElementById('dynamicModalTitle');
    modalTitle.textContent = title;

    const modalBody = document.getElementById('dynamicModalBody');
    modalBody.textContent = message; 

    const messageModal = new bootstrap.Modal(document.getElementById('messageModal'), {});
    messageModal.show();
}