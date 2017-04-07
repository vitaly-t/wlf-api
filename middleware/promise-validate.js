const validate = (structure) => {
  return new Promise((resolve, reject) => {
    const { valid, errors } = structure.validate()
    if (!valid) {
      reject(errors)
    } else {
      resolve(structure)
    }
  })
}

module.exports = validate
