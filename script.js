const canvas = document.querySelector('#canvas');
const toggleDrawButton = document.querySelector('#toggle-draw-button');
const clearCanvasButton = document.querySelector('#clear-canvas-button');
const colorPicker = document.querySelector('#color-picker')
const randomButton = document.querySelector('#random-button');

let color = colorPicker.value;
let drawOption = 'hover';

const pixels = createCanvas();
let isMouseDown = false;

function createCanvas(size = 40) {
    let cellsPerSide = 40;
    let cellSize = canvas.clientHeight / cellsPerSide;
    for (let i = 0; i < cellsPerSide ** 2; i++) {
        const cell = document.createElement('div');
        cell.style.width = `${cellSize - 2}px`;
        cell.style.height = `${cellSize - 2}px`;
        cell.style.border = 'solid 1px black';
        cell.style.borderRadius = '2px';
        cell.className = 'cells';
        //cell.style.backgroundColor = 'white';
        canvas.appendChild(cell);
    }
    const cells = document.querySelectorAll('.cells');
    return cells;
}

function colorCells(e) {
    if (isMouseDown || drawOption === 'hover') {
        e.target.style.backgroundColor = color;
    }
}

toggleDrawButton.addEventListener('click', () => {
    if (drawOption === 'hover') {
        toggleDrawButton.textContent = 'Drag draw';
        color = colorPicker.value;
        toggleDrawButton.style.color = color;
        drawOption = 'drag';
    } else {
        toggleDrawButton.textContent = 'Hover draw';
        color = colorPicker.value;
        toggleDrawButton.style.color = color;
        drawOption = 'hover';
    }
});

canvas.addEventListener('mousedown', () => {
    isMouseDown = true;
});

canvas.addEventListener('mouseup', () => {
    isMouseDown = false;
});

pixels.forEach((pixel) => {
    pixel.addEventListener('mousemove', colorCells);
});

clearCanvasButton.addEventListener('click', () => {
    pixels.forEach((pixel) => {
        pixel.style.backgroundColor = 'transparent';
    })
})

colorPicker.addEventListener('change', () => {
    color = colorPicker.value;
    console.log(colorPicker.value);
})

randomButton.addEventListener('click', () => {
    let rgbArray = [];
    for (let i = 0; i < 3; i++) {
        rgbArray[i] = Math.floor(Math.random() * 256);
        color = rgbToHex(rgbArray);
    }
})

function rgbToHex(rgbArray) {
    let hexString = '#';
    rgbArray.forEach((item) => {
        hexString += item.toString(16);
    })
    console.log(hexString);
    return hexString;
}