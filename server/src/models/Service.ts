import { Schema, model, models, Types } from "mongoose";

export interface IService {
	businessId: Types.ObjectId;
	name: string;
	price: number;
	description: string;
	duration: number; // in minutes
}

const serviceSchema = new Schema<IService>(
	{
		businessId: {
			type: Schema.Types.ObjectId,
			ref: "Business",
			required: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		price: {
			type: Number,
			required: true,
		},
		duration: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true }
);

const Service = models.Service || model<IService>("Service", serviceSchema);

export default Service;