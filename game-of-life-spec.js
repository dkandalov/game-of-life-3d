describe("In Conway's game of life: ", function () {
	var cell = newCell(100, 100, 100);

	it("live cell with not enough neighbours dies", function () {
		var cells = new GameOfLife([cell]).nextGeneration().cells;
		expect(cells).toEqual([]);
	});

	it("live cell with enough neighbours stays alive", function () {
		var cells = new GameOfLife(withNeighbours(8, cell)).nextGeneration().cells;
		expect(includes(cell, cells)).toBe(true);
	});

	it("live cell with too many neighbours dies", function () {
		var cells = new GameOfLife(withNeighbours(13, cell)).nextGeneration().cells;
		expect(includes(cell, cells)).toBe(false);
	});

	it("dead cell with enough neighbours becomes alive", function () {
		var cells = new GameOfLife(neighboursOf(cell).slice(0, 10)).nextGeneration().cells;
		expect(includes(cell, cells)).toBe(true);
	});

	it("cell should have 26 neighbors in 3d space", function () {
		expect(neighboursOf(cell).length).toEqual(26);
	});

	function withNeighbours(numberOfNeighbours, cell) {
		var result = neighboursOf(cell).slice(0, numberOfNeighbours);
		result.push(cell);
		return result;
	}
});