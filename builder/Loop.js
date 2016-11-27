
class Loop {

	constructor() {
		this.loopIndex = 0;
		this.loopLength = 0;
	}

	setLoopLength(length) {
		this.loopLength = length;
	}

	isCompleted() {
		if (this.loopLength === 0) {
			return false;
		}
		return !(this.loopLength > this.loopIndex);
	}

	increment() {
		this.loopIndex++;
	}

	reset() {
		this.loopIndex = 0;
	}
}

module.exports = Loop;