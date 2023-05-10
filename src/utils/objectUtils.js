
const transformMongoModel = (object) => {
  const newObject = { ...object._doc }
  newObject.id = newObject._id.toString()
  delete newObject._id
  delete newObject.__v
  return newObject
}

const transformMongoObject = (model) => {
  if (!model || model.length === 0) {
    return null
  }

  let result
  if (model.length >= 1) {
    result = model.map(elem => transformMongoModel(elem))
  } else {
    result = transformMongoModel(model)
  }
  return result
}

export default transformMongoObject
