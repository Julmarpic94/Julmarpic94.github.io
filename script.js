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

            //HEADER
            headerNav: {
                home: "INICIO",
                projects: "PROYECTOS",
                curriculum: "CURRICULUM",
                skills: "TECNOLOGÍAS",
                contact: "CONTACTO"
            },
            curriculumSection: {
                education: "Educación",
                experience: "Experiencia",
                educationList: [
                    { title: "Desarrollo de Aplicaciones Multiplataforma", school: "IES Cañada de la Encina", date: "2023-2025", desc: "Desarrollador de software con experiencia en Java, Kotlin, Python y frameworks como Spring Boot y Hibernate. También manejo bases de datos relacionales y NoSQL (Oracle, MongoDB)." },
                    { title: "Grado en Periodismo", school: "Universidad de Castilla La-Mancha", date: "2014-2018", desc: "Periodista graduado por la UCLM con mención en periodismo multimedia, especializado en creación de contenido, SEO, storytelling y producción audiovisual." },
                    { title: "Máster en Marketing y Comunicación Digital", school: "IMF Business School", date: "2019-2020", desc: "Especialista en marketing digital, branding y comunicación corporativa. Experiencia en SEO, SEM, email marketing y redes sociales." }
                ],
                experienceList: [
                    { title: "Experiencia internacional", company: "Trabajos en Irlanda", date: "2021-2023", desc: "Experiencia viviendo y trabajando en el extranjero, esta etapa me permitió mejorar mi inglés y fortalecer mi capacidad para enfrentar nuevos desafíos en entornos dinámicos y multiculturales." },
                    { title: "Redactor Especializado Motor", company: "SoyMotero.es", date: "2020-2022", desc: "Creación de contenido especializado en el sector del motor, combinando redacción, análisis y storytelling. Enfoque en SEO y optimización digital para mejorar la visibilidad y alcance de publicaciones." },
                    { title: "Community Manager", company: "ADECA & CUSFIT", date: "2018-2020", desc: "Gestión de redes sociales, creación de contenido y estrategias de branding digital para aumentar la visibilidad y engagement. Implementación de campañas de marketing, análisis de métricas y optimización de la presencia online." }
                ]
            },
        

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

            //HEADER
            headerNav: {
                home: "HOME",
                projects: "PROJECTS",
                curriculum: "CURRICULUM",
                skills: "TECHNOLOGIES",
                contact: "CONTACT"
            },
            curriculumSection: {
                education: "Education",
                experience: "Experience",
                educationList: [
                    { title: "Multiplatform Application Development", school: "IES Cañada de la Encina", date: "2023-2025", desc: "Software developer experienced in Java, Kotlin, Python, and frameworks like Spring Boot and Hibernate. Also skilled in relational and NoSQL databases (Oracle, MongoDB)." },
                    { title: "Degree in Journalism", school: "University of Castilla-La Mancha", date: "2014-2018", desc: "Journalist with a multimedia journalism specialization, expertise in content creation, SEO, storytelling, and audiovisual production." },
                    { title: "Master in Marketing and Digital Communication", school: "IMF Business School", date: "2019-2020", desc: "Specialist in digital marketing, branding, and corporate communication. Experience in SEO, SEM, email marketing, and social media." }
                ],
                experienceList: [
                    { title: "International Experience", company: "Jobs in Ireland", date: "2021-2023", desc: "Lived and worked abroad, improving English skills and strengthening my ability to face new challenges in dynamic and multicultural environments." },
                    { title: "Specialized Automotive Writer", company: "SoyMotero.es", date: "2020-2022", desc: "Creation of specialized content in the motor sector, combining writing, analysis, and storytelling. Focus on SEO and digital optimization to improve the visibility and reach of publications." },
                    { title: "Community Manager", company: "ADECA & CUSFIT", date: "2018-2020", desc: "Management of social networks, content creation, and digital branding strategies to increase visibility and engagement. Implementation of marketing campaigns, metric analysis, and online presence optimization." }
                ]
            },


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

        //Traduce el menu de navegacion
                // Traduce el menú de navegación
                const navItems = document.querySelectorAll("#nav ul li a");
                if (navItems.length >= 5) {
                    navItems[0].textContent = texts[lang].headerNav.home;
                    navItems[1].textContent = texts[lang].headerNav.projects;
                    navItems[2].textContent = texts[lang].headerNav.curriculum;
                    navItems[3].textContent = texts[lang].headerNav.skills;
                    navItems[4].textContent = texts[lang].headerNav.contact;
                }

        // Traduce el curriculum
        document.querySelector("#curriculum .izquierda h3").textContent = texts[lang].curriculumSection.education;
        document.querySelector("#curriculum .derecha h3").textContent = texts[lang].curriculumSection.experience;

        document.querySelectorAll("#curriculum .izquierda .item").forEach((item, index) => {
            if (texts[lang].curriculumSection.experienceList[index]) {
                item.querySelector("h4").textContent = texts[lang].curriculumSection.educationList[index].title;
                item.querySelector(".escuela").textContent = texts[lang].curriculumSection.educationList[index].school;
                item.querySelector(".fecha").textContent = texts[lang].curriculumSection.educationList[index].date;
                item.querySelector("p").textContent = texts[lang].curriculumSection.educationList[index].desc;
            }
        });
        document.querySelectorAll("#curriculum .derecha .item").forEach((item, index) => {
            if (texts[lang].curriculumSection.experienceList[index]) {
                item.querySelector("h4").textContent = texts[lang].curriculumSection.experienceList[index].title;
                item.querySelector(".escuela").textContent = texts[lang].curriculumSection.experienceList[index].company;
                item.querySelector(".fecha").textContent = texts[lang].curriculumSection.experienceList[index].date;
                item.querySelector("p").textContent = texts[lang].curriculumSection.experienceList[index].desc;
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
