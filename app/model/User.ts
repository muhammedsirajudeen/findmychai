import mongoose, { Schema, Document, Model } from 'mongoose';

export interface User {
    _id: string
    name: string;
    email: string;
    password: string;
    avatar: string;
    createdAt: Date;
}

export interface IUser extends Omit<User, "_id">, Document {
}

const UserSchema: Schema<IUser> = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        avatar: {
            type: String,
            default: '',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        versionKey: false,
    }
);

// 3. Singleton export pattern to avoid recompilation issues
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
