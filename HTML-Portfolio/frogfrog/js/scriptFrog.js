let score = 0; // Initialize score 
let lives = 3; // Set the initial number of lives 
let gameState = 'difficulty'; // as well as 'intro' or 'playing' or 'gameOver' or 'mamafly'
let difficulty = ''; // 'easy' or 'normal' or 'hard' 
let title = "Kill 'EM ALL"; // Title of game
let rules = "Catch the flies to score points!\nGolden fly: +2, and an extra life!\nRED fly: Beware of the RED flies... you DON'T want to know!\nBlack fly: Safe to eat!\nPress mouse to start."; // Rules - JA
let p = 560; // Healthbar length 

// Our frog
const frog = {
  body: {
    x: 320,
    y: 520,
    size: 150
  },
  tongue: {
    x: undefined,
    y: 480,
    size: 20,
    speed: undefined,
    state: "idle", // State can be: idle, outbound, inbound
    glove: false
  }
};

// Our fly
const fly = {
  x: 0,
  y: 200, // Will be random
  size: 10,
  speed: undefined,
  isGolden: false, // Determines if fly is golden
  isEvil: false // Determines if fly is evil
};

// Mamafly 
const mamafly = {
  x: undefined,
  y: undefined,
  size: 80,
  SpeedX: undefined,
  SpeedY: undefined,
  health: undefined,
  maxHealth: undefined,
  isActive: false
};

// Add difficulty button properties
const difficultyButtons = {
  easy: {
    x: 320,
    y: 160,
    width: 200,
    height: 60,
    color: '#90EE90', 
    hoverColor: '#50C878', 
    text: 'Easy'
  },
  normal: {
    x: 320,
    y: 240,
    width: 200,
    height: 60,
    color: '#87CEEB', 
    hoverColor: '#4169E1', 
    text: 'Normal'
  },
  hard: {
    x: 320,
    y: 320,
    width: 200,
    height: 60,
    color: '#FFB6C1',
    hoverColor: '#DC143C', 
    text: 'Hard'
  }
};

/**
 * Creates the canvas and initializes the fly
 */ 
function setup() {
  console.log("Setup function is being called"); // Debugging line
  console.log('Type of createCanvas:', typeof createCanvas);
  let canvas;
  try {
    canvas = createCanvas(640, 480);
    console.log('Canvas object:', canvas); // Check if the element is accessible
    canvas.parent('frog-game-container'); // Attach the canvas to the container in Slide 1
  } catch (error) {
      console.error('Error during createCanvas:', error);
  }
  resetFly();
}

/**
 * Draws everything on canvas
 */
function draw() {
  background(200);
  if (gameState === 'difficulty') {
    displayDifficultySelection();
  } else if (gameState === 'intro') {
      displayIntro();
  } else if (gameState === 'playing') {
      normalGameplay();
// Check if score reaches 25 to trigger mamafly battle
      if (score >= 25 && !mamafly.isActive) {
        gameState = 'mamafly';
        spawnMamafly();
      }
    } else if (gameState === 'mamafly') {
        mamaflyBattle();
    } else if (gameState === 'gameOver') {
        gameOver();
    }
}

/**
 * Add difficulty selection screen
 */ 
function displayDifficultySelection() {
  background('#A489A8');
  // Title
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(60);
  text('Select Difficulty', width/2, 80);
    
// Draw buttons
  Object.keys(difficultyButtons).forEach(level => {
    const btn = difficultyButtons[level];
    
// Check if mouse is over button
    const isHover = isMouseOverButton(btn);
    
// Draw button
    fill(isHover ? btn.hoverColor : btn.color);
    rectMode(CENTER);
    rect(btn.x, btn.y, btn.width, btn.height, 15); 
    
// Button text
    fill(isHover ? 255 : 0);
    textSize(30);
    text(btn.text, btn.x, btn.y);
        
// Add difficulty description
    textSize(16);
    fill(255);
    if (isHover) {
      let description = '';
      switch(level) {
        case 'easy':
        description = 'Slower Flies | Easier Boss';
        break;
        
        case 'normal':
        description = 'Standard Experience';
        break;
        
        case 'hard':
        description = 'Faster Flies | Tougher Boss';
        break;
      }
      text(description, width/2, 400);
    }
  });
}

/** 
 * Helper function to check if mouse is over button
 */
function isMouseOverButton(btn) {
  return mouseX > btn.x - btn.width/2 && 
    mouseX < btn.x + btn.width/2 && 
    mouseY > btn.y - btn.height/2 && 
    mouseY < btn.y + btn.height/2;
}

/** 
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
  if (gameState === 'difficulty') {
    Object.keys(difficultyButtons).forEach(level => {
    const btn = difficultyButtons[level];
    if (isMouseOverButton(btn)) {
      difficulty = level;
      setGameDifficulty(level);
      gameState = 'intro';
    }
    }); } else if (gameState === 'intro') {
      gameState = 'playing'; // Change state to playing when mouse is pressed
      }
  if (frog.tongue.state === "idle") {
    frog.tongue.state = "outbound";
  }
}

/**
 * Sets the game difficulty 
 */
