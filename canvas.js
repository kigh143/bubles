const canvas = document.querySelector("#canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const context = canvas.getContext("2d");
const colors = ["#133046", "#15959f", "#f4a090", "#f26144", "#f1e4b3"];
const team = ["images/ivan.jpg", "images/t1.jpg",];

var mousePos ={
    x:undefined,
    y:undefined
}
var maxRadius = 40;
var minRadius = 4;
var cirdleArray = [];
var imgSrc ="ivan.jpg";

window.addEventListener("mousemove", function(event){
    mousePos.x = event.x;
    mousePos.y= event.y;
});

window.addEventListener("resize", function(event){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    init()
});


function Circle(x, y, dy, dx, radius, color){
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colors[ Math.floor(Math.random() * colors.length)];
    this.member = team[ Math.floor(Math.random() * colors.length)]

    this.draw = function () {

        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        context.fillStyle =  this.color;
        context.fill()
    };

    this.update = function () {
        if( this.x+radius > innerWidth || this.x- this.radius < 0) {
            this.dx = - this.dx;
        }
    
        if( this.y+radius > innerHeight || this.y-radius < 0) {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;
        
        //interactivity with the mouse
        if(mousePos.x-this.x < 50 && mousePos.x-this.x > -50  && mousePos.y-this.y <50 && mousePos.y-this.y > -50){
            if(this.radius < maxRadius ){
                this.radius +=1;

            }
        }else  if( this.radius > this.minRadius){
           this.radius -=1;

        }

        this.draw();
    }

}




function init(){
    cirdleArray = [];    
    for ( let i =0; i < 800; i ++ ){
        var radius  = (Math.random() *3) +1
        var x =  Math.random() * (innerWidth - radius*2) +radius;
        var y =  Math.random() * (innerHeight -radius*2) +radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        cirdleArray.push(new Circle(x, y, dx, dy, radius));
    }
}


function animate(){   
    requestAnimationFrame( animate );
    context.clearRect(0, 0, innerWidth, innerHeight);
    for ( let i =0; i < cirdleArray.length; i ++ ){
        cirdleArray[i].update();
    }
}

animate();
init();


