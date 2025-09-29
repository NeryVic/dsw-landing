export const emailValidation = (email) => {
  if (!email) return 'El email es requerido'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return 'El email no es válido'
  return null
}

export const nameValidation = (name) => {
  if (!name) return 'El nombre es requerido'
  if (name.length < 2) return 'El nombre debe tener al menos 2 caracteres'
  if (name.length > 50) return 'El nombre no puede tener más de 50 caracteres'
  return null
}

export const messageValidation = (message) => {
  if (!message) return 'El mensaje es requerido'
  if (message.length < 10) return 'El mensaje debe tener al menos 10 caracteres'
  if (message.length > 500) return 'El mensaje no puede tener más de 500 caracteres'
  return null
}

export const phoneValidation = (phone) => {
  if (!phone) return null // Optional field
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) return 'El teléfono no es válido'
  return null
}

export const contactFormValidation = {
  name: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
  message: messageValidation
}