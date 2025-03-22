# Contact Manager

Esta es una aplicación simple de gestión de contactos construida con React.

## Estructura del Proyecto

```
contact-manager/
├── src/
│   ├── api/
│   │   ├── ContactService.js
│   │   ├── contacts.js
│   ├── auth/
│   │   ├── auth0-config.js
│   ├── components/
│   │   ├── AlertDialog.jsx
│   │   ├── ContactDetail.jsx
│   │   ├── ContactForm.jsx
│   │   ├── ContactItem.jsx
│   │   ├── ContactList.jsx
│   │   ├── Dashboard.jsx
│   │   ├── DeleteContactAlert.jsx
│   │   ├── Header.jsx
│   │   ├── LoginPage.jsx
│   │   ├── LogoutPage.jsx
│   │   ├── PinnedContacts.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── RightModal.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SuccessAlert.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── public/
│   ├── _redirects
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── vite.config.js
```

## Componentes

### `ContactList.jsx`
Este componente es responsable de mostrar una lista de contactos. Permite filtrar, agregar, eliminar y sincronizar contactos. También maneja la visualización de contactos fijados.

### `ContactDetail.jsx`
Este componente muestra los detalles de un contacto seleccionado, incluyendo nombre, número de teléfono, correo electrónico, dirección, cumpleaños y notas.

### `ContactForm.jsx`
Este componente proporciona un formulario para agregar nuevos contactos. Incluye validación de campos y manejo de errores.

### `Dashboard.jsx`
Este componente muestra métricas sobre los contactos, como el total de contactos, contactos fijados y contactos por tipo.

### `Sidebar.jsx`
Este componente renderiza la barra lateral de navegación, que incluye enlaces a diferentes secciones de la aplicación.

### `LoginPage.jsx`
Este componente maneja la autenticación de usuarios utilizando Auth0.

### `LogoutPage.jsx`
Este componente maneja el cierre de sesión de los usuarios.

### `ProtectedRoute.jsx`
Este componente protege las rutas que requieren autenticación, redirigiendo a los usuarios no autenticados a la página de inicio de sesión.

### `PinnedContacts.jsx`
Este componente muestra una lista de contactos fijados.

### `AlertDialog.jsx`
Este componente muestra un cuadro de diálogo de alerta.

### `DeleteContactAlert.jsx`
Este componente muestra un cuadro de diálogo de confirmación para eliminar un contacto.

### `RightModal.jsx`
Este componente muestra un modal deslizante desde la derecha.

### `SuccessAlert.jsx`
Este componente muestra una alerta de éxito.

## API

### `ContactService.js`
Este archivo contiene métodos para interactuar con la API de contactos, incluyendo la obtención, adición y eliminación de contactos.

### `contacts.js`
Este archivo contiene una función para obtener contactos desde una URL de API.

## Autenticación

### `auth0-config.js`
Este archivo contiene la configuración para la autenticación con Auth0.

## Estilos

### `App.css`
Este archivo contiene estilos básicos para la aplicación.

### `index.css`
Este archivo contiene estilos globales para la aplicación.

## Scripts

### `package.json`
Este archivo contiene los scripts para ejecutar la aplicación, incluyendo:
- `dev`: Inicia la aplicación en modo desarrollo.
- `start`: Inicia la aplicación.
- `build`: Construye la aplicación para producción.
- `lint`: Ejecuta ESLint para verificar el código.
- `preview`: Previsualiza la aplicación construida.

## Configuración de ESLint

### `eslint.config.js`
Este archivo contiene la configuración de ESLint para el proyecto, incluyendo reglas y plugins para React y hooks.

## Configuración de Vite

### `vite.config.js`
Este archivo contiene la configuración de Vite para el proyecto, incluyendo plugins para React y Tailwind CSS.

## Variables de Entorno

### `.env`
Este archivo contiene las variables de entorno necesarias para la aplicación, incluyendo la URL de la API y la configuración de Auth0.

## Despliegue

La aplicación está desplegada en Netlify y puede ser accedida en el siguiente enlace:

