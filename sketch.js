let ball_startx, ball_starty, paddle_startx;
let ball_x, ball_y, ball_dx, ball_dy, ball_dia;
let paddle_x, paddle_y, paddle_width, paddle_height, paddle_dx;
let grid = [];
let score = 0;
let lives = 3;
let game_paused = true;

function setup() {
  createCanvas(400, 400);
  stroke("red");
  fill("white");

  ball_dia = 22;

  //start position
  ball_startx = width / 2;
  ball_starty = height - 10 - ball_dia;
  paddle_startx = width / 2 - 80 / 2;

  //circle(100, 100, 50);
  ball_x = ball_startx;
  ball_y = ball_starty;
  ball_dx = 5;
  ball_dy = -5;

  ball_bottom = ball_y + ball_dia / 2;
  ball_top = ball_y - (ball_dia - 2);
  ball_right = ball_x + ball_dia / 2;
  ball_left = ball_x - ball_dia / 2;

  //paddle
  fill("blue");
  paddle_width = 80;
  paddle_height = 15;
  paddle_x = paddle_startx;
  paddle_y = height - 20;
  paddle_dx = 5;
  brick_count = 0;

  // fill("white")
  for (let i = 0; i < 6; i++) {
    let row = [];
    for (let j = 0; j < 4; j++) {
      let brick = [];
      brick["x"] = 10 + i * 65;
      brick["y"] = 40 + j * 30;
      brick["w"] = 55;
      brick["h"] = 15;
      brick["v"] = true;
      row.push(brick);
      rect(brick.x, brick.y, brick.w, brick.y);
      brick_count += 1;
    }
    grid.push(row);
  }
}

function draw() {
  background("black");
  ball_x += ball_dx;
  ball_y += ball_dy;
  ball_bottom = ball_y + ball_dia / 2;
  ball_top = ball_y - (ball_dia - 2);
  ball_right = ball_x + ball_dia / 2;
  ball_left = ball_x - ball_dia / 2;

  fill("blue");
  circle(ball_x, ball_y, ball_dia);
  fill("yellow");
  rect(paddle_x, paddle_y, paddle_width, paddle_height);
  text("Score : " + score, width - 100, 20);
  text("Lives : " + lives, 20, 20);

  fill("white");
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 4; j++) {
      if (grid[i][j].v) {
        rect(grid[i][j].x, grid[i][j].y, grid[i][j].w, grid[i][j].h);
        brick_collision(grid[i][j]);
      }
    }
  }

  paddle_interaction();
  ball_wall();

  if (brick_count == 0) {
    background("black");
    fill("Green");
    text("Congrats You win!!!", width / 2 - 50, height / 2);
    text("Final Score: " + score, width / 2 - 42, height / 2 + 25);
    text("Restart The Game", width / 2 - 50, height / 2 + 50);
  }

  if (lives == 0) {
    background("black");
    fill("red");
    text("Game Over!!", width / 2 - 50, height / 2);
    text("Final Score: " + score, width / 2 - 55, height / 2 + 25);
    text("Press Space Bar to get another Chance", width / 2 - 105, height / 2 + 50);
    live=3; 
    game_paused=true;   

    //   
  }
}

function ball_wall() {
  if (
    ball_bottom > paddle_y &&
    ball_left > paddle_x &&
    ball_right < paddle_x + paddle_width
  ) {
    ball_dy = -ball_dy;
  }

  if (ball_right >= width || ball_left <= 0) {
    ball_dx = -ball_dx;
  }
  if (ball_top <= 0) {
    ball_dy = -ball_dy;
  }
  if (ball_bottom >= height) {
    game_life_down();
  }
}

function brick_collision(brick) {
  brick_top = brick.y;
  brick_bottom = brick.y + brick.h;
  brick_right = brick.x + brick.w;
  brick_left = brick.x;

  // brick collision bottom
  if (
    ball_top <= brick_bottom &&
    ball_top >= brick_top &&
    ball_right >= brick_left &&
    ball_left <= brick_right
  ) {
    ball_dy = -ball_dy;
    brick.h = 0;
    brick.w = 0;
    brick.v = false;
    score += 1;
    brick_count -= 1;
  }

  // brick collision top
  if (
    ball_bottom >= brick_top &&
    ball_bottom <= brick_bottom &&
    ball_x >= brick_left &&
    ball_x <= brick_right
  ) {
    ball_dy = -ball_dy;
    brick.h = 0;
    brick.w = 0;
    brick.v = false;
    score += 1;
    brick_count -= 1;
  }

  // brick collision left
  if (
    ball_y <= brick_bottom &&
    ball_y >= brick_top &&
    ball_right >= brick_left &&
    ball_right <= brick_right
  ) {
    ball_dx = -ball_dx;
    brick.h = 0;
    brick.w = 0;
    brick.v = false;
    score += 1;
    brick_count -= 1;
  }

  // brick collision right
  if (
    ball_y <= brick_bottom &&
    ball_y >= brick_top &&
    ball_left <= brick_left &&
    ball_left >= brick_right
  ) {
    ball_dx = -ball_dx;
    brick.h = 0;
    brick.w = 0;
    brick.v = false;
    score += 1;
    brick_count -= 1;
  }
}

function paddle_interaction() {
  if (keyIsDown(RIGHT_ARROW)) {
    if (paddle_x + paddle_width == width) {
      paddle_dx = 0;
    } else paddle_dx = 5;
    paddle_x += paddle_dx;
    if (game_paused) {
      ball_x += paddle_dx;
    }
  }
  if (keyIsDown(LEFT_ARROW)) {
    if (paddle_x == 0) {
      paddle_dx = 0;
    } else paddle_dx = 5;
    paddle_x -= paddle_dx;
    if (game_paused) {
      ball_x -= paddle_dx;
    }
  }
}

function game_life_down() {
  ball_x = ball_startx; 
  ball_y = ball_starty;
  paddle_x = paddle_startx;
  ball_dx = 0;
  ball_dy = 0;
  lives -= 1;
  game_paused = true; 
}

function keyPressed() {
  if (key == " ") {
    //this means space bar, since it i   s a space inside of the single quotes
    if (game_paused ||lives<=0 ) {
      if(lives<1){
        lives=3 ;
        score=0; 
      }
         
      ball_dx = 5;
      ball_dy = -4;
      game_paused = false;
    }
  }
}
