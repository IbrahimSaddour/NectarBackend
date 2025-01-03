import mongoose from "mongoose";
import bcrypt from "bcrypt";


const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            lowercase: true,
            required: true,
        },
        email: {
            type: String,
            lowercase: true,
            required: true,
            unique: [true, 'Email already exists'],
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);



userSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }

}


userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
});



export default model("User", userSchema);