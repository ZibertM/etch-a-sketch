const canvas = document.querySelector('#canvas');
const toggleDrawButton = document.querySelector('#toggle-draw-button');
const clearCanvasButton = document.querySelector('#clear-canvas-button');
const colorPicker = document.querySelector('#color-picker')
const randomButton = document.querySelector('#random-button');
const rainbowButton = document.querySelector('#rainbow-button');
const backgroundColorPicker = document.querySelector('#background-color-picker');
const backgroundColorButton = document.querySelector('#background-color-button');
const sizeSlider = document.querySelector('#size-slider');
const toggleCircleSquareButton = document.querySelector('#toggle-circle-square');
const sliderValue = document.querySelector('#slider-value');
const title = document.querySelector('h1');

let pixels = createCanvas(sizeSlider.value);


colorPicker.value = randomColor();
let color = colorPicker.value;
title.style.color = color;
sliderValue.innerHTML = `<span style="font-size: 22px; font-weight: bold:">${sizeSlider.value}</span> X <span style="font-size: 22px; font-weight: bold:">${sizeSlider.value}</span>`;

backgroundColorPicker.value = randomColor();

let drawOption = 'hover';
let rainbow = false;
let isMouseDown = false;
let toggleCircle = 'square';


function createCanvas(size) {
    let cellsPerSide = size;
    let cellSize = canvas.clientHeight / cellsPerSide;
    for (let i = 0; i < cellsPerSide ** 2; i++) {
        const cell = document.createElement('div');
        cell.style.width = `${cellSize - 2}px`;
        cell.style.height = `${cellSize - 2}px`;
        cell.style.border = 'solid 1px rgba(0, 0, 0, 0.1';
        cell.className = 'cells';
        cell.dataset.state = '0'
        canvas.appendChild(cell);

        cell.addEventListener('mousemove', colorCells);
        
    }
    const cells = document.querySelectorAll('.cells');
    backgroundColorButton.addEventListener('click', () => {
        cells.forEach((cell) => {
            if (cell.dataset.state == '0')
            cell.style.backgroundColor = backgroundColorPicker.value;
        })
    })
    return cells;
}

function colorCells(e) {
    if (isMouseDown || drawOption === 'hover' ) {
        if (rainbow) {
            color = randomColor();
            e.target.style.backgroundColor = color;
            e.target.dataset.state = '1'
            title.style.color = color;

        }
        else {
            e.target.style.backgroundColor = color;
            e.target.dataset.state = '1';
        }
    }
}

toggleDrawButton.addEventListener('click', () => {
    if (drawOption === 'hover') {
        toggleDrawButton.innerHTML = '<span style="font-weight: bold; font-size: 24px;">Drag / </span><span style="font-size: 14px;">Hover</span>';
        color = colorPicker.value;
        drawOption = 'drag';
    } else {
        toggleDrawButton.innerHTML = '<span style="font-weight: bold; font-size: 24px;">Hover / </span><span style="font-size: 14px;">Drag</span>';
        color = colorPicker.value;
        drawOption = 'hover';
    }
});

canvas.addEventListener('mousedown', () => {
    isMouseDown = true;
});

canvas.addEventListener('mouseup', () => {
    isMouseDown = false;
});


clearCanvasButton.addEventListener('click', () => {
    pixels.forEach((pixel) => {
        pixel.style.backgroundColor = 'transparent';
        pixel.dataset.state = '0'
    })
})

colorPicker.addEventListener('change', () => {
    color = colorPicker.value;
    randomButton.style.backgroundColor = 'deepskyblue';
    title.style.color = color;

})

randomButton.addEventListener('click', (e) => {
    color = randomColor();
    colorPicker.value = color;
    rainbow = false;
    rainbowButton.style.backgroundColor = 'deepskyblue';
    e.target.style.backgroundColor = 'bisque';
    e.target.style.transition = 'background-color 0.5s ease';
    title.style.color = color;

})

function randomColor() {
    let colour;
    let rgbArray = [];
    for (let i = 0; i < 3; i++) {
        rgbArray[i] = Math.floor(Math.random() * 255);
        colour = rgbToHex(rgbArray);
    }
    return colour;
}

function rgbToHex(rgbArray) {
    let hexString = '#';
    rgbArray.forEach((item) => {
        hexString += item.toString(16).length == 2 ? item.toString(16) : '0' + item.toString(16);
    })
    return hexString;
}

rainbowButton.addEventListener('click', (e) => {
    if (!rainbow) {
        rainbow = true;
        e.target.style.backgroundColor = 'bisque';
        e.target.style.transition = 'background-color 0.5s ease';
        randomButton.style.backgroundColor = 'deepskyblue';
    }
    else {
        rainbow = false;
        e.target.style.backgroundColor = 'deepskyblue';
        color = colorPicker.value;
    }
})

backgroundColorPicker.addEventListener('change', () => {
    backgroundColor = backgroundColorPicker.value;
})

toggleCircleSquareButton.addEventListener('click', (e) => {
    if (toggleCircle == 'square') {
        canvas.style.borderRadius = '50%';
        toggleCircle = 'circle';
        toggleCircleSquareButton.innerHTML = '<span style="font-weight: bold; font-size: 24px;">Circle / </span><span style="font-size: 14px;">Square</span>';
    }
    else {
        canvas.style.borderRadius = '8px';
        toggleCircle = 'square';
        toggleCircleSquareButton.innerHTML = '<span style="font-weight: bold; font-size: 24px;">Square / </span><span style="font-size: 14px;">Circle</span>';
    }
})

sizeSlider.addEventListener('input', () => {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
    pixels = createCanvas(sizeSlider.value);
    sliderValue.innerHTML = `<span style="font-size: 22px; font-weight: bold:">${sizeSlider.value}</span> X <span style="font-size: 22px; font-weight: bold:">${sizeSlider.value}</span>`;
})

