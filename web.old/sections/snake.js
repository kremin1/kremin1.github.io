// snake.js
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game');
  const overlay = document.getElementById('overlay');

  if (!canvas) { console.error('Canvas element (#game) not found.'); return; }
  if (!overlay) { console.error('Overlay element (#overlay) not found.'); return; }

  const ctx = canvas.getContext('2d');
  if (!ctx) { console.error('Unable to obtain 2D context on canvas.'); return; }

  const tileSize = 20;
  const cols = Math.floor(canvas.width / tileSize);
  const rows = Math.floor(canvas.height / tileSize);

  let snake = [];
  let food = null;
  let dir = { x: 1, y: 0 };
  let bufferedDir = { x: 1, y: 0 };
  let running = true;
  let gameOver = false;
  let score = 0;
  let speed = 120; // ms per tick

  function resetGame() {
    snake = [];
    const startX = Math.floor(cols / 2);
    const startY = Math.floor(rows / 2);
    for (let i = 4; i >= 0; i--) snake.push({ x: startX - i, y: startY });
    dir = { x: 1, y: 0 };
    bufferedDir = { x: 1, y: 0 };
    running = true;
    gameOver = false;
    score = 0;
    speed = 120;
    spawnFood();
    overlay.style.display = 'none';
    draw(); // immediate draw
  }

  function spawnFood() {
    // avoid infinite recursion in extreme edge case: check quickly
    for (let attempts = 0; attempts < 1000; attempts++) {
      const p = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
      if (!snake.some(s => s.x === p.x && s.y === p.y)) { food = p; return; }
    }
    // fallback: place at 0,0
    food = { x: 0, y: 0 };
  }

  function draw() {
    // background
    ctx.fillStyle = '#161b22';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // subtle grid
    ctx.strokeStyle = '#22272e';
    ctx.lineWidth = 1;
    for (let x = 0; x <= cols; x++) {
      ctx.beginPath();
      ctx.moveTo(x * tileSize, 0);
      ctx.lineTo(x * tileSize, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= rows; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * tileSize);
      ctx.lineTo(canvas.width, y * tileSize);
      ctx.stroke();
    }

    // food
    ctx.fillStyle = '#ff6b6b';
    ctx.fillRect(food.x * tileSize + 2, food.y * tileSize + 2, tileSize - 4, tileSize - 4);

    // snake
    snake.forEach((s, i) => {
      ctx.fillStyle = (i === snake.length - 1) ? '#2dbd6e' : '#3ddc84';
      ctx.fillRect(s.x * tileSize + 2, s.y * tileSize + 2, tileSize - 4, tileSize - 4);
    });

    // HUD
    ctx.fillStyle = '#e6edf3';
    ctx.font = '16px Arial';
    ctx.fillText(`Score: ${score}  Speed: ${Math.round(speed)}ms  Length: ${snake.length}`, 10, 20);

    if (!running && !gameOver) {
      overlay.style.display = 'block';
      overlay.innerHTML = 'PAUSED — press P to resume';
    } else if (gameOver) {
      overlay.style.display = 'block';
      overlay.innerHTML = 'GAME OVER — press R to restart';
    } else {
      overlay.style.display = 'none';
    }
  }

  function update() {
    if (!running || gameOver) {
      // still draw so user sees paused/gameover state
      draw();
      return;
    }

    // apply buffered direction at tick start to avoid instant reverse
    dir = { x: bufferedDir.x, y: bufferedDir.y };

    const head = snake[snake.length - 1];
    let nx = head.x + dir.x;
    let ny = head.y + dir.y;

    // wrap
    nx = (nx + cols) % cols;
    ny = (ny + rows) % rows;
    const newHead = { x: nx, y: ny };

    // self collision
    if (snake.some(s => s.x === newHead.x && s.y === newHead.y)) {
      gameOver = true;
      running = false;
      draw();
      return;
    }

    snake.push(newHead);

    // eat
    if (newHead.x === food.x && newHead.y === food.y) {
      score += 10;
      // speed up
      speed = Math.max(50, speed * 0.96);
      spawnFood();
    } else {
      snake.shift();
    }

    draw();
  }

  // robust game loop using setTimeout (speed can change)
  (function loop() {
    update();
    setTimeout(loop, Math.max(10, Math.round(speed)));
  })();

  // keyboard handling (use toLowerCase to accept upper/lower)
  document.addEventListener('keydown', (ev) => {
    const k = ev.key.toLowerCase();

    if (k === 'arrowup' || k === 'w') {
      if (dir.y !== 1) bufferedDir = { x: 0, y: -1 };
    } else if (k === 'arrowdown' || k === 's') {
      if (dir.y !== -1) bufferedDir = { x: 0, y: 1 };
    } else if (k === 'arrowleft' || k === 'a') {
      if (dir.x !== 1) bufferedDir = { x: -1, y: 0 };
    } else if (k === 'arrowright' || k === 'd') {
      if (dir.x !== -1) bufferedDir = { x: 1, y: 0 };
    } else if (k === 'p') {
      running = !running;
      draw();
    } else if (k === 'r') {
      resetGame();
    }
  });

  // initial start
  resetGame();
});
