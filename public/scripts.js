document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que o formulário seja submetido automaticamente

        // Limpa mensagens de erro anteriores
        clearErrorMessages();

        // Verificações de validação
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");

        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const messageValue = messageInput.value.trim();

        // Verificação do nome
        if (nameValue === "" || nameValue.length < 3) {
            displayErrorMessage("name-error", "Por favor, digite um nome válido (mínimo 3 caracteres).");
            nameInput.focus();
            return false;
        }

        // Verificação do email utilizando uma expressão regular simples
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            displayErrorMessage("email-error", "Por favor, digite um e-mail válido.");
            emailInput.focus();
            return false;
        }

        // Verificação da mensagem
        if (messageValue === "" || messageValue.length < 10) {
            displayErrorMessage("message-error", "Por favor, digite uma mensagem válida (mínimo 10 caracteres).");
            messageInput.focus();
            return false;
        }

        alert("Formulário enviado com sucesso!");
    });

    function displayErrorMessage(id, message) {
        const errorElement = document.getElementById(id);
        errorElement.textContent = message;
    }

    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(function (element) {
            element.textContent = "";
        });
    }
});