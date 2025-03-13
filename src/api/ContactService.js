export default class ContactService {
    async fetchContacts() {
        const API_URL = `${import.meta.env.VITE_API_URL}/contacts`;
        try {
          const response = await fetch(API_URL);
          if (!response.ok) {
            throw new Error('Failed to fetch contacts');
          }
          const data = await response.json();
          return data;
        } catch (error) {
          throw new Error(error.message);
        }
    }


    async addContact({
        fullname,
        email,
        phonenumber,
        type
    }) {
        const API_URL = `${import.meta.env.VITE_API_URL}/contacts`;
        try {
          const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullname,
                email,
                phonenumber,
                type,
            }),
          });
          if (!response.ok) {
            throw new Error('Failed to add contact');
          }
          const data = await response.json();
          return data;
        } catch (error) {
          throw new Error(error.message);
        }
    }

    async deleteContact(id) {
        const API_URL = `${import.meta.env.VITE_API_URL}/contacts/${id}`;
        try {
          const response = await fetch(API_URL, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Failed to delete contact');
          }
          return true;
        } catch (error) {
          throw new Error(error.message);
        }
    }
}