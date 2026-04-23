
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame            || 
            window.webkitRequestAnimationFrame      || 
            window.mozRequestAnimationFrame         || 
            window.oRequestAnimationFrame           || 
            window.msRequestAnimationFrame          || 
            function(callback, element){
                window.setTimeout(function(){
                    callback(+new Date);
                }, 1000 / 60);
            };
})();

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d');
var perceptron = new Perceptron();
var drawer = new Drawer(ctx);
var pos = {x: 0, y: 0}
var dim = {weight: 0, height: 0}
var autoTraining = false;
var type = 1;
var points = [];

function gameLoop() {

    window.requestAnimationFrame(gameLoop);

    ctx.canvas.width  = dim.width;
    ctx.canvas.height  = dim.height;

    // // Clear the screen
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, dim.width, dim.height);

    drawer.drawAxis();
    
    $.each(points, function(index, point){
        
        if(point.type == 1){
            drawer.drawCircle(point);
        }else{
            drawer.drawRectangle(point);
        }
    })

    var x1 = -1.0
    var y1 = perceptron.guessY(x1)

    var x2 = 1.0
    var y2 = perceptron.guessY(x2)

    if(perceptron.isReady()){
        drawer.drawLine(1, x1, y1, x2, y2);
    }

    if(autoTraining){
        perceptron.setLearningRate(parseFloat($("#learning-rate").val()))
        perceptron.setCountIterations(parseInt($("#max-iterations").val()))
        perceptron.setMaxIterations(parseInt($("#max-iterations").val()))
        perceptron.train(points);
    }
}

function train(){

    perceptron.reset();
    perceptron.setLearningRate(parseFloat($("#learning-rate").val()))
    perceptron.setMaxIterations(parseInt($("#max-iterations").val()))
    perceptron.trainWithIterations(points);
}

function showText(message){
    
    var notification = document.querySelector('.mdl-js-snackbar');
    
    var data = {
        message: message,
        actionHandler: function(event) {
            notification.MaterialSnackbar.cleanup_()
        },
        actionText: 'Close',
        timeout: 2000
    };

    notification.MaterialSnackbar.showSnackbar(data);
}

$(function(){

    dim = {
        width: $(".container").width(),
        height: $(window).height() - $("#canvas").offset().top - 20
    }
    
    $("#canvas").click(function(event){
        
        var rect = canvas.getBoundingClientRect();

        pos = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };

        // Normalize values;

        pos.x = drawer.normalize(pos.x, 0, dim.width, -1, 1);
        pos.y = drawer.normalize(pos.y, 0, dim.height, 1, -1);

        points.push(new Point(pos.x, pos.y, type));
    })


    $('#auto-training').click(function(){
        autoTraining = $(this).is(':checked');

        if(autoTraining){
            $(".form-disable").prop("disabled", "disabled");
        }else{
            $(".form-disable").prop("disabled", "");
        }
    });

    $("#circle").click(function(event){
        $("#square").removeClass("btn-success")
        $("#square").addClass("btn-outline-success")
        $(this).removeClass("btn-outline-primary")
        $(this).addClass("btn-primary")
       
        type = 1;
    })

    $("#square").click(function(event){
        $("#circle").removeClass("btn-primary")
        $("#circle").addClass("btn-outline-primary")
        $(this).removeClass("btn-outline-success")
        $(this).addClass("btn-success")

        type = -1;
    })

    $("#train").click(train)

    gameLoop();

    
})