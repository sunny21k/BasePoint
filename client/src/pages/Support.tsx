import { useState } from "react";
import { Link } from "react-router-dom";
import {
	FiMail,
	FiClock,
	FiHelpCircle,
	FiPhone,
	FiArrowRight,
} from "react-icons/fi";

const faqs = [
	{
		q: "How long does business review take?",
		a: "Most applications are reviewed within 24–48 hours, depending on the details provided.",
	},
	{
		q: "Why was my application delayed?",
		a: "We may need to confirm business details or request additional information before approval.",
	},
	{
		q: "Can I update my business details after submitting?",
		a: "Yes, contact support and we can help update your application if it hasn’t been approved yet.",
	},
	{
		q: "What if I don’t have a website or social link?",
		a: "That’s okay. The field is optional, and you can leave it blank if your business doesn’t have one.",
	},
];

export default function Support() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		alert("Support request submitted. We’ll get back to you soon.");
		setFormData({ name: "", email: "", subject: "", message: "" });
	};

	return (
		<div className="min-h-screen bg-sky-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-6xl">
				<div className="mb-8 flex items-center justify-between">
					<Link
						to="/"
						className="text-sm font-semibold text-sky-700 hover:text-sky-800">
						← Back home
					</Link>
					<Link
						to="/business/login"
						className="text-sm font-semibold text-sky-700 hover:text-sky-800">
						Business login
					</Link>
				</div>

				<div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
					<div className="space-y-6">
						<div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
							<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
								<FiHelpCircle className="h-7 w-7" />
							</div>
							<h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
								Support Center
							</h1>
							<p className="mt-3 text-slate-600">
								Need help with your account, onboarding, or business review?
								Reach out and we’ll help you get sorted.
							</p>

							<div className="mt-6 space-y-4">
								<div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
									<FiMail className="mt-0.5 h-5 w-5 text-sky-600" />
									<div>
										<p className="font-semibold text-slate-900">Email</p>
										<p className="text-sm text-slate-600">
											support@basepoint.com
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
									<FiPhone className="mt-0.5 h-5 w-5 text-sky-600" />
									<div>
										<p className="font-semibold text-slate-900">Phone</p>
										<p className="text-sm text-slate-600">(555) 123-4567</p>
									</div>
								</div>
								<div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
									<FiClock className="mt-0.5 h-5 w-5 text-sky-600" />
									<div>
										<p className="font-semibold text-slate-900">
											Response time
										</p>
										<p className="text-sm text-slate-600">
											Usually within 1 business day.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
							<h2 className="text-xl font-semibold text-slate-900">
								Frequently asked questions
							</h2>
							<div className="mt-5 space-y-4">
								{faqs.map((item) => (
									<div
										key={item.q}
										className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
										<p className="font-semibold text-slate-900">{item.q}</p>
										<p className="mt-1 text-sm leading-6 text-slate-600">
											{item.a}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
						<h2 className="text-2xl font-semibold tracking-tight text-slate-900">
							Send us a message
						</h2>
						<p className="mt-2 text-sm text-slate-600">
							Tell us what you need and we’ll respond as soon as possible.
						</p>

						<form onSubmit={handleSubmit} className="mt-6 space-y-5">
							<div>
								<label className="mb-2 block text-sm font-medium text-slate-700">
									Your name
								</label>
								<input
									value={formData.name}
									onChange={(e) =>
										setFormData({ ...formData, name: e.target.value })
									}
									className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
									placeholder="Jane Doe"
								/>
							</div>

							<div>
								<label className="mb-2 block text-sm font-medium text-slate-700">
									Email address
								</label>
								<input
									type="email"
									value={formData.email}
									onChange={(e) =>
										setFormData({ ...formData, email: e.target.value })
									}
									className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
									placeholder="you@example.com"
								/>
							</div>

							<div>
								<label className="mb-2 block text-sm font-medium text-slate-700">
									Subject
								</label>
								<input
									value={formData.subject}
									onChange={(e) =>
										setFormData({ ...formData, subject: e.target.value })
									}
									className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
									placeholder="Account review, onboarding, billing..."
								/>
							</div>

							<div>
								<label className="mb-2 block text-sm font-medium text-slate-700">
									Message
								</label>
								<textarea
									rows={6}
									value={formData.message}
									onChange={(e) =>
										setFormData({ ...formData, message: e.target.value })
									}
									className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
									placeholder="How can we help?"
								/>
							</div>

							<button
								type="submit"
								className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800">
								Submit request
								<FiArrowRight className="h-5 w-5" />
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