function setGameDifficulty(level) {
  switch(level) {
    case 'easy': // Easy difficulty variables
      fly.speed = 2.5;
      frog.tongue.speed = 25;
      mamafly.health = 20;
      mamafly.SpeedX = 2;
      mamafly.SpeedY = 2;
      mamafly.maxHealth = 20;
      break;
            
    case 'normal': // Normal difficulty variables
      fly.speed = 3.5;
      frog.tongue.speed = 20;
      mamafly.health = 30;
      mamafly.SpeedX = 3;
      mamafly.SpeedY = 3;
      mamafly.maxHealth = 30;
      break;
            
    case 'hard': // Hard difficulty variables
      fly.speed = 4.5;
      frog.tongue.speed = 15;
      mamafly.health = 40;
      mamafly.SpeedX = 4;
      mamafly.SpeedY = 4;
      mamafly.maxHealth = 40;
      break;
    }
}

/**
 * Draw hearts for lives 
 * Used ChatGPT for help behind the math of the heart shape
 */ 
function drawHeart(x, y, size) {
  fill(255, 0, 0); 
  noStroke();
    
  beginShape();
  vertex(x, y + size / 4);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y + size / 4);
  endShape(CLOSE);
}

/**
 * Displays / draws the lives
 */ 
function displayLives() {
  const heartSize = 30; // Size of each heart
  const spacing = 50;   // Space between hearts
  
// Calculate the starting x position from the right side
  const startX = 640 - (lives * spacing); 
    
  for (let i = 0; i < lives; i++) {
// Draw hearts in a row, spacing each one apart
    drawHeart(startX + i * spacing, 20, heartSize);
  }
}

/**
 * Displays score at the top-left corner
 */ 
function displayScore() {
  fill(0);
  textSize(24); 
  text("Score: " + score, width / 2 - 250, height / 2 - 207);
}

/**
 * Displays the tongue and the frog
 */ 
function drawFrog() {
// Draw the tongue tip or boxing glove based on game state
  if (gameState === 'mamafly' && frog.tongue.state === "outbound") {
    drawBoxingGlove(frog.tongue.x, frog.tongue.y);
  } else {
// Regular tongue tip
      push();
      fill("#ff0000");
      noStroke();
      ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
      pop();
    }
// Draw the rest of the tongue
  push();
  stroke("#ff0000");
  strokeWeight(frog.tongue.size);
  line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
  pop();

// Draw the frog's body
  push();
  fill("#00ff00");
  noStroke();
  ellipse(frog.body.x, frog.body.y, frog.body.size);
  pop();
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
  frog.body.x = mouseX;
}

/** 
 * Handles moving the tongue based on its state
 */
function moveTongue() {
  frog.tongue.x = frog.body.x;
  
  if (frog.tongue.state === "outbound") {
    frog.tongue.y += -frog.tongue.speed;
      if (frog.tongue.y <= 0) {
        frog.tongue.state = "inbound";
      }
  } else if (frog.tongue.state === "inbound") {
      frog.tongue.y += frog.tongue.speed;
      if (frog.tongue.y >= height) {
        frog.tongue.state = "idle";
      }
    }
}

/** 
 * Creates the fly
 */ 
