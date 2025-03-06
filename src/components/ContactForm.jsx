import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ContactForm = ({ onSave }) => {
  const [fullname, setFullname] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const validateForm = () => {
      const newErrors = {};
      if (!fullname) newErrors.fullname = 'El nombre es requerido';
      if (!phonenumber) newErrors.phonenumber = 'El número de teléfono es requerido';
      if (!email) newErrors.email = 'El correo electrónico es requerido';
      setErrors(newErrors);
      setIsFormValid(Object.keys(newErrors).length === 0);
    };

    validateForm();
  }, [fullname, phonenumber, email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      const newContact = { fullname, phonenumber, email, type };
      onSave(newContact);
      setFullname('');
      setPhonenumber('');
      setEmail('');
      setType('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div>
        <label htmlFor="fullname">Nombre Completo:</label>
        <input
          type="text"
          id="fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        />
        {errors.fullname && <span className="error">{errors.fullname}</span>}
      </div>
      <div>
        <label htmlFor="phonenumber">Número de Teléfono:</label>
        <input
          type="tel"
          id="phonenumber"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          required
        />
        {errors.phonenumber && <span className="error">{errors.phonenumber}</span>}
      </div>
      <div>
        <label htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="type">Tipo:</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Seleccione un tipo</option>
          <option value="familia">Familia</option>
          <option value="social">Social</option>
          <option value="trabajo">Trabajo</option>
        </select>
      </div>
      <button type="submit" disabled={!isFormValid}>Guardar</button>
    </form>
  );
};

ContactForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default ContactForm;