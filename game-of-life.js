function GameOfLife(cells) {
	this.width = 300;
	this.height = 300;
	this.depth = 300;
	this.cells = cells;
}

GameOfLife.prototype.cells = function() {
	return this.cells;
};

GameOfLife.prototype.nextGeneration = function() {
	this.cells = [];
	for (var i = 0; i < 300; i++) {
		this.cells.push([Math.random() * this.width, Math.random() * this.height, Math.random() * this.depth])
	}
};