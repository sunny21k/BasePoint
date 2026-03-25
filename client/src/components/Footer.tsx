export default function Footer() {
	return (
		<footer className="border-t border-white/5 py-10">
			<div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
				<div className="flex items-center gap-2">
					<div className="flex h-7 w-7 items-center justify-center rounded-lg bg-basepoint-teal/20 text-xs font-bold text-basepoint-teal">
						BP
					</div>
					<span className="font-semibold text-gray-200">BasePoint</span>
				</div>
				<div className="flex flex-wrap items-center gap-4">
					<span>© {new Date().getFullYear()} BasePoint Inc.</span>
					<span className="hidden h-1 w-1 rounded-full bg-gray-600 sm:inline-block" />
					<button className="hover:text-gray-300">Privacy</button>
					<button className="hover:text-gray-300">Terms</button>
					<button className="hover:text-gray-300">Support</button>
				</div>
			</div>
		</footer>
	);
}