[URL DE DESPLIEGUE](https://mellow-bavarois-de2bab.netlify.app/)

## Mejoras Realizadas

Una de las mejoras realizadas a la respuesta inicial generada por la IA fue asegurar que el componente `ContactDetail` muestre correctamente el correo electrónico del contacto destacado. Inicialmente, el correo electrónico no se mostraba. Se realizaron los siguientes cambios:

1. **Actualización de `ContactDetail.jsx`**: Se aseguró que el correo electrónico esté incluido en la salida renderizada.
    ```jsx
    import React from 'react';

    const ContactDetail = ({ contact }) => {
      return (
        <div className="contact-detail">
          <h2>Contacto Destacado</h2>
          <p>Nombre: {contact.name}</p>
          <p>Teléfono: {contact.phonenumber}</p>
          <p>Correo: {contact.email}</p>
        </div>
      );
    };

    export default ContactDetail;
    ```

2. **Actualización de `contacts.js`**: Se aseguró que cada contacto en los datos estáticos incluya un campo de correo electrónico.
    ```javascript
    const contacts = [
      { id: 1, name: 'John Doe', phone: '123-456-7890', email: 'john.doe@example.com' },
      { id: 2, name: 'Jane Smith', phone: '987-654-3210', email: 'jane.smith@example.com' },
      { id: 3, name: 'Alice Johnson', phone: '555-123-4567', email: 'alice.johnson@example.com' },
      { id: 4, name: 'Bob Brown', phone: '444-555-6666', email: 'bob.brown@example.com' },
      { id: 5, name: 'Charlie Davis', phone: '333-222-1111', email: 'charlie.davis@example.com' }
    ];

    export default contacts;
    ```

Con estas mejoras, la aplicación ahora muestra correctamente el correo electrónico del contacto destacado, proporcionando una experiencia de usuario más completa y funcional.

### Implementaciones adicionales realizadas

### HU1: Implementación del Dashboard
“Como usuario, quiero ver un panel de control que muestre métricas clave sobre mis contactos, para tener una visión general rápida de mi información de contactos.”

**Criterios de Aceptación:**
- Se implementa un componente `Dashboard` que muestra el total de contactos, contactos fijados y contactos por tipo (familia, social, trabajo).
- Se utiliza `ContactService` para obtener los datos de los contactos.
- Se muestran las métricas en tarjetas con iconos y colores distintivos.
- El panel de control se actualiza automáticamente al cargar la página.

### HU2: Implementación del Delete para Eliminar un Contacto en el Backend
“Como usuario, quiero poder eliminar un contacto desde la aplicación, para mantener mi lista de contactos actualizada y libre de entradas innecesarias.”

**Criterios de Aceptación:**
- Se implementa un método `deleteContact` en `ContactService` que realiza una petición `DELETE` a la API.
- Se añade un botón de eliminar en cada contacto en `ContactItem`.
- Al presionar el botón de eliminar, se muestra un cuadro de diálogo de confirmación (`DeleteContactAlert`).
- Si el usuario confirma, se elimina el contacto y se actualiza la lista de contactos.
- Se muestra un mensaje de error si la eliminación falla.

### HU3: Implementación de la Autenticación con Auth0
“Como usuario, quiero poder iniciar sesión y cerrar sesión utilizando Auth0, para asegurar que solo usuarios autorizados puedan acceder a la aplicación.”

**Criterios de Aceptación:**
- Se configura Auth0 en el proyecto utilizando el archivo `auth0-config.js`.
- Se implementa un componente `LoginPage` que permite a los usuarios iniciar sesión con Auth0.
- Se implementa un componente `LogoutPage` que permite a los usuarios cerrar sesión.
- Se protege el acceso a rutas sensibles utilizando el componente `ProtectedRoute`.
- Se muestra el nombre y la foto del usuario autenticado en la barra lateral (`Sidebar`).

## Plugins Oficiales

Actualmente, dos plugins oficiales están disponibles:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) utiliza [Babel](https://babeljs.io/) para Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) utiliza [SWC](https://swc.rs/) para Fast Refresh.