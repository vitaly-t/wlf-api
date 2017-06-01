const validate = (structure) => {
  console.log(structure)
  return new Promise((resolve, reject) => {
    const { valid, errors } = structure.validate()
    if (!valid) {
      console.log(errors)
      reject(errors)
    } else {
      resolve(structure)
    }
  })
}

module.exports = validate