function drawFly() {
  push();
  noStroke();
  
  // Set fly speed based on type and difficulty
  let currentFlySpeed = fly.speed + (fly.isGolden ? 2 : fly.isEvil ? 1 : 0);
  
    if (fly.isGolden) {
      fill(255, 215, 0); 
    } else if (fly.isEvil) {
        fill(255, 0, 0);
    } else {
        fill("#000000");
    }
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/** 
 * Moves the fly according to its speed and resets the fly if it gets 
 * all the way to the right. 
 */
function moveFly() {
  fly.x += fly.speed;

  if (fly.x > width) {
  // If fly is evil dont take away a point
    if (!fly.isEvil) {
      lives -= 1; // Fly reached the end without being caught 
      if (lives <= 0) {
        gameOver();
      }
    }
    resetFly();
  }
}

/** 
 * Resets the fly to the left with a random y, and declared if fly is
 * possibly golden (1 in 10) or if evil (2 in 10).
 */
function resetFly() {
  fly.x = 0;
  fly.y = random(50, 300);
  fly.isGolden = Math.random() < 0.1; // 1 in 10 chance for a golden fly
  fly.isEvil = Math.random() < 0.2; // 2 in 10 chance for evil fly
}

/**
 * Function to draw mamafly 
 */ 
function drawMamafly(x, y) {
// Body
  fill(0); 
  ellipse(x, y, 80, 50); 

// Wings
  fill(200, 200, 255, 150); 
  ellipse(x - 50, y - 10, 60, 30); 
  ellipse(x + 50, y - 10, 60, 30); 

// Head
  fill(0); 
  ellipse(x, y - 30, 50, 50); 

// Eyes
  fill(255); 
  ellipse(x - 10, y - 25, 20, 20); 
  ellipse(x + 10, y - 25, 20, 20); 
  fill(0); // Black pupils
  ellipse(x - 10, y - 25, 10, 10); 
  ellipse(x + 10, y - 25, 10, 10); 

// Antennae
  stroke(0);
  strokeWeight(2);
  line(x - 15, y - 50, x - 30, y - 70); 
  line(x + 15, y - 50, x + 30, y - 70); 

// Legs
  line(x - 30, y + 10, x - 50, y + 30); 
  line(x - 10, y + 10, x - 30, y + 30); 
  line(x + 10, y + 10, x + 30, y + 30); 
  line(x + 30, y + 10, x + 50, y + 30);
}

/** 
 * Function to spawn mamafly
 */
function spawnMamafly() {
  mamafly.x = random(50, width - 50); // Random x position
  mamafly.y = random(50, height - 50); // Random y position
  mamafly.isActive = true; // Set Mamafly to active
  frog.glove = true; // Puts frog glove on
  
  // Set health values based on difficulty
  if (difficulty === 'easy') {
    mamafly.health = 20;
  } else if (difficulty === 'normal') {
    mamafly.health = 30;
  } else if (difficulty === 'hard') {
    mamafly.health = 40;
  }
  mamafly.maxHealth = mamafly.health; // Max health based on difficulty
}

/**
 * Design of boxing glove
*/ 
function drawBoxingGlove(x, y) {
  push();
  fill(0, 0, 255); 
  noStroke();
  ellipse(x, y, 50, 35);
  pop();
}

/** 
 * Mamafly battle function
 */
function mamaflyBattle() {
  background(128); 
    
// Draw battle elements
  moveFrog();
  moveTongue();
  drawFrog();
    
// Update and draw mamafly
  mamafly.x += mamafly.SpeedX;
  mamafly.y += mamafly.SpeedY;
    
// Bounce off edges
  if (mamafly.x > width - 40 || mamafly.x < 40) {
    mamafly.SpeedX *= -1;
  }
  if (mamafly.y > height - 40 || mamafly.y < 40) {
    mamafly.SpeedY *= -1;
  }
    
  drawMamafly(mamafly.x, mamafly.y);
  checkTongueMamaflyOverlap();
    
// Display only mamafly-related information
  displayMamaflyBattleInfo();
}

/** 
 * Displays Mamafly battle information
 */
function displayMamaflyBattleInfo() {
  fill(255, 0, 0);
  textSize(24);
    
  if (mamafly.health > 0) {
    text("BOSS BATTLE", width / 2, 30);
    textSize(18);
    text("Hit Mamafly to defeat it!", width / 2, height - 30);
  }
}

/** 
 * Health bar for Mamafly 
 */
function healthBar(p){
  fill (255, 0, 0);
  stroke(255);
  rect(320, 50, p, 10);
}

/** 
 * Display intro screen
 */ 
function displayIntro() {
  background("#A489A8");
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(60);
  text(title, width / 2, 60); // Display title
  textSize(22);
  text(rules, width / 2, height / 2); // Display rules
}

/** 
 * Separate normal gameplay into its own function 
 */
function normalGameplay() {
  background("#87ceeb");
  moveFly();
  drawFly();
  moveFrog();
  moveTongue();
  drawFrog();
  checkTongueFlyOverlap();
  displayScore();
  displayLives();
}

/**
 * Game won screen!
 */
function gameWon() {
  background(0);
  fill(0, 255, 0); 
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Congratulations!", width / 2, height / 2 - 40);
  text("You Defeated Mamafly!", width / 2, height / 2);
  textSize(24);
  noLoop();
}

/**
 * Ends the game/ Gameover screen
 */
function gameOver() {
  noLoop(); // Stop the game loop - JA
  fill(255, 0, 0);
  textSize(32);
  text("Game Over", width / 2, height / 2);
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
  const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
  const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
  if (eaten) {
    if (fly.isGolden) {
      lives++;
      score += 2;
    } else if (fly.isEvil) {
        lives -= 2;
      } else {
          score += 1; 
        }
    resetFly();
    frog.tongue.state = "inbound";  
    } 
  checkTongueMamaflyOverlap(); // Check overlap with Mamafly
}

/**
* Function to check if tongue overlaps with Mamafly and update health bar 
*/
function checkTongueMamaflyOverlap() {
  if (!mamafly.isActive) return;

  const d = dist(frog.tongue.x, frog.tongue.y, mamafly.x, mamafly.y);
  const hit = (d < frog.tongue.size / 2 + mamafly.size / 2);

  // Fixed initial health bar width
  const initialHealthBarWidth = 560; 
  // Calculate current health bar width based on remaining health
  let currentHealthBarWidth = (mamafly.health / mamafly.maxHealth) * initialHealthBarWidth;

  // Draw health bar with calculated width
  healthBar(currentHealthBarWidth);

  // When mamafly is hit, returns the tongue and deducts health
  if (hit) {
    mamafly.health--;
    frog.tongue.state = "inbound";
    if (mamafly.health <= 0) {
      // Game won!
      gameState = 'gameOver';
      gameWon();
    }
  }
}