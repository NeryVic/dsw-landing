import { useState } from 'react'

export function useForm(initialValues = {}, validationSchema = {}) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleBlur = (name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))

    // Validate field on blur
    if (validationSchema[name]) {
      const error = validationSchema[name](values[name])
      setErrors(prev => ({
        ...prev,
        [name]: error || ''
      }))
    }
  }

  const validate = () => {
    const newErrors = {}
    let isValid = true

    Object.keys(validationSchema).forEach(field => {
      const error = validationSchema[field](values[field])
      if (error) {
        newErrors[field] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (onSubmit) => {
    setIsSubmitting(true)
    
    const isValid = validate()
    if (!isValid) {
      setIsSubmitting(false)
      return
    }

    try {
      await onSubmit(values)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset
  }
}