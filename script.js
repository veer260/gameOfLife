const myCanvas = document.getElementById("my-canvas");
const ctx = myCanvas.getContext("2d");

const resolution = 10;
myCanvas.height = 520;
myCanvas.width = 520;

const ROWS = myCanvas.height / resolution;
const COLS = myCanvas.width / resolution;

function buildGrid() {
  return new Array(ROWS).fill(null).map(() => {
    return new Array(COLS).fill(null).map(() => {
      return Math.floor(Math.random() * 3) == 1 ? 1 : 0;
    });
  });
}

let grid = buildGrid();

render(grid);

function nextGenerate(grid) {
  let nextGrid = grid.map((arr) => [...arr]);

  for (let i = 0; i < Math.floor(myCanvas.height / resolution); i++) {
    for (let j = 0; j < Math.floor(myCanvas.width / resolution); j++) {
      // console.log(`indexes ${i} ${j}`);
      let neighbours = 0;
      for (let m = i - 1; m < i + 2; m++) {
        for (let n = j - 1; n < j + 2; n++) {
          if (
            m >= 0 &&
            m < Math.floor(myCanvas.height / resolution) &&
            n >= 0 &&
            n < Math.floor(myCanvas.width / resolution)
          ) {
            if (m == i && j == n) {
              continue;
            }
            neighbours += grid[m][n];
          }
        }
      }

      if (neighbours < 2 && grid[i][j] == 1) {
        nextGrid[i][j] = 0;
      } else if (neighbours > 3 && grid[i][j] == 1) {
        nextGrid[i][j] = 0;
      } else if (neighbours == 3 && grid[i][j] == 0) {
        nextGrid[i][j] = 1;
      }

      // console.log(grid[Math.floor([i / 40])][Math.floor([j / 40])]);
    }
  }

  return nextGrid;
}

// console.log(nextGrid);

let id;

function update() {
  grid = nextGenerate(grid);
  render(grid);
  id = requestAnimationFrame(update);
}

const handleStart = () => {
  // console.log("clicked");/
  update();
};

const handleStop = () => {
  cancelAnimationFrame(id);
};

const handleRestart = () => {
  grid = buildGrid();
  render(grid);
};

// grid = nextGenerate(grid);

// render();
function render() {
  for (let i = 0; i < myCanvas.height; i = i + resolution) {
    for (let j = 0; j < myCanvas.width; j = j + resolution) {
      // console.log(grid[Math.floor([i / 40])][Math.floor([j / 40])]);
      ctx.beginPath();
      ctx.rect(i, j, resolution, resolution);
      ctx.fillStyle =
        grid[Math.floor(i / resolution)][Math.floor(j / resolution)] == 1
          ? "deeppink"
          : "white";
      ctx.fill();

      ctx.lineWidth = 0.2;
      ctx.strokeStyle = "grey";

      ctx.stroke();
    }
  }
}
console.log(grid);
