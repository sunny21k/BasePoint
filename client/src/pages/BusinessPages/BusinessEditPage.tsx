import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
	FiArrowLeft,
	FiSave,
	FiUser,
	FiSettings,
	FiMessageCircle,
	FiLink,
	FiImage,
} from "react-icons/fi";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { API_URL } from "../BusinessPages/BusinessAuthContext";

type FAQItem = {
	question: string;
	answer: string;
};

type GalleryItem = {
	url: string;
	alt: string;
};

type BusinessForm = {
	businessName: string;
	tagline: string;
	category: string;
	ownerName: string;
	email: string;
	phone: string;
	businessAddress: string;
	serviceArea: string;
	websiteOrSocial: string;
	bookingLink: string;
	instagram: string;
	facebook: string;
	tiktok: string;
	description: string;
	holidayHours: string;
	attributes: string;
	preferences: {
		bookingType: "in-person" | "online" | "both";
		bufferTime: number;
		allowCancellations: boolean;
		cancellationFee: number;
		cancellationFeeType: "dollar" | "percent";
		cancellationWindow: number;
	};
	faq: FAQItem[];
	galleryImages: GalleryItem[];
};

export default function BusinessEditPage() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");
	const [form, setForm] = useState<BusinessForm>({
		businessName: "",
		tagline: "",
		category: "",
		ownerName: "",
		email: "",
		phone: "",
		businessAddress: "",
		serviceArea: "",
		websiteOrSocial: "",
		bookingLink: "",
		instagram: "",
		facebook: "",
		tiktok: "",
		description: "",
		holidayHours: "",
		attributes: "",
		preferences: {
			bookingType: "in-person",
			bufferTime: 0,
			allowCancellations: true,
			cancellationFee: 0,
			cancellationFeeType: "dollar",
			cancellationWindow: 0,
		},
		faq: [],
		galleryImages: [],
	});

	useEffect(() => {
		const loadBusiness = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) return;

				const { data } = await axios.get(`${API_URL}/api/business/me`, {
					headers: { Authorization: `Bearer ${token}` },
				});

				const business = data.business;
				if (!business) return;

				setForm({
					businessName: business.businessName || "",
					tagline: business.tagline || "",
					category: business.category || "",
					ownerName: business.ownerName || "",
					email: business.email || "",
					phone: business.phone || "",
					businessAddress: business.businessAddress || "",
					serviceArea: business.serviceArea || "",
					websiteOrSocial: business.websiteOrSocial || "",
					bookingLink: business.bookingLink || "",
					instagram: business.instagram || "",
					facebook: business.facebook || "",
					tiktok: business.tiktok || "",
					description: business.description || "",
					holidayHours: business.holidayHours || "",
					attributes: Array.isArray(business.attributes)
						? business.attributes.join(", ")
						: "",
					preferences: business.preferences || {
						bookingType: "in-person",
						bufferTime: 0,
						allowCancellations: true,
						cancellationFee: 0,
						cancellationFeeType: "dollar",
						cancellationWindow: 0,
					},
					faq: business.faq || [],
					galleryImages: Array.isArray(business.galleryImages)
						? business.galleryImages
						: [],
				});
			} catch (err) {
				console.error(err);
				setError("Failed to load business.");
			} finally {
				setLoading(false);
			}
		};

		loadBusiness();
	}, []);

	const handleSave = async () => {
		try {
			setSaving(true);
			setError("");

			const token = localStorage.getItem("token");

			const payload = {
				businessName: form.businessName,
				tagline: form.tagline,
				category: form.category,
				ownerName: form.ownerName,
				phone: form.phone,
				businessAddress: form.businessAddress,
				serviceArea: form.serviceArea,
				websiteOrSocial: form.websiteOrSocial,
				bookingLink: form.bookingLink,
				instagram: form.instagram,
				facebook: form.facebook,
				tiktok: form.tiktok,
				description: form.description,
				holidayHours: form.holidayHours,
				attributes: form.attributes
					.split(",")
					.map((item) => item.trim())
					.filter(Boolean),
				preferences: form.preferences,
				faq: form.faq.filter((f) => f.question.trim() && f.answer.trim()),
				galleryImages: form.galleryImages.filter((img) => img.url.trim()),
			};

			await axios.put(`${API_URL}/api/business/update-profile`, payload, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			navigate("/business/dashboard/profile");
		} catch (err: any) {
			console.error(err);
			setError(err.response?.data?.message || "Failed to save business.");
		} finally {
			setSaving(false);
		}
	};

	const addFaq = () => {
		setForm({
			...form,
			faq: [...form.faq, { question: "", answer: "" }],
		});
	};

	const updateFaq = (index: number, field: keyof FAQItem, value: string) => {
		const next = [...form.faq];
		next[index] = { ...next[index], [field]: value };
		setForm({ ...form, faq: next });
	};

	const removeFaq = (index: number) => {
		setForm({
			...form,
			faq: form.faq.filter((_, i) => i !== index),
		});
	};

	const addGalleryItem = () => {
		setForm({
			...form,
			galleryImages: [...form.galleryImages, { url: "", alt: "" }],
		});
	};

	const updateGalleryItem = (
		index: number,
		field: keyof GalleryItem,
		value: string,
	) => {
		const next = [...form.galleryImages];
		next[index] = { ...next[index], [field]: value };
		setForm({ ...form, galleryImages: next });
	};

	const removeGalleryItem = (index: number) => {
		setForm({
			...form,
			galleryImages: form.galleryImages.filter((_, i) => i !== index),
		});
	};

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-sky-50">
				<p className="text-slate-600">Loading business...</p>
			</div>
		);
	}

	return (
		<DashboardLayout>
			<div className="min-h-screen bg-sky-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<div className="mb-6 flex items-center justify-between">
						<button
							onClick={() => navigate(-1)}
							className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
							<FiArrowLeft className="h-4 w-4" />
							Back
						</button>

						<button
							onClick={handleSave}
							disabled={saving}
							className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50">
							<FiSave className="h-4 w-4" />
							{saving ? "Saving..." : "Save changes"}
						</button>
					</div>

					{error && (
						<div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
							{error}
						</div>
					)}

					<div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
						<div className="space-y-8">
							<HeroCard name={form.businessName} tagline={form.tagline} />

							<Section
								title="Business profile"
								icon={<FiUser className="h-4 w-4" />}>
								<div className="grid gap-4 sm:grid-cols-2">
									<Input
										label="Business name"
										value={form.businessName}
										onChange={(v) =>
											setForm({
												...form,
												businessName: v,
											})
										}
									/>
									<Input
										label="Category"
										value={form.category}
										onChange={(v) => setForm({ ...form, category: v })}
									/>
									<Input
										label="Owner name"
										value={form.ownerName}
										onChange={(v) => setForm({ ...form, ownerName: v })}
									/>
									<Input label="Email" value={form.email} readOnly />
									<Input
										label="Phone"
										value={form.phone}
										onChange={(v) => setForm({ ...form, phone: v })}
									/>
									<Input
										label="Service area"
										value={form.serviceArea}
										onChange={(v) =>
											setForm({
												...form,
												serviceArea: v,
											})
										}
									/>
								</div>

								<Input
									label="Tagline"
									value={form.tagline}
									onChange={(v) => setForm({ ...form, tagline: v })}
								/>
								<Textarea
									label="Description"
									value={form.description}
									onChange={(v) => setForm({ ...form, description: v })}
								/>
								<Textarea
									label="Holiday hours"
									value={form.holidayHours}
									onChange={(v) => setForm({ ...form, holidayHours: v })}
								/>
								<Textarea
									label="Business address"
									value={form.businessAddress}
									onChange={(v) =>
										setForm({
											...form,
											businessAddress: v,
										})
									}
								/>
								<Input
									label="Attributes (comma separated)"
									value={form.attributes}
									onChange={(v) => setForm({ ...form, attributes: v })}
								/>
							</Section>
						</div>

						<div className="space-y-8">
							<Section
								title="Links & socials"
								icon={<FiLink className="h-4 w-4" />}>
								<Input
									label="Website or social"
									value={form.websiteOrSocial}
									onChange={(v) =>
										setForm({
											...form,
											websiteOrSocial: v,
										})
									}
								/>
								<Input
									label="Booking link"
									value={form.bookingLink}
									onChange={(v) => setForm({ ...form, bookingLink: v })}
								/>
								<Input
									label="Instagram"
									value={form.instagram}
									onChange={(v) => setForm({ ...form, instagram: v })}
								/>
								<Input
									label="Facebook"
									value={form.facebook}
									onChange={(v) => setForm({ ...form, facebook: v })}
								/>
								<Input
									label="TikTok"
									value={form.tiktok}
									onChange={(v) => setForm({ ...form, tiktok: v })}
								/>
							</Section>

							<Section
								title="Preferences"
								icon={<FiSettings className="h-4 w-4" />}>
								<Select
									label="Booking type"
									value={form.preferences.bookingType}
									onChange={(v) =>
										setForm({
											...form,
											preferences: {
												...form.preferences,
												bookingType: v as any,
											},
										})
									}
									options={["in-person", "online", "both"]}
								/>
								<Input
									label="Buffer time"
									type="number"
									value={String(form.preferences.bufferTime)}
									onChange={(v) =>
										setForm({
											...form,
											preferences: {
												...form.preferences,
												bufferTime: Number(v),
											},
										})
									}
								/>
								<Input
									label="Cancellation window"
									type="number"
									value={String(form.preferences.cancellationWindow)}
									onChange={(v) =>
										setForm({
											...form,
											preferences: {
												...form.preferences,
												cancellationWindow: Number(v),
											},
										})
									}
								/>
								<Input
									label="Cancellation fee"
									type="number"
									value={String(form.preferences.cancellationFee)}
									onChange={(v) =>
										setForm({
											...form,
											preferences: {
												...form.preferences,
												cancellationFee: Number(v),
											},
										})
									}
								/>
								<Select
									label="Cancellation fee type"
									value={form.preferences.cancellationFeeType}
									onChange={(v) =>
										setForm({
											...form,
											preferences: {
												...form.preferences,
												cancellationFeeType: v as any,
											},
										})
									}
									options={["dollar", "percent"]}
								/>
							</Section>

							<Section title="Gallery" icon={<FiImage className="h-4 w-4" />}>
								<div className="flex justify-end">
									<button
										type="button"
										onClick={addGalleryItem}
										className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold transition hover:bg-slate-50">
										Add image
									</button>
								</div>

								<div className="space-y-3">
									{form.galleryImages.map((img, index) => (
										<div
											key={index}
											className="rounded-2xl border border-slate-200 p-4">
											<Input
												label="Image URL"
												value={img.url}
												onChange={(v) => updateGalleryItem(index, "url", v)}
											/>
											<Input
												label="Alt text"
												value={img.alt}
												onChange={(v) => updateGalleryItem(index, "alt", v)}
											/>
											<button
												type="button"
												onClick={() => removeGalleryItem(index)}
												className="mt-2 inline-flex cursor-pointer items-center gap-2 text-sm text-rose-600 transition hover:text-rose-700">
												Remove
											</button>
										</div>
									))}
								</div>
							</Section>

							<Section
								title="FAQ"
								icon={<FiMessageCircle className="h-4 w-4" />}>
								<div className="flex justify-end">
									<button
										type="button"
										onClick={addFaq}
										className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold transition hover:bg-slate-50">
										Add FAQ
									</button>
								</div>

								<div className="space-y-3">
									{form.faq.map((item, index) => (
										<div
											key={index}
											className="rounded-2xl border border-slate-200 p-4">
											<Input
												label="Question"
												value={item.question}
												onChange={(v) => updateFaq(index, "question", v)}
											/>
											<Textarea
												label="Answer"
												value={item.answer}
												onChange={(v) => updateFaq(index, "answer", v)}
											/>
											<button
												type="button"
												onClick={() => removeFaq(index)}
												className="mt-2 inline-flex cursor-pointer items-center gap-2 text-sm text-rose-600 transition hover:text-rose-700">
												Remove
											</button>
										</div>
									))}
								</div>
							</Section>
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}

