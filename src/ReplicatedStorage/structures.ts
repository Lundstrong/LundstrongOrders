export class Order {
	creator;
	receiver;
	items;
	isClaimed = false;
	isCompleted = false;

	constructor(creator: Player, receiver: Player, items: string[]) {
		this.creator = creator;
		this.receiver = receiver;
		this.items = items;
	}
}

export class Notification {
	title;
	text;
	time = 5;

	constructor(title: string, text: string, time?: number) {
		this.title = title;
		this.text = text;
		if (time !== undefined) {
			this.time = time;
		}
	}
}

export class Error extends Notification {
	code;

	constructor(userFacingError: string, code: number) {
		super("Error", userFacingError);
		this.code = code;
	}
}

// * These GUI types can be "fired" to the client via the API or internal scripts.
// ? a const enum is used here, so values are replaced at the transpile, instead of needing to have extra code at run-time.
export const enum fireableGuiTypes {
	cashierGui,
	kioskGui,
	hrScreenGui,
}
