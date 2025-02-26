let indice = 0;
const proyectos = document.querySelectorAll(".proyecto");
const totalProyectos = proyectos.length;
const puntos = document.querySelectorAll(".punto");

// Función para mover el carrusel y actualizar los puntos de paginación
function moverCarrusel(direccion = 1) {
    const carrusel = document.querySelector(".carrusel");

    // Obtener el ancho de un solo proyecto
    let anchoProyecto = proyectos[0].offsetWidth + 20; // Incluye el gap entre elementos

    // Calcular el nuevo índice
    indice += direccion;

    if (indice < 0) {
        indice = totalProyectos - 1; // Volver al último si se va a la izquierda
    } else if (indice >= totalProyectos) {
        indice = 0; // Volver al inicio si se va a la derecha
    }

    // Desplazamiento centrado
    let desplazamiento = -(indice * anchoProyecto);
    carrusel.style.transform = `translateX(${desplazamiento}px)`;

    // Actualizar los puntos de paginación
    actualizarPaginacion();
}

// Función para actualizar los puntos de paginación
function actualizarPaginacion() {
    puntos.forEach((punto, i) => {
        punto.classList.toggle("activo", i === indice);
    });
}

// Función para ir directamente a un proyecto al hacer clic en un punto
function irAProyecto(nuevoIndice) {
    indice = nuevoIndice;
    moverCarrusel(0); // Llamar a la función sin cambiar la dirección
}

// Iniciar el cambio automático cada 1 segundo
setInterval(() => {
    moverCarrusel(1); // Avanzar automáticamente al siguiente proyecto
}, 8000);




// Estado del menú
let menuVisible = false;

/* FUNCIONES DEL MENÚ */

// Función para mostrar u ocultar el menú
function mostrarOcultarMenu() {
    const nav = document.getElementById("nav");
    if (menuVisible) {
        nav.classList = "";
    } else {
        nav.classList = "responsive";
    }
    menuVisible = !menuVisible;
}

// Función para ocultar el menú al seleccionar una opción
function seleccionar() {
    document.getElementById("nav").classList = "";
    menuVisible = false;
}

/* FUNCIONES DE ANIMACIÓN */

// Función para aplicar animaciones de las barras de habilidades
function efectoHabilidades() {
    const skills = document.getElementById("skills");
    const distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;

    if (distancia_skills >= 300) {
        const habilidades = document.getElementsByClassName("progreso");
        const clasesHabilidades = [
            "java", "html", "python", "datos", "kotlin", "godot",
            "comunicacion", "problemas", "creatividad", "dedicacion",
            "autonomia", "responsable"
        ];

        // Aplicar clases a las barras de progreso
        for (let i = 0; i < habilidades.length; i++) {
            habilidades[i].classList.add(clasesHabilidades[i]);
        }
    }
}

// Detección del scroll para aplicar animación en habilidades
window.onscroll = efectoHabilidades;

/* EVENTOS AL CARGAR LA PÁGINA */
document.addEventListener("DOMContentLoaded", function () {

    /* ANIMACIÓN Typed.js */
    const selectTyped = document.querySelector('.typed');
    if (selectTyped) {
        let typed_strings = selectTyped.getAttribute('data-typed-items').split(',');
        new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
        });
    }

    /* DESCARGA AUTOMÁTICA DEL CV */
    const downloadBtn = document.getElementById("downloadBtn");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", function () {
            const pdfUrl = "pdf/CV.pdf"; // Verifica la ruta correcta

            const link = document.createElement("a");
            link.href = pdfUrl;
            link.download = "Julian_Martinez_CV.pdf";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});


