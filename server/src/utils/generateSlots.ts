type GenerateSlotsParams = {
	open: string; // "09:00"
	close: string; // "17:00"
	duration: number; // 30
	buffer: number; // 10
};

export function generateSlots({
	open,
	close,
	duration,
	buffer,
}: GenerateSlotsParams) {
	const slots: string[] = [];

	const [openH, openM] = open.split(":").map(Number);
	const [closeH, closeM] = close.split(":").map(Number);

	let current = new Date();
	current.setHours(openH, openM, 0);

	const end = new Date();
	end.setHours(closeH, closeM, 0);

	while (current < end) {
		slots.push(
			current.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			}),
		);

		// move forward by duration + buffer
		current = new Date(
			current.getTime() + (duration + buffer) * 60000,
		);
	}

	return slots;
}