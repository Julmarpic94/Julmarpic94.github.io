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

// ESTADO MENU RESPONSIVE
let menuVisible = false;

function mostrarOcultarMenu() {
    const nav = document.getElementById("nav");
    const menuButton = document.querySelector(".nav-responsive");

    nav.classList.toggle("responsive");
    menuVisible = !menuVisible;

    // Cambia de color al hacer clic
    if (menuVisible) {
        menuButton.classList.add("active");
    } else {
        menuButton.classList.remove("active");
    }
}

// Cierra el menú al hacer clic en una opción
function seleccionar() {
    const nav = document.getElementById("nav");
    const menuButton = document.querySelector(".nav-responsive");

    nav.classList.remove("responsive");
    menuVisible = false;
    
    // Restaurar color original
    menuButton.classList.remove("active");
}

// ENVÍO DE CORREOS DESDE EL FORMULARIO
document.addEventListener("DOMContentLoaded", function () {
    // Inicializar EmailJS
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

    // GESTIÓN DE LAS ESTRELLAS
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

    // 🔹 INICIALIZAR TYPED.JS
    const typedElement = document.querySelector(".typed");
    
    if (typedElement) {
        new Typed(".typed", {
            strings: [
                "Desarrollador Multiplataforma",
                "Android Developer",
                "Redactor SEO"
            ],
            typeSpeed: 50,  // Velocidad de escritura
            backSpeed: 30,  // Velocidad de borrado
            startDelay: 500, // Tiempo antes de empezar a escribir
            backDelay: 1500, // Tiempo antes de borrar la palabra
            loop: true, // Hace que se repita en bucle
            showCursor: true, // Muestra el cursor parpadeante
            cursorChar: "|", // Personaliza el cursor
        });
    } else {
        console.warn("Elemento .typed no encontrado en el DOM");
    }
});

// CAMBIO DE IDIOMA DEL TEXTO

document.addEventListener("DOMContentLoaded", function () {
    const texts = {
        es: {
            name: "JULIÁN MARTÍNEZ",
            role: ["Desarrollador Multiplataforma", "Android Developer", "Redactor SEO"],
            contactText: "Si crees que podemos colaborar no dudes en enviarme un mensaje. También puedes descargar mi CV en PDF para conocer más sobre mi perfil profesional.",
            projects: "Proyectos",
            curriculum: "Currículum",
            skills: "Tecnologías",
            contact: "Contacto"
        },
        en: {
            name: "JULIAN MARTINEZ",
            role: ["Multiplatform Developer", "Android Developer", "SEO Writer"],
            contactText: "If you think we can collaborate, don't hesitate to send me a message. You can also download my CV in PDF to learn more about my professional profile.",
            projects: "Projects",
            curriculum: "Curriculum",
            skills: "Technologies",
            contact: "Contact"
        }
    };

    const switchToggle = document.getElementById("language-switch");
    const leftFlag = document.querySelector(".flag-icon-left");
    const rightFlag = document.querySelector(".flag-icon-right");
    const nameElement = document.querySelector("h1");
    const typedElement = document.querySelector(".typed");
    const contactText = document.querySelector("#contacto p");
    const projectsTitle = document.querySelector("#portfolio h2");
    const curriculumTitle = document.querySelector("#curriculum h2");
    const skillsTitle = document.querySelector("#skills h2");
    const contactTitle = document.querySelector("#contacto h2");

    function changeLanguage(lang) {
        localStorage.setItem("language", lang);

        // Cambiar textos
        nameElement.textContent = texts[lang].name;
        contactText.textContent = texts[lang].contactText;
        projectsTitle.textContent = texts[lang].projects;
        curriculumTitle.textContent = texts[lang].curriculum;
        skillsTitle.textContent = texts[lang].skills;
        contactTitle.textContent = texts[lang].contact;

        // Reiniciar Typed.js con los nuevos textos
        typedElement.innerHTML = "";
        new Typed(".typed", {
            strings: texts[lang].role,
            typeSpeed: 50,
            backSpeed: 30,
            startDelay: 500,
            backDelay: 1500,
            loop: true,
            showCursor: true,
            cursorChar: "|"
        });

        // Actualizar los bordes de las banderas
        if (lang === "en") {
            rightFlag.style.borderColor = "var(--color-azulClaro)";
            leftFlag.style.borderColor = "white";
        } else {
            leftFlag.style.borderColor = "var(--color-azulClaro)";
            rightFlag.style.borderColor = "white";
        }
    }

    // Detectar el idioma guardado en localStorage o establecer español por defecto
    const savedLanguage = localStorage.getItem("language") || "es";
    switchToggle.checked = savedLanguage === "en"; // Activa el interruptor si el idioma es inglés
    changeLanguage(savedLanguage);

    // Evento para cambiar el idioma al activar el interruptor
    switchToggle.addEventListener("change", function () {
        if (switchToggle.checked) {
            changeLanguage("en");
        } else {
            changeLanguage("es");
        }
    });
});

