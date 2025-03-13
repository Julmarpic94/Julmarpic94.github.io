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
                "Multiplatform Developer", "Android Developer", "SEO Writer"
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
            contactText: "Si crees que podemos colaborar no dudes en enviarme un mensaje. También puedes descargar mi CV en PDF para conocer más sobre mi perfil profesional.",
            projects: "Proyectos",
            curriculum: "Currículum",
            skills: "Tecnologías",
            contact: "Contacto",

            // Formulario de contacto
            namePlaceholder: "Nombre",
            phonePlaceholder: "Teléfono",
            emailPlaceholder: "Email",
            subjectPlaceholder: "Asunto",
            messagePlaceholder: "Mensaje",
            sendMessage: "Enviar Mensaje",
            downloadCV: "Descargar CV",

            // Proyectos
            projectsList: [
                { title: "Videojuego Gash & Cash", desc: "Videojuego 2D multiplataforma (Windows y Android). Creado con Godot engine." },
                { title: "App Hourly", desc: "Aplicación Móvil para gestión del tiempo de trabajo. Soportada en Android. Desarrollada con Kotlin y Android Studio." },
                { title: "Gestor de Reservas", desc: "Aplicación de escritorio destinada a la gestión de reservas, clientes y trabajadores para un restaurante. Creado con Java y bases de datos SQLite." },
                { title: "Gestor de Vehículos", desc: "Aplicación de escritorio destinada a la gestión de vehículos para un concesionario. Creado con Java y bases de datos SQL." },
                { title: "Implantación de JHipster", desc: "Plataforma full-stack desarrollada con SpringBoot (Java y Kotlin) y apoyada en Angular, React y Vue para garantizar la gestión de una app web." },
                { title: "Gestor Base de datos Oracle", desc: "Controlador de base de datos Oracle para Java." },
                { title: "Adivina la provincia", desc: "Juego creado en Python con turtle donde el usuario debe adivinar las provincias de España en un mapa interactivo." }
            ]
        },
        en: {
            contactText: "If you think we can collaborate, don't hesitate to send me a message. You can also download my CV in PDF to learn more about my professional profile.",
            projects: "Projects",
            curriculum: "Curriculum",
            skills: "Technologies",
            contact: "Contact",

            // Contact form
            namePlaceholder: "Name",
            phonePlaceholder: "Phone",
            emailPlaceholder: "Email",
            subjectPlaceholder: "Subject",
            messagePlaceholder: "Message",
            sendMessage: "Send Message",
            downloadCV: "Download CV",

            // Projects
            projectsList: [
                { title: "Gash & Cash Videogame", desc: "2D cross-platform video game (Windows and Android). Created with Godot engine." },
                { title: "Hourly App", desc: "Mobile application for work time management. Supported on Android. Developed with Kotlin and Android Studio." },
                { title: "Reservation Manager", desc: "Desktop application for managing reservations, customers, and employees in a restaurant. Created with Java and SQLite databases." },
                { title: "Vehicle Manager", desc: "Desktop application for vehicle management in a dealership. Created with Java and SQL databases." },
                { title: "JHipster Implementation", desc: "Full-stack platform developed with SpringBoot (Java and Kotlin) and supported in Angular, React, and Vue to ensure web app management." },
                { title: "Oracle Database Manager", desc: "Oracle database controller for Java." },
                { title: "Guess the Province", desc: "Game created in Python with turtle where the user must guess the provinces of Spain on an interactive map." }
            ]
        }
    };

    const switchToggle = document.getElementById("language-switch");
    const leftFlag = document.querySelector(".flag-icon-left");
    const rightFlag = document.querySelector(".flag-icon-right");

    function changeLanguage(lang) {
        localStorage.setItem("language", lang);

        // Traduce los textos generales
        document.querySelector("#contacto p").textContent = texts[lang].contactText;
        document.querySelector("#portfolio h2").textContent = texts[lang].projects;
        document.querySelector("#curriculum h2").textContent = texts[lang].curriculum;
        document.querySelector("#skills h2").textContent = texts[lang].skills;
        document.querySelector("#contacto h2").textContent = texts[lang].contact;

        // Traduce los placeholders de los inputs
        document.getElementById("nombre").setAttribute("placeholder", texts[lang].namePlaceholder);
        document.getElementById("telefono").setAttribute("placeholder", texts[lang].phonePlaceholder);
        document.getElementById("email").setAttribute("placeholder", texts[lang].emailPlaceholder);
        document.getElementById("asunto").setAttribute("placeholder", texts[lang].subjectPlaceholder);
        document.getElementById("mensaje").setAttribute("placeholder", texts[lang].messagePlaceholder);

        // Traduce los botones
        document.getElementById("enviarMensaje").textContent = texts[lang].sendMessage;
        document.getElementById("downloadBtn").textContent = texts[lang].downloadCV;

        // Traduce los proyectos
        document.querySelectorAll(".proyecto").forEach((proyecto, index) => {
            if (texts[lang].projectsList[index]) {
                proyecto.querySelector("h3").textContent = texts[lang].projectsList[index].title;
                proyecto.querySelector("p").textContent = texts[lang].projectsList[index].desc;
            }
        });

        // Actualizar bordes de banderas
        leftFlag.style.borderColor = lang === "es" ? "var(--color-azulClaro)" : "white";
        rightFlag.style.borderColor = lang === "en" ? "var(--color-azulClaro)" : "white";
    }

    const savedLanguage = localStorage.getItem("language") || "es";
    switchToggle.checked = savedLanguage === "en";
    changeLanguage(savedLanguage);

    switchToggle.addEventListener("change", () => changeLanguage(switchToggle.checked ? "en" : "es"));
});
