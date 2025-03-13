🌐 Aplicación JHipster con Base de Datos Definida en JDL
🚀 Aplicación web generada con JHipster, utilizando una base de datos definida con JHipster Domain Language (JDL). Este proyecto sigue una arquitectura Spring Boot + Angular/React/Vue + SQL/NoSQL, facilitando la creación de aplicaciones robustas y escalables.

🚀 Características Principales
✅ Generación automática del backend con Spring Boot
✅ Generación del frontend con Angular / React / Vue
✅ Configuración de seguridad con Spring Security y JWT
✅ Conexión a bases de datos SQL/NoSQL con JPA / Hibernate
✅ Definición del modelo de datos mediante JDL
✅ API RESTful autogenerada con Swagger
✅ Gestión de usuarios y autenticación integrada

🛠 Tecnologías Utilizadas
Backend: Java + Spring Boot
Frontend: Angular / React / Vue (según configuración)
Base de datos: PostgreSQL / MySQL / MongoDB / H2
ORM: JPA / Hibernate
Seguridad: Spring Security + JWT
Herramientas: JHipster CLI + JDL Studio
📦 Instalación y Configuración
1️⃣ Instalar dependencias
Asegúrate de tener instaladas las siguientes herramientas:

Node.js y npm: https://nodejs.org/
JHipster CLI:
bash
Copy
Edit
npm install -g generator-jhipster
Base de datos (según configuración del proyecto).
2️⃣ Clonar el repositorio
bash
Copy
Edit
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
3️⃣ Generar la Aplicación con JHipster
Si necesitas regenerar el proyecto:

bash
Copy
Edit
jhipster
Sigue las opciones del asistente interactivo para configurar el stack de tecnologías.

📂 Generación y Configuración de la Base de Datos con JDL
1. Definir el modelo de datos en JDL
Ejemplo de archivo modelo.jdl:

jdl
Copy
Edit
entity Coche {
  marca String required,
  modelo String required,
  precio BigDecimal required
}

entity Cliente {
  nombre String required,
  email String required
}

relationship OneToMany {
  Cliente{coches} to Coche{cliente}
}

paginate Coche, Cliente with pagination
2. Importar el JDL y generar entidades
Ejecuta el siguiente comando en la raíz del proyecto:

bash
Copy
Edit
jhipster import-jdl modelo.jdl
Esto generará automáticamente: ✅ Las entidades y sus relaciones en Java (JPA/Hibernate)
✅ Los archivos de migración para la base de datos (Liquibase/Flyway)
✅ Las API REST en Spring Boot
✅ La interfaz en Angular/React/Vue

3. Configurar la conexión a la base de datos
Abre el archivo src/main/resources/config/application-dev.yml y verifica la configuración de conexión:

yaml
Copy
Edit
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/concesionario
    username: tu_usuario
    password: tu_contraseña
4. Ejecutar la aplicación
Levantar la base de datos (si usas Docker):
bash
Copy
Edit
docker-compose up -d
Ejecutar el backend (Spring Boot):
bash
Copy
Edit
./mvnw
Ejecutar el frontend (Angular/React/Vue):
bash
Copy
Edit
npm start
📂 Estructura del Proyecto JHipster
bash
Copy
Edit
📂 mi-aplicacion-jhipster
│── 📂 src
│   ├── 📂 main
│   │   ├── 📂 java/com/tuapp        # Código backend (Spring Boot)
│   │   ├── 📂 resources             # Configuración y archivos SQL
│   ├── 📂 webapp                    # Código frontend (Angular/React/Vue)
│── 📂 jdl                            # Archivos JDL
│── 📂 docker                         # Configuración Docker
│── README.md                         # Documentación del proyecto
🔄 Contribuciones
¡Las contribuciones son bienvenidas! 🚀

Haz un fork del repositorio
Crea una nueva rama (git checkout -b feature-nueva-funcionalidad)
Realiza tus cambios y haz un commit (git commit -m "Añadida nueva funcionalidad")
Sube los cambios (git push origin feature-nueva-funcionalidad)
Abre un Pull Request
📝 Licencia
Este proyecto está bajo la Creative Commons (CC BY-NC 4.0), lo que significa que puedes compartir y modificar el código, pero no utilizarlo para fines comerciales sin el permiso del autor.

👨‍💻 Autor
✍️ Julián Martínez
📩 Contacto: julmarpic94.github.io