const btnAddCircle = document.getElementById('btn-add-circle');
const btnAddSquare = document.getElementById('btn-add-square');
const btnAutoTraining = document.getElementById('auto-training');
const btnTrain = document.getElementById('train');
const sidebarPanel = document.getElementById('sidebar');

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

    $.each(points, function (index, point) {

        if (point.type == 1) {
            drawer.drawCircle(point);
        } else {
            drawer.drawRectangle(point);
        }
    })

    let x1 = -1.0
    let y1 = perceptron.guessY(x1)

    let x2 = 1.0
    let y2 = perceptron.guessY(x2)

    if (perceptron.isReady()) {
        drawer.drawLine(1, x1, y1, x2, y2);
    }

    if (autoTraining) {
        perceptron.setLearningRate(parseFloat($("#learning-rate").val()))
        perceptron.setCountIterations(parseInt($("#max-iterations").val()))
        perceptron.setMaxIterations(parseInt($("#max-iterations").val()))
        perceptron.train(points);
    }

    window.requestAnimationFrame(gameLoop);
}

function resizeWindow() {

    let canvasWidth = $(".col-lg-9").width();
    let canvasHeight = $(window).height() - $("#canvas").offset().top - 25;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    sidebarPanel.style.height = canvasHeight + "px";
}

document.addEventListener("DOMContentLoaded", function () {

    canvas.addEventListener("click", function (event) {

        let rect = canvas.getBoundingClientRect();

        pos = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };

        console.log(pos)

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

        autoTraining = $(this).is(':checked');

        if (autoTraining) {
            $(".form-disable").prop("disabled", "disabled");
        } else {
            $(".form-disable").prop("disabled", "");
        }
    });

    btnTrain.addEventListener("click", function (event) {
        perceptron.reset();
        perceptron.setLearningRate(parseFloat($("#learning-rate").val()))
        perceptron.setMaxIterations(parseInt($("#max-iterations").val()))
        perceptron.trainWithIterations(points);
    });

    window.addEventListener("resize", resizeWindow);
    window.dispatchEvent(new Event("resize"));

    gameLoop();
});
