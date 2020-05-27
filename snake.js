function init(){
    canvas = document.getElementById('mycanvas');
    W  = canvas.width = 1500; 
    H = canvas.height = 680;
    pen = canvas.getContext('2d');
    cs = 30;
    gameover  = false;
    score = 4;
 
    food_img  = new Image();
    food_img.src = "Assets/apple.png";

    score_img = new Image();
    score_img.src = "Assets/trophy.png";

    food = getRandomFood();

    snake = {
        len: 4,
        color: "blue",
        cells: [],
        direction: "right",

        createSnake:function(){
            for(var i=this.len;i>0;i--)
            {
                this.cells.push({x:i+2,y:3});
            }
        },
        drawSnake:function(){
            for(var i=0;i<this.cells.length;i++)
            {
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
            }
        },
        updateSnake:function(){

            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            if(headX==food.x && headY==food.y)
            {
                food = getRandomFood();
                score++;
            }
            else
            {     
                this.cells.pop();
            }

            if(this.direction=="right")
            {
                X = headX + 1;
                Y = headY;
            }
            else if(this.direction=="left")
            {
                X = headX - 1;
                Y = headY;
            }
            else if(this.direction=="down")
            {
                X = headX;
                Y = headY + 1;
            }
            else
            {
                X = headX;
                Y = headY - 1;    
            }
            this.cells.unshift({x:X,y:Y});

            var lastX = Math.round(W/cs);
            var lastY = Math.round(H/cs);

            if(this.cells[0].x<0 || this.cells[0].y<0 || this.cells[0].x>lastX || this.cells[0].y>lastY)
            {
                gameover = true;
            }

            for(var i=3; i<this.cells.length;i++)
            {
                if(this.cells[0].x==this.cells[i].x && this.cells[0].y==this.cells[i].y)
                {
                    gameover = true;
                }
            }
        }
    };
    snake.createSnake();

    function keyPressed(e){
        if(e.key=="ArrowRight"){
            if(snake.direction!="left")
            {
                snake.direction = "right";
            } 
        }
        else if(e.key=="ArrowLeft"){
            if(snake.direction!="right")
            {
                snake.direction = "left";
            } 
        }
        else if(e.key=="ArrowDown"){
            if(snake.direction!="up")
            {
                snake.direction = "down";
            } 
        }
        else{
            if(snake.direction!="down")
            {
                snake.direction = "up";
            } 
        }
    }

    document.addEventListener("keydown",keyPressed);

}

function draw(){
    pen.clearRect(0,0,W-1,H-1);
    snake.drawSnake();
    pen.fillStyle = food.color;
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
    pen.drawImage(score_img,20,20,cs,cs);
    pen.fillStyle = "blue";
    pen.font = "25px Roboto";
    pen.fillText(score,60,45)
}

function update(){
    snake.updateSnake();
}

function getRandomFood(){
    var foodX = Math.round(Math.random()*(W-cs)/cs);
    var foodY = Math.round(Math.random()*(H-cs)/cs);
    var food = {
        x:foodX,
        y:foodY,
        color:"red"
    }
    return food;
}

function gameloop(){
    if(gameover==true)
    {
        clearInterval(f);
        alert("Game Over");
        return;
    }
    draw();
    update();
}

init();
var f = setInterval(gameloop,100);
