import mongoose from 'mongoose'
import mongooseTypePhone from 'mongoose-type-phone'

const usersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: String, required: true },
    adress: { type: String, required: true },
    phone: {
        type: mongoose.SchemaTypes.Phone,
        required: true,
        allowBlank: false,
        allowedNumberTypes: [mongooseTypePhone.PhoneNumberType.MOBILE, mongooseTypePhone.PhoneNumberType.FIXED_LINE_OR_MOBILE],
        phoneNumberFormat: mongooseTypePhone.PhoneNumberFormat.INTERNATIONAL, // can be omitted to keep raw input
        defaultRegion: 'UY',
        parseOnGet: false
    },
    avatar: { type: String }
})

export default mongoose.model('users', usersSchema)