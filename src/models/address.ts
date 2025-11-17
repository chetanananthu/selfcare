import mongoose, { Schema, Document } from "mongoose";

export interface Address extends Document {
    userId: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

const addressSchema = new Schema<Address>({
    userId: { type: String, unique: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
});

export const AddressModel = mongoose.model<Address>("Address", addressSchema);
