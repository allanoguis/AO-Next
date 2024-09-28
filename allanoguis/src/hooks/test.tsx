document.addEventListener("DOMContentLoaded", function () {
  const dino = document.querySelector(".dino");
  const grid = document.querySelector(".grid");
  const alert = document.getElementById("alert");

  let gravity = 0.9;
  let isJumping = false;
  let isGameOver = false;

  function control(e: KeyboardEvent): void {
    // Specify parameter type and return type
    if (e.code === "Space") {
      if (!isJumping) {
        jump();
      }
    }
  }
  document.addEventListener("keydown", control);

  let position = 0;
  function jump(): void {
    // Specify return type
    isJumping = true;
    let count: number = 0; // Specify type
    let timerId: NodeJS.Timeout = setInterval(function () {
      // Specify type
      //move down
      if (count === 15) {
        clearInterval(timerId);
        let downTimerId: NodeJS.Timeout = setInterval(function () {
          // Specify type
          if (count === 0) {
            clearInterval(downTimerId);
            isJumping = false;
          }
          position -= 5;
          count--;
          position = position * gravity;
          dino.style.bottom = position + "px";
        }, 20);
      }
      //move up
      position += 30;
      count++;
      position = position * gravity;
      dino.style.bottom = position + "px";
    }, 20);
  }

  function generateObstacles(): void {
    // Specify return type
    if (!isGameOver) {
      let randomTime: number = Math.random() * 4000; // Specify type
      let obstaclePosition: number = 1000; // Specify type
      const obstacle: HTMLElement = document.createElement("div"); // Specify type
      obstacle.classList.add("obstacle");
      grid.appendChild(obstacle);
      obstacle.style.left = obstaclePosition + "px";

      let timerId: NodeJS.Timeout = setInterval(function () {
        // Specify type
        if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
          clearInterval(timerId);
          alert.innerHTML = "Game Over";
          isGameOver = true;
          //remove all children
          while (grid.firstChild) {
            grid.removeChild(grid.lastChild);
          }
        }
        obstaclePosition -= 10;
        obstacle.style.left = obstaclePosition + "px";
      }, 20);
      setTimeout(generateObstacles, randomTime);
    }
  }
  generateObstacles();
});
