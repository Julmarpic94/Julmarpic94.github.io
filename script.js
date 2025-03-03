let indice = 0;
const proyectos = document.querySelectorAll(".proyecto");
const totalProyectos = proyectos.length;
const puntos = document.querySelectorAll(".punto");

// CARRUSEL Y PUNTOS DE PAGINACION
function moverCarrusel(direccion = 1) {
    const carrusel = document.querySelector(".carrusel");
    let anchoProyecto = proyectos[0].offsetWidth + 20;
    indice += direccion;

    if (indice < 0) {
        indice = totalProyectos - 1;
    } else if (indice >= totalProyectos) {
        indice = 0;
    }

    let desplazamiento = -(indice * anchoProyecto);
    carrusel.style.transform = `translateX(${desplazamiento}px)`;
    actualizarPaginacion();
}

function actualizarPaginacion() {
    puntos.forEach((punto, i) => {
        punto.classList.toggle("activo", i === indice);
    });
}

function irAProyecto(nuevoIndice) {
    indice = nuevoIndice;
    moverCarrusel();
}

setInterval(() => {
    moverCarrusel(1);
}, 8000);

// Estado del menú
let menuVisible = false;

function mostrarOcultarMenu() {
    const nav = document.getElementById("nav");
    const menuIcon = document.querySelector(".nav-responsive i");

    nav.classList.toggle("responsive");
    menuVisible = !menuVisible;

    // Cambia el icono de hamburguesa a "X"
    if (menuVisible) {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-times"); // Ícono de "cerrar" (X)
    } else {
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars"); // Ícono de hamburguesa (☰)
    }
}

// Cierra el menú al hacer clic en una opción
function seleccionar() {
    const nav = document.getElementById("nav");
    const menuIcon = document.querySelector(".nav-responsive i");

    nav.classList.remove("responsive");
    menuVisible = false;

    // Restaurar el icono de hamburguesa
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
}



// ENVIO DE CORREOS DESDE EL FORMULARIO
document.addEventListener("DOMContentLoaded", function () {
    // Key para usar el servidor de correos
    emailjs.init("TDHJGGfmCUfelwPIs"); // Reemplaza con tu Public Key

    document.getElementById("enviarMensaje").addEventListener("click", function (event) {
        event.preventDefault();

        let nombre = document.getElementById("nombre").value.trim();
        let email = document.getElementById("email").value.trim();
        let telefono = document.getElementById("telefono").value.trim();
        let asunto = document.getElementById("asunto").value.trim();
        let mensaje = document.getElementById("mensaje").value.trim();

        if (!nombre || !email || !mensaje) {
            alert("Por favor, completa los campos obligatorios.");
            return;
        }

        let templateParams = {
            nombre: nombre,
            email: email,
            telefono: telefono,
            asunto: asunto,
            mensaje: mensaje
        };

        // Enviar mensaje de contacto
        emailjs.send("servicio_outlook", "plantilla_contacto", templateParams)
            .then(function (response) {
                console.log("Mensaje enviado con éxito ✅", response.status, response.text);
                
                // Limpiar los campos después del envío
                document.getElementById("nombre").value = "";
                document.getElementById("email").value = "";
                document.getElementById("telefono").value = "";
                document.getElementById("asunto").value = "";
                document.getElementById("mensaje").value = "";
            })
            .catch(function (error) {
                alert("Error al enviar el mensaje ❌");
                console.error("FAILED...", error);
            });
    });

    // Descargar CV
    document.getElementById("downloadBtn").addEventListener("click", function () {
        const pdfUrl = "pdf/CV.pdf"; // Asegúrate de que la ruta del archivo es correcta

        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "Julian_Martinez_CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // GESTION DE LAS ESTRELLAS
    const skills = document.querySelectorAll(".stars");

    skills.forEach(skill => {
        let level = skill.getAttribute("data-level");
        let starsHTML = "";

        for (let i = 1; i <= 5; i++) {
            if (i <= level) {
                starsHTML += '<i class="fas fa-star"></i>'; // Estrella llena
            } else {
                starsHTML += '<i class="far fa-star"></i>'; // Estrella vacía
            }
        }

        skill.innerHTML = starsHTML;
    });
});
