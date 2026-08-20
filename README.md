Proyecto CineClub
Aplicación web para buscar películas, ver sus detalles y gestionar reseñas locales. Este proyecto consta de una API propia (Backend) y una interfaz de usuario (Frontend).


Requisitos Previos
tener instalado en el sistema:
. Node.js
. NPM (Node Package Manager)


Configuración inicial: TMDB
Para acceder a la API de películas es necesario obtener una API key gratuita. Sigue estos pasos:
1. Crear una cuenta en https://www.themoviedb.org
2. Ir a Configuración > API y solicitar una clave de tipo Developer
3. Guardar la clave en un archivo '.env' en la raíz de la carpeta del backend
4. Agregar el archivo '.env' al '.gitignore' antes del primer commit
Nota importante: Nunca subir archivos '.env' con las claves reales a GitHub por cuestiones de seguridad.


Instrucciones de Instalación y Ejecución:
El proyecto está dividido en dos partes que deben ejecutarse por separado simultáneamente.

Configurar y levantar el Backend
Abri una terminal, navega a la carpeta del backend y ejecuta los siguientes comandos:
1. Ingresa a la carpeta: 'cd backend'.
2. Instala las dependencias: 'npm install'.
3. Crea el archivo '.env' y coloca tu API Key de TMDB como se explicó en la sección anterior.
4. Inicia el servidor: 'npm run dev'.

Configurar y levantar el Frontend
Abri una nueva terminal, navega a la carpeta del frontend y ejecuta:
1. Ingresa a la carpeta: 'cd front'
2. Instala las dependencias: 'npm install'
3. Crea un archivo '.env' en la raíz de esta carpeta y agrega la siguiente variable de entorno para conectar con tu API local:
   'VITE_API_URL=http://localhost:3001/api'
4. Inicia la aplicación: 'npm run dev'

La terminal te va a devolver una URL local, tenes que abrir ese enlace en un navegador para usar la aplicación.
