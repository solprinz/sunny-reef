# Sunny Reef Store – API REST

API REST para administrar el catálogo de productos de una tienda de equipamiento de buceo. Permite leer, crear, actualizar y eliminar productos, con autenticación mediante JWT y datos alojados en la nube con Firestore (Firebase). Incluye además un pequeño panel web con plantillas Pug para iniciar sesión, ver los productos y agregar nuevos.

**Demo desplegada:** [https://sunny-reef.vercel.app/login](https://sunny-reef.vercel.app/login)

## Tecnologías

- Node.js con ES Modules
- Express 5
- Firebase / Firestore (base de datos en la nube)
- JSON Web Tokens (`jsonwebtoken`)
- Pug (vistas)
- `cors`, `body-parser` y `dotenv`

## Estructura del proyecto


```
index.js           Configuración del servidor, vistas y manejo de errores
src/
├── data/          Conexión a Firebase (data.js) y categorías (categories.json)
├── models/        Acceso a los datos (Firestore)
├── services/      Lógica que conecta controllers y modelos
├── controllers/   Manejo de peticiones y respuestas HTTP
├── routes/        Definición de las rutas
├── views/         Plantillas Pug (login y productos)
└── middlewares/   Verificación del token JWT
```

## Instalación

1. Clonar el repositorio e instalar las dependencias:

```bash
git clone https://github.com/solprinz/sunny-reef.git
cd sunny-reef
npm install
```

2. Crear un archivo `.env` en la raíz del proyecto, tomando como modelo:

```
PORT=3000

JWT_SECRET=una_clave_larga_y_secreta

ADMIN_EMAIL=sol@admin.com
ADMIN_PASSWORD=123456

FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
```

3. Iniciar el servidor:

```bash
npm run start
```

El servidor queda disponible en `http://localhost:3000`.

## Autenticación

Las rutas que modifican productos están protegidas. Primero hay que iniciar sesión:

```
POST /auth/login

{ "email": "sol@admin.com", "password": "123456" }
```

La respuesta incluye un `token`, que se envía en las peticiones protegidas con el encabezado:

```
Authorization: Bearer <token>
```

El token vence a la hora de generarse.

## Endpoints

### Productos

| Método | Ruta | Descripción | Requiere token |
|--------|------|-------------|:--------------:|
| GET | `/api/products` | Lista todos los productos (admite `?categoryId=1`) | No |
| GET | `/api/products/:id` | Devuelve un producto por ID | No |
| POST | `/api/products/create` | Crea un producto | Sí |
| PUT | `/api/products/:id` | Actualiza uno o más campos de un producto | Sí |
| DELETE | `/api/products/:id` | Elimina un producto | Sí |

Ejemplo de cuerpo para crear un producto:

```json
{
  "name": "Máscara de buceo",
  "price": 45000,
  "categoryId": 2,
  "stock": 10,
  "image": "https://ejemplo.com/imagen.jpg"
}
```

`name`, `price`, `categoryId` y `stock` son obligatorios. `image` es opcional y, si no se envía, se usa una imagen por defecto.

### Categorías

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/categories` | Lista las categorías |
| GET | `/api/categories/:id` | Devuelve una categoría por ID |

Categorías disponibles: 1 – Equipamiento Técnico, 2 – Máscaras y Tubos, 3 – Indumentaria, 4 – Accesorios.

### Autenticación

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/auth/login` | Valida las credenciales y devuelve el token |

### Vistas web

| Ruta | Descripción |
|------|-------------|
| `/login` | Pantalla de inicio de sesión |
| `/products` | Listado de productos; con sesión iniciada también muestra el formulario para agregar |

## Manejo de errores

Todas las respuestas de error tienen el formato `{ "status": "error", "message": "..." }`.

- 400 Bad Request: Datos faltantes o formato inválido en el cuerpo de la petición.
- 401 Unauthorized: Credenciales inválidas o token JWT ausente.
- 403 Forbidden: Token JWT inválido o expirado.
- 404 Not Found: Recurso o ruta no encontrada.
- 500 Internal Server Error: Error interno del servidor o de conexión con Firestore.

## Autora

Desarrollado por Sol Prinzen — Proyecto Final de Node.js (Talento Tech 2026)
