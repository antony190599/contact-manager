import { useState } from 'react'

export default function ContactForm({
  setIsModalOpen, handleSubmitLogic
}) {
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    type: ''
  })

  const validateForm = () => {
    const newErrors = {}
    
    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    } else if (!/^[A-Za-zÀ-ÿ\s]{2,}$/.test(formData.firstName)) {
      newErrors.firstName = 'Enter a valid first name (minimum 2 characters, letters only)'
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    } else if (!/^[A-Za-zÀ-ÿ\s]{2,}$/.test(formData.lastName)) {
      newErrors.lastName = 'Enter a valid last name (minimum 2 characters, letters only)'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address'
    }

    // Phone validation
    if (!formData.phonenumber.trim()) {
      newErrors.phonenumber = 'Phone number is required'
    } else if (!/^\+?[0-9]{8,15}$/.test(formData.phonenumber.replace(/\s/g, ''))) {
      newErrors.phonenumber = 'Enter a valid phone number (8-15 digits)'
    }

    // Contact Type validation
    if (!formData.type) {
      newErrors.type = 'Contact type is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      const contacts = JSON.parse(localStorage.getItem('contacts') || '[]')
      const newContact = {
        id: Date.now(),
        ...formData
      }
      contacts.push(newContact)
      handleSubmitLogic(contacts)
      setIsModalOpen(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      })
    }
  }

  return (

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg ${errors.phonenumber ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.phonenumber && <p className="text-red-500 text-sm mt-1">{errors.phonenumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg ${errors.type ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select a type</option>
                <option value="familia">Familia</option>
                <option value="social">Social</option>
                <option value="trabajo">Trabajo</option>
              </select>
              {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save Contact
            </button>
          </div>
        </form>
  )
}