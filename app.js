const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const fill = document.getElementById("jsMode");
const present = document.getElementsByClassName("jsPresent");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let fillingAll = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseUp(event) {
    stopPainting();
}

function handleColorClick(event) {
    const background = event.target.style.backgroundColor;
    if (!fillingAll) {
        ctx.strokeStyle = background;
        present[0].style.backgroundColor = background;
    }
    else {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, 700, 700);
        endFill();
    }
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function endFill() {
    fill.textContent = "FILL";
    fillingAll = false;
}

function handleFill() {
    if (!fillingAll) {
        fill.textContent = "Paint";
        fillingAll = true;
    }
    else {
        fill.textContent = "FILL";
        fillingAll = false;
    }
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

range.addEventListener("input", handleRangeChange);

fill.addEventListener("click", handleFill);