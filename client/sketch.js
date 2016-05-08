sketch = function(p){

	p.setup = function(){
		p.createCanvas(200, 200);
		
	    p.background(255, 0, 0);

	};
	p.draw = function(){
		p.fill(255);
		if(p.mouseIsPressed){
			p.fill(0);
		}
		else{
			p.fill(255);
		}
		p.ellipse(p.mouseX, p.mouseY, 80, 80);
	}
};


