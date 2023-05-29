var chat_container = document.getElementById("chat-c");
var mensaje_input = document.getElementById("mensaje");

function enviarMensaje(){
    chat_container.innerHTML += chatItem(mensaje_input.value, "usuario");

    fetch("/soporte/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mensaje: mensaje_input.value
        })
    }).then(res => {
        res.json().then(data => {
            chat_container.innerHTML += chatItem(data.mensaje, "soporte");
        });
    });

    mensaje_input.focus();
    mensaje_input.value = "";
}

function chatItem(text, type){
    return `
    <div class="row ${type == "usuario" ? "justify-content-end": ""}">
        <div class="col-8">
            <div class="${type}">
                <p>${text}</p>
            </div>
        </div>
    </div>
    `;
}