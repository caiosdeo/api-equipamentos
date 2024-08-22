const fillForm = async (id, modalId) => {
    try {
        const response = await fetch(`/api/equipamentos/${id}/`);
        const data = await response.json();

        const form = document.getElementById(modalId);

        form.querySelector("#equipamento_id").value = data.id;
        form.querySelector("#tipo").value = data.tipo;
        form.querySelector("#fabricante").value = data.fabricante;
        form.querySelector("#modelo").value = data.modelo;
        form.querySelector("#numero_de_serie").value = data.numero_de_serie;
        form.querySelector("#data_de_compra").value = data.data_de_compra;
        form.querySelector("#valor_de_compra").value = data.valor_de_compra;

        formatBRL(form.querySelector("#valor_de_compra"));
    } catch (error) {
        console.error("[FILL_FORM_ERROR]:", error);
    }
};
