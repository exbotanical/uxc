function doWork(x: number, y: number) {
	console.log(x + y);
}

function stopAndGo(flag: 0 | 1) {
	doWork(2, 3);

	if (!flag) {
		stopAndGo(1);
	}

	doWork(4, 4);
}

stopAndGo(0);

// forward function (return it to retry execution)

function tryThing() {
	return function forward() {
		console.log('forwarded');
	};
}

function runner(fn) {
	const tryThingAgain = tryThing();
	if (tryThingAgain) {
		tryThingAgain();
	}
}
