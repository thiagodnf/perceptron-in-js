class Drawer{

    constructor(ctx) {
       this.ctx = ctx;
    }

    normalize(x, min, max, a, b){
        return (b - a) * ((x - min) / max - min) + a;
    }

    denormalize(y, min, max, a, b){
        return (((y - a)*(max - min))/(b - a)) + (min)
    }

    drawAxis(){
    
        this.drawLine(2, 1, 0, 1 - 0.025, 0.025 );
        this.drawLine(2, 1, 0, 1 - 0.025, -0.025 );

        for(var i = -1; i <= 0.9; i += 0.1){
            this.drawLine(1, -0.01, i, 0.01, i);
            this.drawDashedLines(0.2, -1, i, 1, i);
        }

        for(var i = -1; i <= 0.9; i += 0.1){
            this.drawLine(1, i,-0.01, i, 0.01);
            this.drawDashedLines(0.2, i, -1, i, 1);
        }

        // Draw axis
        this.drawLine(2, 0, -1, 0, 1);
        this.drawLine(2, -1, 0, 1, 0);

        //Draw arrows
        this.drawLine(2, 0, 1, 0.025, 1-0.025);
        this.drawLine(2, 0, 1, -0.025, 1-0.025);

        this.drawText("y", 0.05, 1-0.05)
        this.drawText("x", 1-0.04, -0.08)
    }

    drawCircle(point) {
        
        var x = this.denormalize(point.x, 0, dim.width, -1, 1);
        var y = this.denormalize(point.y, 0, dim.height, 1, -1);
    
        this.ctx.beginPath();
        this.ctx.arc(x, y, 10, 0, 2 * Math.PI, true);
    
        this.ctx.fillStyle = "#434348";
    
        if(perceptron.isReady()){
    
            var output = perceptron.classify(point);
    
            if(output == point.type){
                this.ctx.fillStyle = "#7cb5ec";
            }else{
                this.ctx.fillStyle = "#f45b5b";
            }
        }
    
        this.ctx.fill();
    }
    
    drawRectangle(point) {

        var x = this.denormalize(point.x, 0, dim.width, -1, 1);
        var y = this.denormalize(point.y, 0, dim.height, 1, -1);

        this.ctx.beginPath();
        this.ctx.rect(x-10, y-10, 20, 20);
        
        this.ctx.fillStyle = "#434348";
    
        if(perceptron.isReady()){
            
            var output = perceptron.classify(point);
    
            if(output == point.type){
                this.ctx.fillStyle = "#90ed7d";
            }else{
                this.ctx.fillStyle = "#f45b5b";
            }
        }
    
        ctx.fill();
    }

    drawDashedLines(width, x1, y1, x2, y2){

        var x1 = this.denormalize(x1, 0, dim.width, -1, 1);
        var y1 = this.denormalize(y1, 0, dim.height, 1, -1);

        var x2 = this.denormalize(x2, 0, dim.width, -1, 1);
        var y2 = this.denormalize(y2, 0, dim.height, 1, -1);

        this.ctx.beginPath();
        this.ctx.setLineDash([3]);
        this.ctx.lineWidth = width;
        this.ctx.strokeStyle = "#D3D3D3";
        this.ctx.moveTo(x1,y1);
        this.ctx.lineTo(x2,y2);
        this.ctx.stroke();
    }
    
    drawLine(width, x1, y1, x2, y2){

        var x1 = this.denormalize(x1, 0, dim.width, -1, 1);
        var y1 = this.denormalize(y1, 0, dim.height, 1, -1);

        var x2 = this.denormalize(x2, 0, dim.width, -1, 1);
        var y2 = this.denormalize(y2, 0, dim.height, 1, -1);

        this.ctx.beginPath();
        this.ctx.setLineDash([]);
        this.ctx.lineWidth = width;
        this.ctx.strokeStyle = "#434348";
        this.ctx.moveTo(x1,y1);
        this.ctx.lineTo(x2,y2);
        this.ctx.stroke();
    }

    drawText(text, x, y){

        x = this.denormalize(x, 0, dim.width, -1, 1);
        y = this.denormalize(y, 0, dim.height, 1, -1);

        this.ctx.beginPath();
        this.ctx.fillStyle = "#434348";
        this.ctx.font = "20px Arial";
        this.ctx.fillText(text, x, y);
    }
}