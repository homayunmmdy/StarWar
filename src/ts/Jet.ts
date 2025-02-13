import { BLOCK_SIZE } from "../config/config";

export class Jet {
    private blockElement: HTMLElement;
    private posX: number;
    private posY: number;
  
    constructor(blockElement: HTMLElement) {
      this.blockElement = blockElement;
      this.posX = 0;
      this.posY = 0;
    
      // Add keydown event listener for movement controls
      window.addEventListener("keydown", (event) => this.move(event));
    }
  
    updatePosition(): void {
      this.blockElement.style.transform = `translate(${this.posX}px, ${this.posY}px)`;
    }
  
    move(event: KeyboardEvent): void {
      const step = BLOCK_SIZE;
      let moved = false;
  
      // Handle arrow keys and WASD keys for movement
      switch (event.key) {
        case "ArrowUp": // Move up
        case "w":
          if (this.posY - step >= 0) (this.posY -= step), (moved = true);
          break;
        case "ArrowDown": // Move down
        case "s":
          if (this.posY + step <= window.innerHeight - BLOCK_SIZE)
            (this.posY += step), (moved = true);
          break;
        case "ArrowLeft": // Move left
        case "a":
          if (this.posX - step >= 0) (this.posX -= step), (moved = true);
          break;
        case "ArrowRight": // Move right
        case "d":
          if (this.posX + step <= window.innerWidth - BLOCK_SIZE)
            (this.posX += step), (moved = true);
          break;
      }
  
      if (moved) {
        this.updatePosition();
      }
    }
  

  }