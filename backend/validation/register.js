const Validator = require('validator')
const isEmptyOrNull = require('./empty-or-null')

module.exports = function validateRegisterrInput (data) {
  let errors = {}

  data.name = !isEmptyOrNull(data.name) ? data.name : ''
  data.email = !isEmptyOrNull(data.email) ? data.email : ''
  data.password = !isEmptyOrNull(data.password) ? data.password : ''
  data.password_confirm = !isEmptyOrNull(data.password_confirm) ? data.password_confirm : ''

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 to 30 chars'
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required'
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must have 6 chars'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
  }

  if (!Validator.isLength(data.password_confirm, { min: 6, max: 30 })) {
    errors.password_confirm = 'Password must have 6 chars'
  }

  if (!Validator.equals(data.password, data.password_confirm)) {
    errors.password_confirm = 'Password and Confirm Password must match'
  }

  if (Validator.isEmpty(data.password_confirm)) {
    errors.password_confirm = 'Password is required'
  }
  return {
    errors,
    isValid: isEmptyOrNull(errors)
  }
}
