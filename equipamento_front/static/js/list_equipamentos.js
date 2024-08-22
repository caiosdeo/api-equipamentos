const fetchEquipamentos = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/equipamentos/");
        const data = await response.json();
        displayTable(data);
    } catch (error) {
        console.error("[FETCH_EQUIPAMENTOS_ERROR]:", error);
    }
};

document.addEventListener("DOMContentLoaded", fetchEquipamentos);

let currentPage = 1;
const itemsPerPage = 10;

const displayTable = (data) => {
    data.reverse();

    const tableBody = document.querySelector("#equipamento-table tbody");
    tableBody.innerHTML = "";

    if (data.length === 0) {
        const noEquipamentosMessage = document.createElement("tr");
        noEquipamentosMessage.id = "sem-equipamentos-message";
        noEquipamentosMessage.innerHTML = `<td colspan="5">Nenhum equipamento cadastrado.</td>`;
        tableBody.appendChild(noEquipamentosMessage);
        document.getElementById("page-info").textContent = "Página 0 de 0";
        return;
    }

    const existingMessage = document.getElementById("sem-equipamentos-message");
    if (existingMessage) {
        console.log(existingMessage);
        existingMessage.remove();
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedData = data.slice(start, end);

    paginatedData.forEach((equipamento) => {
        const row = `
                    <tr>
                        <td>${equipamento.id}</td>
                        <td>${equipamento.tipo}</td>
                        <td>${equipamento.fabricante}</td>
                        <td>${equipamento.modelo}</td>
                        <td>
                            <div class="d-flex justify-content-center align-items-center">
                                <a href="#detailModal" data-bs-toggle="modal" class="view" onclick="fillForm(${equipamento.id}, 'detailModal')"><i class="material-icons" data-bs-toggle="tooltip" title="Detalhes">&#xE8F4;</i></a>
                                <a href="#editModal" data-bs-toggle="modal" class="edit" onclick="fillForm(${equipamento.id}, 'editModal')"><i class="material-icons" data-bs-toggle="tooltip" title="Editar">&#xE254;</i></a>
                                <a href="#deleteModal" data-bs-toggle="modal" class="delete" onclick="setDeleteId(${equipamento.id})"><i class="material-icons" data-bs-toggle="tooltip" title="Excluir">&#xE872;</i></a>
                            </div>
                        </td>
                    </tr>
                `;
        tableBody.insertAdjacentHTML("beforeend", row);
    });

    updatePaginationControls(data.length);
};

const updatePaginationControls = (totalItems) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    document.getElementById("prev-page").disabled = currentPage === 1;
    document.getElementById("next-page").disabled = currentPage === totalPages;
    document.getElementById("page-info").textContent = `Página ${currentPage} de ${totalPages}`;
};

document.getElementById("prev-page").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchEquipamentos();
    }
});

document.getElementById("next-page").addEventListener("click", () => {
    currentPage++;
    fetchEquipamentos();
});
