import { Document, ObjectId, Types } from "mongoose"

export enum Role {
    admin = "admin",
    user = "user",
}

export interface IUser extends Document {
    _id: Types.ObjectId;
    username: string;
    email: string;
    name?: string;
    image?: string;
    password: string;
    password_reset_token?: string;
    password_reset_token_expires?: Date;
    role: Role;
    status: boolean;
    suspanding_reasons?: string[];
    suspanding_count?: number;
    createAccessToken: () => Promise<string>;
    publicResponse: () => Promise<any>;
    newUserResponse: () => Promise<any>;
}