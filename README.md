# Gestión de usuarios

Este proyecto contiene el código del servidor de la plataforma de gestión de usuarios. Está desarrollado utilizando NestJS (versión 10) y MongoDb como base de datos.

El primer paso para ejecutar este proyecto es la instalación de las librería:
```bash
npm install
```

El fichero `.env.example` contiene todo el listado de variables de entorno que se deben configurar en el proyecto. Para esto hay dos opciones:
1. Copiar el fichero `.env.example` a `.env` y rellenar las variables.
2. Ejecutar exportaciones de las variables de entorno en la shell donde se va a ejecutar el servidor de la siguiente manera:
```bash
export MONGO_URL=valor
export MONGO_DB=valor
export LOG_LEVEL="log;error;warn;debug;verbose;fatal" # Niveles de log que mostrara la aplicación (separados por ;)
export JWT_SECRET=valor # Puede ser cualquier valor secreto
```

El valor de MONGO_URL y MONGO_DB deberá apuntar a una instancia de Mongo. En el caso de utilizar docker se pueden utilizar los siguientes valores:
```bash
export MONGO_URL=mongodb://root:password@localhost
export MONGO_DB=users
```

Para ejecutar este proyecto hay que utilizar el siguiente comando:
```bash
# Levantar la base de datos con docker
docker-compose up -d

# Ejecutar el servidor node
npm run start
```

---

#### Securización

Todas las credenciales del proyecto se encuentran ocultas bajo variables de entorno del sistema. El servidor las recupera para su correcto funcionamiento.

Las peticiones que implican modificación o consulta de información sensible se encuentran protegidas bajo el esquema de seguridad de los tokens bearer (JWT). Un usuario sin la sesión iniciada solamente puede hacer login (`/auth/login`).

Además, dentro de la operativa del servicio, las contraseñas de los usuarios se cifran utilizando la librería de `bcrypt`. Se aplica un hash con 10 rondas de salt para evitar que se realicen ataques de fuerza bruta sobre los logins de los usuarios.

---

#### Postman

Para poder realizar las pruebas sobre el backend se puede importar el fichero `Moontech Prueba.postman_collection.json` en la herramienta `Postman`.

---

#### Docker 

Como punto adicional, se ha generado un `Dockerfile` para el despligue independiente del servidor en cualquier servicio de ejecución de contenedores.