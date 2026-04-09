import { Request, Response } from "express";
import Service from "../models/Service";
import Business from "../models/Business";

interface AuthRequest extends Request {
	user?: { id: string };
}

export const createService = async (req: AuthRequest, res: Response) => {
	try {
		const userId = req.user?.id;

		const business = await Business.findOne({ userId });

		if (!business) {
			return res.status(404).json({ message: "Business not found" });
		}

		const { name, price, duration, description } = req.body;

		if (!name || !price || !duration) {
			return res.status(400).json({ message: "All fields required" });
		}

		const service = await Service.create({
			businessId: business._id,
			name,
			price,
			duration,
            description,
		});

		return res.status(201).json({ service });
	} catch (err) {
		return res.status(500).json({ message: "Server error" });
	}
};

export const createServicesBulk = async (req: AuthRequest, res: Response) => {
	try {
		const userId = req.user?.id;

		if (!userId) {
			return res.status(401).json({ message: "Not authorized" });
		}

		const business = await Business.findOne({ userId });

		if (!business) {
			return res.status(404).json({ message: "Business not found" });
		}

		const { services } = req.body;

		if (!services || !Array.isArray(services) || services.length === 0) {
			return res.status(400).json({ message: "Services are required" });
		}

		// attach businessId to each service
		const formattedServices = services.map((service: any) => ({
			businessId: business._id,
			name: service.name,
			price: service.price,
			duration: service.duration,
		}));

		const createdServices = await Service.insertMany(formattedServices);

		return res.status(201).json({ services: createdServices });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Server error" });
	}
};

export const getServices = async (req: AuthRequest, res: Response) => {
	try {
		const userId = req.user?.id;

		if (!userId) {
			return res.status(401).json({ message: "Not authorized" });
		}

		const business = await Business.findOne({ userId });

		if (!business) {
			return res.status(404).json({ message: "Business not found" });
		}

		const services = await Service.find({ businessId: business._id });

		return res.status(200).json({ services });
	} catch (err) {
		return res.status(500).json({ message: "Server error" });
	}
};

export const updateService = async (req: AuthRequest, res: Response) => {
	try {
		const userId = req.user?.id;
		const { id } = req.params;
		const { name, price, duration, description } = req.body;

		if (!userId) {
			return res.status(401).json({ message: "Not authorized" });
		}

		const business = await Business.findOne({ userId });

		if (!business) {
			return res.status(404).json({ message: "Business not found" });
		}

		const service = await Service.findOneAndUpdate(
			{ _id: id, businessId: business._id },
			{ name, price, duration, description },
			{ new: true }
		);

		if (!service) {
			return res.status(404).json({ message: "Service not found" });
		}

		return res.status(200).json({ service });
	} catch (err) {
		return res.status(500).json({ message: "Server error" });
	}
};

export const deleteService = async (req: AuthRequest, res: Response) => {
	try {
		const userId = req.user?.id;
		const { id } = req.params;

		if (!userId) {
			return res.status(401).json({ message: "Not authorized" });
		}

		const business = await Business.findOne({ userId });

		if (!business) {
			return res.status(404).json({ message: "Business not found" });
		}

		const service = await Service.findOneAndDelete({
			_id: id,
			businessId: business._id,
		});

		if (!service) {
			return res.status(404).json({ message: "Service not found" });
		}

		return res.status(200).json({ message: "Service deleted" });
	} catch (err) {
		return res.status(500).json({ message: "Server error" });
	}
};