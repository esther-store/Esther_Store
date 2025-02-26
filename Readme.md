# Esther Tienda Online de Ropa - Proyecto Full Stack

## Descripción

Este proyecto es una tienda online de ropa que utiliza Astro + React para el frontend y Django para el backend. Ofrece una experiencia de compra moderna y eficiente para los usuarios, con un rendimiento optimizado gracias a la combinación de tecnologías de vanguardia.

## Tecnologías Utilizadas

### Frontend
- [Astro](https://astro.build/): Framework web para crear sitios estáticos y de alto rendimiento.
- [React](https://reactjs.org/): Biblioteca de JavaScript para construir interfaces de usuario.

### Backend
- [Django](https://www.djangoproject.com/): Framework de alto nivel de Python para desarrollo web rápido y limpio.

## Características Principales

- Catálogo de productos con categorías, promociones, filtros, busqueda, etc. 
- Carrito de compras
- Panel de administración para gestión de productos e inventario
- Diseño responsive para una experiencia óptima en dispositivos móviles

## Requisitos Previos

- Node.js (versión 14 o superior)
- Python (versión 3.8 o superior)
- pip (gestor de paquetes de Python)
- npm (gestor de paquetes de Node.js)

## Instalación y Configuración

### Frontend (Astro + React)

1. Clonar el repositorio:
   ```
   git clone https://github.com/esther-store/Esther_Store.git
   ```

2. Navegar al directorio del frontend:
   ```
   cd frontend
   ```

3. Instalar dependencias:
   ```
   npm install
   ```

4. Convigurar el archivo .env
    ```
    PUBLIC_API_URL=http://127.0.0.1:8000
    ```

5. Iniciar el servidor de desarrollo:
   ```
   npm run dev
   ```

### Backend (Django)

1. Navegar al directorio del backend:
   ```
   cd backend
   ```

2. Crear y activar un entorno virtual:
   ```
   python -m venv env
   source venv/bin/activate  # En Windows: ./env\Scripts\activate
   ```

3. Instalar dependencias:
   ```
   pip install -r requirements.txt
   ```

4. Configurar .env file
    ```
    #Email backend configuration
    EMAIL_HOST_USERNAME = ''
    EMAIL_HOST_PASSWORD = ''

    #Chache configuration
    REDIS_HOST = ""
    REDIS_PORT = 
    REDIS_USERNAME = ''
    REDIS_PASSWORD = ''

    #Define wheter use Postgres Database (0) or sqlite3 database (1)
    USE_DEBUG_DATABASE = 0

    POSTGRES_DATABASE_NAME = ''
    POSTGRES_DATABASE_HOST = ''
    POSTGRES_DATABASE_PASS = ''
    POSTGRES_DATABASE_USER = ''
    POSTGRES_DATABASE_PORT = 
    ```
5. Configurar la base de datos y el cache
    - Crear una base de datos con Postgres y poner las credenciales en el .env como se explica en el paso anterior o si se desea usar la base de datos integrada en Django: USE_DEBUG_DATABASE = 1 en el .env file.
    - Crear un servidor de Redis para el cache y poner las credenciales en el .env como se explica en el paso anterior 
    Nota: Es recomendable usar Docker para facilitar este proceso

6. Realizar migraciones:
   ```
   python manage.py migrate
   ```

7. Cargar la data inicial:
```
python manage.py load_initial_data
```

8. Iniciar el servidor de Django:
   ```
   python manage.py runserver
   ```

## Uso

Visita `http://localhost:4321` en tu navegador para ver la aplicación frontend.
El backend estará disponible en `http://localhost:8000`.

