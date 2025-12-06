# Microservicio de Gestión Académica

Microservicio desarrollado para la gestión académica de universidades, facultades y especialidades. Implementado con TypeScript, Express, Prisma, PostgreSQL y Redis, y desplegado con Docker.

## 🎯 Descripción

Este microservicio proporciona una API REST para la gestión de información académica, permitiendo consultar y administrar universidades, facultades y especialidades. El servicio está diseñado para integrarse en una arquitectura de microservicios con Traefik como reverse proxy.

## 🛠 Tecnologías

- **Runtime:** Node.js 18
- **Lenguaje:** TypeScript
- **Framework:** Express 5
- **ORM:** Prisma 6
- **Base de Datos:** PostgreSQL
- **Cache:** Redis 5
- **Testing:** Jest, Supertest
- **Pruebas de Carga:** k6
- **Containerización:** Docker, Docker Compose
- **Reverse Proxy:** Traefik (configurado externamente)

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** (incluido con Node.js)
- **Docker** y **Docker Compose** (para producción)
- **PostgreSQL** (para desarrollo local)
- **Redis** (para desarrollo local)
- **k6** (para pruebas de carga) - opcional
- **Git**

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone "https://github.com/valentinoaraya/ms-gestion-dds"
cd ms-gestion-dds
```

2. Instala las dependencias:
```bash
npm install
```

3. Define las variables de entorno antes de generar el cliente de Prisma. Crea el archivo `.env` copiando el contenido de `.env.development` (ejemplo para desarrollo):

```bash
# En Windows (PowerShell)
Copy-Item .env.development .env

# En Linux/Mac
cp .env.development .env
```

El archivo `.env.development` debe contener las siguientes variables (ejemplo):
```bash
PORT=5003
NODE_ENV=development

DATABASE_URL=postgresql://anfatitofa:fatotifaan1504141503@localhost:3000/sysacad_db?schema=public
POSTGRES_USER=anfatitofa
POSTGRES_PASSWORD=fatotifaan1504141503
POSTGRES_DB=sysacad_db

REDIS_URL=redis://:antitofaredis@localhost:6380
```

**Nota:** Asegúrate de crear los archivos `.env.development` y `.env.production` con tus credenciales y de tener los contenedores correspondientes de Traefik, Redis y Postgres corriendo antes de continuar. Puedes ver los ejemplos completos en la sección [Configuración](#-configuración).

4. Genera el cliente de Prisma (requiere que las variables de entorno estén definidas):
```bash
npx prisma generate
```

## ⚙️ Configuración

El proyecto requiere tres archivos de variables de entorno. Crea los siguientes archivos en la raíz del proyecto:

### `.env.development`

Usado para desarrollo y testing local:

```bash
PORT=5003
NODE_ENV=development

DATABASE_URL=postgresql://anfatitofa:fatotifaan1504141503@localhost:3000/sysacad_db?schema=public
POSTGRES_USER=anfatitofa
POSTGRES_PASSWORD=fatotifaan1504141503
POSTGRES_DB=sysacad_db

REDIS_URL=redis://:antitofaredis@localhost:6380
```

### `.env.production`

Usado para producción con Docker:

```bash
PORT=5003
NODE_ENV=production

POSTGRES_USER=anfatitofa
POSTGRES_PASSWORD=fatotifaan1504141503
POSTGRES_DB=sysacad_db

DATABASE_URL=postgresql://anfatitofa:fatotifaan1504141503@postgresql:5432/sysacad_db?schema=public

REDIS_URL=redis://:antitofaredis@redis:6379
```

### `.env`

Este archivo debe ser creado copiando el contenido de:
- **`.env.development`** para desarrollo y testing
- **`.env.production`** para producción

**Importante:** El archivo `.env` no debe ser commitado al repositorio (ya está en `.gitignore`).

## 💻 Desarrollo

### Configuración Inicial

1. Copia el contenido de `.env.development` a `.env`:
```bash
# En Windows (PowerShell)
Copy-Item .env.development .env

