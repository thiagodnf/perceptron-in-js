const btnAddCircle = document.getElementById('btn-add-circle');
const btnAddSquare = document.getElementById('btn-add-square');
const btnAutoTraining = document.getElementById('auto-training');
const btnTrain = document.getElementById('train');
const sidebarPanel = document.getElementById('sidebar');

const learningRate = document.getElementById("learning-rate");
const maxIterations = document.getElementById("max-iterations");

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let perceptron = new Perceptron();
let drawer = new Drawer(ctx);
let pos = { x: 0, y: 0 }
let autoTraining = false;
let type = 1;
let points = [];

function gameLoop() {

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawer.drawAxis();

    for (const point of points) {

        if (point.type == 1) {
            drawer.drawCircle(point);
        } else {
            drawer.drawRectangle(point);
        }
    }

    let x1 = -1.0
    let y1 = perceptron.guessY(x1)

    let x2 = 1.0
    let y2 = perceptron.guessY(x2)

    if (perceptron.isReady()) {
        drawer.drawLine(1, x1, y1, x2, y2);
    }

    if (autoTraining) {
        perceptron.setLearningRate(learningRate.value)
        perceptron.setCountIterations(maxIterations.value)
        perceptron.setMaxIterations(maxIterations.value)
        perceptron.train(points);
    }

    window.requestAnimationFrame(gameLoop);
}

function resizeWindow() {

    const height = window.innerHeight - canvas.getBoundingClientRect().top - 25;

    canvas.width = canvas.clientWidth;
    canvas.height = height;

    sidebarPanel.style.height = height + "px";
}

document.addEventListener("DOMContentLoaded", function () {

    canvas.addEventListener("click", function (event) {

        let rect = canvas.getBoundingClientRect();

        pos = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };

        // Normalize values;

        pos.x = drawer.normalize(pos.x, 0, ctx.canvas.width, -1, 1);
        pos.y = drawer.normalize(pos.y, 0, ctx.canvas.height, 1, -1);

        points.push(new Point(pos.x, pos.y, type));
    });

    btnAddCircle.addEventListener("click", function (event) {
        type = 1;
    });

    btnAddSquare.addEventListener("click", function (event) {
        type = -1;
    });

    btnAutoTraining.addEventListener("click", function (event) {

        autoTraining = btnAutoTraining.checked;

        document.querySelectorAll(".form-disable").forEach(el => {
            el.disabled = autoTraining;
        });
    });

    btnTrain.addEventListener("click", function (event) {

        perceptron.reset();
        perceptron.setLearningRate(learningRate.valueAsNumber)
        perceptron.setMaxIterations(maxIterations.valueAsNumber)
        perceptron.trainWithIterations(points);
    });

    window.addEventListener("resize", resizeWindow);
    window.dispatchEvent(new Event("resize"));

    document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => {
        new bootstrap.Popover(el);
    });

    gameLoop();
});
