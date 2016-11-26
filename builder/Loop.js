
class Loop {

	constructor() {
		this.loopIndex = 1;
		this.loopLength = 1;
	}

	isCompleted() {
		return !(this.loopLength > this.loopIndex);
	}
}

module.exports = Loop;