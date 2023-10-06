const formulario = document.getElementById("formulario");
const listaPersonas = document.getElementById("lista-personas");
let personaEditando = null; 

formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    let edad = parseInt(document.getElementById("edad").value); 
    const correo = document.getElementById("correo").value;


    if (edad < 0) {
        alert("La edad debe ser un número positivo.");
        return; 
    }

    if (personaEditando) {
        personaEditando.querySelector(".nombre").textContent = `${nombre} ${apellido}`;
        personaEditando.querySelector(".edad").textContent = `Edad: ${edad}`;
        personaEditando.querySelector(".correo").textContent = `Correo: ${correo}`;
        personaEditando.style.display = "flex"; 
        personaEditando = null; 
        document.querySelector("button[type=submit]").textContent = "Agregar"; 
    } else {
        const persona = { nombre, apellido, edad, correo };
        agregarPersona(persona);
    }

    formulario.reset();
});

function agregarPersona(persona) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <span class="nombre">${persona.nombre} ${persona.apellido}</span>
        <span class="edad">Edad: ${persona.edad}</span>
        <span class="correo">Correo: ${persona.correo}</span>
        <button class="editar" onclick="editarPersona(this)">Editar</button>
        <button class="eliminar" onclick="eliminarPersona(this)">Eliminar</button>
    `;
    listaPersonas.appendChild(listItem);
}

function editarPersona(btn) {
    const listItem = btn.parentElement;
    const nombreElement = listItem.querySelector(".nombre");
    const apellidoElement = listItem.querySelector(".nombre");
    const edadElement = listItem.querySelector(".edad");
    const correoElement = listItem.querySelector(".correo");

    const nombre = nombreElement.textContent.split(" ")[0];
    const apellido = nombreElement.textContent.split(" ")[1];
    const edad = parseInt(edadElement.textContent.split(" ")[1]);
    const correo = correoElement.textContent.split(" ")[1];

    document.getElementById("nombre").value = nombre;
    document.getElementById("apellido").value = apellido;
    document.getElementById("edad").value = edad;
    document.getElementById("correo").value = correo;

    personaEditando = listItem;

    document.querySelector("button[type=submit]").textContent = "Editar";

    listItem.style.display = "none";
}

function eliminarPersona(btn) {
    btn.parentElement.remove();
    if (btn.parentElement === personaEditando) {
        personaEditando = null;
        document.querySelector("button[type=submit]").textContent = "Agregar";
    }
}
