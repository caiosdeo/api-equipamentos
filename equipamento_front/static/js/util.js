const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$(document).ready(function(){
    $('[data-bs-toggle="tooltip"]').tooltip();
});

const formatBRL = (input) => {
    let value = input.value.replace(/\D/g, '');

    if (!value) {
        input.value = '';
        return;
    }

    if (value.length > 12) {
        value = value.slice(0, 12);
    }

    value = (parseInt(value) / 100).toFixed(2);
    value = value.replace(".", ",");
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    input.value = 'R$ ' + value;
}

const numberFromBRL = (value) => {
    let numericValue = value.replace(/[^\d,]/g, '').replace(',', '.');
    return parseFloat(numericValue);
}