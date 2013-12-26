function GameOfLife(cells, settings) {
	this.width = settings.width;
	this.height = settings.height;
	this.depth = settings.depth;
	this.cells = this.clipToSize(cells);
}

GameOfLife.prototype.nextGeneration = function() {
	var newCells = [];

	var cells = this.cells;
	var isAlive = function(cell) { return includes(cell, cells); };
	var isDead = function(cell) { return !isAlive(cell); };

	this.cells.forEach(function(cell) {
		var liveNeighbours = findAll(neighboursOf(cell), isAlive);
		if (liveNeighbours.length >= 8 && liveNeighbours.length <= 12)
			newCells.push(cell);

		var deadNeighbours = findAll(neighboursOf(cell), isDead);
		deadNeighbours.forEach(function(cell) {
			var liveNeighbours = findAll(neighboursOf(cell), isAlive);
			if (liveNeighbours.length == 10)
				newCells.push(cell);
		});
	});

	this.cells = this.clipToSize(unique(newCells));
	return this;
};

GameOfLife.prototype.clipToSize = function(cells) {
	for (var i = 0; i < cells.length; i++) {
		var cell = cells[i];
		if (cell.x < 0) cell.x = this.width + cell.x;
		if (cell.y < 0) cell.y = this.height + cell.y;
		if (cell.z < 0) cell.z = this.depth + cell.z;
		if (cell.x >= this.width) cell.x = cell.x - this.width;
		if (cell.y >= this.height) cell.y = cell.y - this.height;
		if (cell.x >= this.depth) cell.z = cell.z - this.depth;
	}
	return cells;
};

function unique(cells) {
	var result = [];
	for (var i = 0; i < cells.length; i++) {
		if (!includes(cells[i], result))
			result.push(cells[i]);
	}
	return result;
}

function newCell(x, y, z) {
	return {x: x, y: y, z: z};
}

function findAll(array, predicate) {
	var result = [];
	for (var i = 0; i < array.length; i++) {
		if (predicate(array[i]))
			result.push(array[i]);
	}
	return result;
}

function includes(cell, cells) {
	for (var i = 0; i < cells.length; i++) {
		if (cells[i].x == cell.x && cells[i].y == cell.y && cells[i].z == cell.z)
			return true;
	}
	return false;
}

function neighboursOf(cell) {
	var result = [];
	for (var dx = -1; dx < 2; dx++) {
		for (var dy = -1; dy < 2; dy++) {
			for (var dz = -1; dz < 2; dz++) {
				if (dx != 0 || dy != 0 || dz != 0) {
					result.push(newCell(cell.x + dx, cell.y + dy, cell.z + dz));
				}
			}
		}
	}
	return result;
}

function stringPatternToCells(startCell, pattern) {
	var result = [];

	pattern = pattern.replace(/[ \t]/g, "").trim();
	var lines = pattern.split("\n");
	for (var dy = 0; dy < lines.length; dy++) {
		var line = lines[dy];
		for (var dx = 0; dx < line.length; dx++) {
			var symbol = line[dx];
			if (symbol == "x") {
				result.push(newCell(startCell.x + dx, startCell.y - dy, startCell.z));
			}
		}
	}
	return result;
}

function copyCellsInDepth(depth, cells) {
	var result = [];
	for (var dz = 0; dz < depth; dz++) {
		cells.forEach(function (cell) {
			result.push(newCell(cell.x, cell.y, cell.z + dz));
		});
	}
	return result;
}