# En Linux/Mac
cp .env.development .env
```

2. Asegúrate de tener PostgreSQL y Redis corriendo localmente en los puertos configurados en `.env.development`.

3. Ejecuta las migraciones de Prisma:
```bash
npx prisma migrate deploy
```

4. (Opcional) Pobla la base de datos con datos de prueba:
```bash
npm run seed-database
```

### Ejecutar en Modo Desarrollo

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5003`

### Limpiar Base de Datos

Para limpiar todos los datos de la base de datos:
```bash
npm run clear-database
```

### Poblar Base de Datos

Para poblar la base de datos con datos de ejemplo:
```bash
npm run seed-database
```

## 🚀 Producción

### Preparación

1. Copia el contenido de `.env.production` a `.env`:
```bash
# En Windows (PowerShell)
Copy-Item .env.production .env

# En Linux/Mac
cp .env.production .env
```

2. Asegúrate de tener la red de Docker `mired` creada:
```bash
docker network create mired
```

3. Asegúrate de que los servicios de PostgreSQL y Redis estén disponibles en la red `mired` con los nombres de host `postgresql` y `redis` respectivamente.

### Construir y Levantar con Docker Compose

```bash
docker-compose up -d --build
```

Esto construirá la imagen de Docker y levantará el servicio con 2 réplicas.

### Ver Logs

```bash
docker-compose logs -f
```

### Detener los Servicios

```bash
docker-compose down
```

### Notas sobre Producción

- El servicio está configurado para usar Traefik como reverse proxy
- El dominio configurado es: `academica.universidad.localhost`
- El servicio corre en el puerto interno 5003
- Se implementa un Circuit Breaker pattern mediante Traefik
- El servicio se despliega con 2 réplicas para alta disponibilidad

## 🧪 Testing

### Configuración para Testing

Antes de ejecutar los tests, asegúrate de tener `.env` configurado con el contenido de `.env.development`:

```bash
# Copiar contenido de .env.development a .env
```

### Ejecutar Todos los Tests

```bash
npm test
```

### Estructura de Tests

- **Tests Unitarios:** `tests/units/`
  - Tests de base de datos
  - Tests de Redis
  - Tests de modelos (Especialidad, Facultad, Universidad)
- **Tests de Integración:** `tests/integration/`

Los tests están configurados para ejecutarse en serie (`--runInBand`) para evitar conflictos con la base de datos.

## ⚡ Pruebas de Carga (k6)

### Requisitos

