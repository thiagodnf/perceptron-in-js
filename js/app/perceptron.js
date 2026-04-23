class Perceptron{

    constructor() {
        this.reset();
    }

    getRandomDouble(min, max) {
        return (Math.random() * max) + min;
    }

    trainWithIterations(points) {

		do  {
            this.train(points);
            
            this.countIteration++;

		} while(this.countIteration < this.maxIterations);
    }

    train(points){
        
        var that = this;

		$.each(points, function(index, point){

			var output = that.classify(point);
			var expected = point.type;

			if (output != expected) {

				that.updateWeightsAndBias(point, expected, output);
			}
        });
    }
    
    reset(){
        this.weights = [this.getRandomDouble(-1,1), this.getRandomDouble(-1,1)];
        this.lRate = 0.0002;
        this.bias = this.getRandomDouble(-1,1);
        this.countIteration = 0;
    }

    setLearningRate(lRate){
        this.lRate = lRate;
    }

    setCountIterations(countIteration){
        this.countIteration = countIteration;
    }

    setMaxIterations(maxIterations){
        this.maxIterations = maxIterations;
    }

    isReady(){
        return this.countIteration === this.maxIterations;
    }
	
	updateWeightsAndBias(point, expected, output) {

		var error = (expected - output);
        
        this.weights[0] += (this.lRate * (error) * point.x);
        this.weights[1] += (this.lRate * (error) * point.y);

		this.bias += this.lRate * error;
	}
	
	classify(point) {

		var result = 0.0;

        result += point.x * this.weights[0];
        result += point.y * this.weights[1];

		result += this.bias;

		if (result >= 0) {
			return 1;
		}

		return -1;
    }
    
    guessY(x){

        var w0 = this.weights[0];
        var w1 = this.weights[1];
        var w2 = this.bias;

        return -(w2 / w1) - (w0 / w1) * x;
    }


}