# Contact Manager

Esta es una aplicación simple de gestión de contactos construida con React.

## Estructura del Proyecto
```
contact-manager/
├── src/
│   ├── components/
│   │   ├── ContactList.jsx
│   │   ├── ContactDetail.jsx
│   │   ├── Header.jsx
│   │   ├── ContactCard.jsx
│   │   ├── ContactGrid.jsx
│   │   ├── ContactRow.jsx
│   ├── data/
│   │   ├── Contacts.json
│   ├── libs/
│   │   ├── utils.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── index.html
├── package.json
├── README.md
```


## Componentes

### `ContactList.jsx`
Este componente es responsable de mostrar una lista de contactos. Recibe un array de contactos desde `contacts.js` y renderiza cada contacto con su nombre y número de teléfono. También incluye un botón para alternar entre una vista de lista y una vista de tarjetas.

### `ContactDetail.jsx`
Este componente muestra los detalles de un contacto destacado, incluyendo el nombre, número de teléfono y correo electrónico. La información del contacto se pasa como una prop a este componente.

### `Header.jsx`
Este componente renderiza el encabezado de la aplicación, que incluye el nombre de la aplicación y un menú de navegación con al menos dos enlaces ficticios.

### `App.jsx`
Este es el componente principal de la aplicación. Gestiona el estado del contacto destacado e incluye los componentes `Header`, `ContactList` y `ContactDetail`. También maneja la selección de un contacto para ser destacado.

### `Main.jsx`
Este archivo es el punto de entrada de la aplicación. Renderiza el componente `App` en el elemento raíz del HTML.

## Datos

### `contacts.js`
Este archivo contiene un array de datos estáticos de contactos. Cada contacto tiene un id, nombre, número de teléfono y correo electrónico.

## Estilos

### `App.css`
Este archivo contiene estilos básicos para la aplicación, incluyendo estilos para el encabezado, detalles del contacto y la vista de tarjetas.

### `index.css`
Este archivo contiene estilos globales para la aplicación.

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
          <p>Teléfono: {contact.phone}</p>
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

**URL DE DESPLIEGUE:** https://mellow-bavarois-de2bab.netlify.app/

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
