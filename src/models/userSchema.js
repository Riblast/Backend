import mongooseTypePhone from 'mongoose-type-phone'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  edad: { type: Number, required: true },
  email: { type: String, required: true, index: { unique: true } },
  photo: { type: String, default: 'user.png' },
  password: { type: String, required: true },
  phone: {
    type: mongoose.SchemaTypes.Phone,
    required: true,
    allowBlank: false,
    allowedNumberTypes: [mongooseTypePhone.PhoneNumberType.MOBILE, mongooseTypePhone.PhoneNumberType.FIXED_LINE_OR_MOBILE],
    phoneNumberFormat: mongooseTypePhone.PhoneNumberFormat.INTERNATIONAL, // can be omitted to keep raw input
    defaultRegion: 'UY',
    parseOnGet: false
  },
  isAdmin: { type: Boolean, default: false }
})

export default mongoose.model('usuarios', userSchema)