function HeroCard({ name, tagline }: { name: string; tagline: string }) {
	return (
		<div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
			<div className="h-48 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.6),transparent_40%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,132,199,0.78))] p-6 sm:p-8">
				<div className="flex h-full flex-col justify-between">
					<div className="flex flex-wrap items-center gap-2">
						<span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
							<FiUser className="h-4 w-4 text-emerald-300" />
							Editing business
						</span>
						<span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
							<FiSave className="h-4 w-4 text-sky-200" />
							Changes save to profile
						</span>
					</div>

					<div className="max-w-2xl text-white">
						<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
							{name || "Business profile"}
						</h1>
						<p className="mt-2 text-sm font-medium text-white/80">
							{tagline ||
								"Update your profile, links, settings, gallery, and FAQ."}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function Section({
	title,
	icon,
	children,
}: {
	title: string;
	icon: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
			<div className="mb-4 flex items-center gap-2">
				<span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
					{icon}
				</span>
				<h2 className="text-lg font-semibold text-slate-900">{title}</h2>
			</div>
			<div className="space-y-4">{children}</div>
		</div>
	);
}

function Input({
	label,
	value,
	onChange,
	type = "text",
	readOnly = false,
}: {
	label: string;
	value: string;
	onChange?: (value: string) => void;
	type?: string;
	readOnly?: boolean;
}) {
	return (
		<label className="block">
			<span className="mb-1 block text-sm font-medium text-slate-700">
				{label}
			</span>
			<input
				type={type}
				value={value}
				readOnly={readOnly}
				onChange={onChange ? (e) => onChange(e.target.value) : undefined}
				className={`w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sky-500 ${
					readOnly ? "bg-slate-100 text-slate-500" : "bg-white"
				}`}
			/>
		</label>
	);
}

function Textarea({
	label,
	value,
	onChange,
}: {
	label: string;
	value: string;
	onChange: (value: string) => void;
}) {
	return (
		<label className="block">
			<span className="mb-1 block text-sm font-medium text-slate-700">
				{label}
			</span>
			<textarea
				value={value}
				onChange={(e) => onChange(e.target.value)}
				rows={4}
				className="w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sky-500"
			/>
		</label>
	);
}

function Select({
	label,
	value,
	onChange,
	options,
}: {
	label: string;
	value: string;
	onChange: (value: string) => void;
	options: string[];
}) {
	return (
		<label className="block">
			<span className="mb-1 block text-sm font-medium text-slate-700">
				{label}
			</span>
			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sky-500">
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</label>
	);
}
