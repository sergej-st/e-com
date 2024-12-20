class CustomAPIError extends Error {

  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }

  static fromJoiError(joiError) {
    const errorMessage = joiError.details
      .map(detail => detail.message.replace(/"/g, ''))
      .join(', ')
    return new CustomAPIError(errorMessage, 400) 
  }
}

module.exports = CustomAPIError