- k6 instalado (descarga desde https://k6.io/)
- O usar el ejecutable `k6.exe` incluido en el proyecto (Windows)

### Configuración Previa

Antes de ejecutar las pruebas de carga:

1. Asegúrate de tener `.env` configurado con el contenido de `.env.development`
2. El servicio debe estar corriendo (desarrollo o producción)

### Ejecutar Spike Test

El script automatizado realizará:
1. Limpieza de la base de datos
2. Poblado de datos de prueba (10 especialidades)
3. Ejecución del spike test
4. Limpieza final de la base de datos

**En Linux/Mac:**
```bash
chmod +x k6/run-spike-test.sh
./k6/run-spike-test.sh
```

**En Windows (PowerShell):**
```bash
bash k6/run-spike-test.sh
```

O ejecuta k6 directamente:
```bash
# Si tienes k6 instalado globalmente
k6 run k6/spike_test.js

# O usando el ejecutable incluido (Windows)
.\k6.exe run k6/spike_test.js
```

### Parámetros del Spike Test

El spike test está configurado con:
- **Ramp-up:** 10 segundos hasta 100 usuarios virtuales
- **Mantenimiento:** 20 segundos con 100 usuarios virtuales
- **Ramp-down:** 10 segundos hasta 0 usuarios
- **Umbrales:**
  - 95% de requests < 500ms
  - Menos del 10% de errores
  - Al menos 400 requests exitosos

## 📁 Estructura del Proyecto

```
ms-gestion-dds/
├── src/
│   ├── config/           # Configuración de la aplicación
│   ├── controllers/      # Controladores de las rutas
│   ├── lib/              # Bibliotecas (Prisma, Redis)
│   ├── models/           # Modelos de datos
│   ├── repositories/     # Repositorios para acceso a datos
│   ├── routes/           # Definición de rutas
│   ├── services/         # Lógica de negocio
│   ├── utils/            # Utilidades (seed, clear DB)
│   ├── validators/       # Validadores de datos
│   └── index.ts          # Punto de entrada
├── tests/                # Tests unitarios e integración
│   ├── integration/
│   ├── units/
│   └── setup.ts
├── prisma/               # Esquema y migraciones de Prisma
│   ├── migrations/
│   └── schema.prisma
├── k6/                   # Scripts de pruebas de carga
│   ├── spike_test.js
│   └── run-spike-test.sh
├── dist/                 # Código compilado (generado)
├── docker-compose.yml    # Configuración de Docker Compose
├── Dockerfile            # Imagen Docker
├── package.json
├── tsconfig.json
└── README.md
```

## 🌐 Endpoints

### Base URL
- **Desarrollo:** `http://localhost:5003`
- **Producción:** `https://academica.universidad.localhost` (vía Traefik)

### Endpoints Disponibles

#### GET `/`
Mensaje de bienvenida del microservicio.

**Respuesta:**
```
Hola! este es el microservicio de Gestión Académica
```

#### GET `/api/especialidad/:id`
Obtiene información de una especialidad por su ID.

**Parámetros:**
- `id` (path): ID de la especialidad

**Respuesta exitosa (200):**
```json
{
  "especialidad": "Ingeniería en Sistemas",
  "facultad": "Facultad Regional de San Rafael",
  "universidad": "Universidad Tecnológica Nacional"
}
```

**Respuesta cuando no existe (404):**
```json
{
  "error": "Especialidad no encontrada"
}
```

## 📜 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Ejecuta el servidor en modo desarrollo con hot-reload |
| `npm test` | Ejecuta todos los tests |
| `npm run build` | Compila TypeScript a JavaScript |
| `npm start` | Ejecuta la aplicación compilada (producción) |
| `npm run clear-database` | Limpia todos los datos de la base de datos |
| `npm run seed-database` | Pobla la base de datos con datos de ejemplo |

## 🗄️ Base de Datos

### Modelos

El proyecto utiliza Prisma como ORM. Los modelos principales son:

- **Universidades:** Información de universidades
- **Facultades:** Información de facultades (relacionadas con universidades)
- **Especialidades:** Información de especialidades (relacionadas con facultades)

### Migraciones

Las migraciones están en `prisma/migrations/`. Para crear una nueva migración:

```bash
npx prisma migrate dev --name nombre_de_la_migracion
```

Para aplicar migraciones en producción:

```bash
npx prisma migrate deploy
```

## 🔐 Seguridad

- Las credenciales de base de datos deben estar en archivos `.env` que no se commitean
- En producción, usa variables de entorno seguras
- El servicio está configurado para trabajar detrás de Traefik con TLS

## 🤝 Contribución

1. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
2. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
3. Push a la rama (`git push origin feature/nueva-funcionalidad`)
4. Abre un Pull Request

## 📝 Notas Importantes

- **Siempre copia el contenido correcto a `.env`** según el entorno antes de ejecutar la aplicación
- El servicio requiere que PostgreSQL y Redis estén disponibles
- En producción, asegúrate de tener la red Docker `mired` creada
- Las pruebas de carga modifican la base de datos (limpian y poblan datos)

## 🐛 Solución de Problemas

### Error de conexión a la base de datos
- Verifica que PostgreSQL esté corriendo
- Verifica la `DATABASE_URL` en tu archivo `.env`
- Verifica que la base de datos exista

### Error de conexión a Redis
- Verifica que Redis esté corriendo
- Verifica la `REDIS_URL` en tu archivo `.env`

### Error en Docker Compose
- Verifica que la red `mired` esté creada: `docker network create mired`
- Verifica que los servicios dependientes (PostgreSQL, Redis) estén disponibles en la red

### Tests fallando
- Asegúrate de tener `.env` configurado con `.env.development`
- Verifica que la base de datos esté accesible
- Ejecuta `npm run clear-database` antes de los tests si es necesario

## Integrantes

- Araya Valentino
- Conforti Angelo
- Contreras Facundo
- Durán Faustino
- Patiño Ignacio
- Romero Tomás

## 📄 Licencia

ISC

---

**Desarrollado para la materia Desarrollo de Software**
