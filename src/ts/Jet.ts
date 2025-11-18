import { BLOCK_SIZE, ENEMY_ZONE, MAXIMUM_SHOT } from "../config/config";
import { playSound } from "./features/sound";
import { Shot } from "./Shot";

export class Jet {
    private blockElement: HTMLElement;
    private posX: number;
    private posY: number;
    private shots: Shot[] = []; // Array to track active shots
    private shotCount: number = 0; // Track the number of shots fired
    private maxShots: number = MAXIMUM_SHOT; // Maximum number of shots allowed

    constructor(blockElement: HTMLElement) {
        this.blockElement = blockElement;

        // Initialize position to bottom center
        this.posX = (window.innerWidth - BLOCK_SIZE) / 2;
        this.posY = window.innerHeight - BLOCK_SIZE;

        // Update the position immediately
        this.updatePosition();

        // Add keydown event listener for movement and shooting
        window.addEventListener("keydown", (event) => {
            this.move(event);
            if (event.key === " ") {
                this.shoot();
            }
        });
    }

    updatePosition(): void {
        this.blockElement.style.left = `${this.posX}px`;
        this.blockElement.style.top = `${this.posY}px`;
    }

    move(event: KeyboardEvent): void {
        const step = BLOCK_SIZE;
        let moved = false;

        // Handle arrow keys and WASD keys for movement
        switch (event.key) {
            case "ArrowUp": // Move up
            case "w":
                if (this.posY - step >= (ENEMY_ZONE + 100)) (this.posY -= step), (moved = true);
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

    shoot(): void {
        if (this.shotCount >= this.maxShots) {
            this.gameOver();
            return;
        }

        // Create a new shot at the jet's current position
        const shot = new Shot(this.posX + BLOCK_SIZE / 2, this.posY);
        this.shots.push(shot);
        playSound("shot")
        this.shotCount++;

        // Optionally, display the remaining shots
        console.log(`Shots remaining: ${this.maxShots - this.shotCount}`);
    }

    gameOver(): void {
        // Display "Game Over" message
        const gameOverMessage = document.createElement("div");
        gameOverMessage.textContent = "Game Over";
        gameOverMessage.className = "game-over-message"; // Apply CSS class
        document.body.appendChild(gameOverMessage);
    
        // Create a restart button
        const restartButton = document.createElement("button");
        restartButton.textContent = "Restart";
        restartButton.className = "restart-button"; // Apply CSS class
        document.body.appendChild(restartButton);
    
        // Add event listener to restart the game by refreshing the page
        restartButton.addEventListener("click", () => {
            location.reload(); // Refresh the page
        });
}
    
    restartGame(): void {
        // Reset shot count and clear existing shots
        this.shotCount = 0;
        this.shots.forEach(shot => shot.remove());
        this.shots = [];
    
        // Optionally, reset the jet's position
        this.posX = (window.innerWidth - BLOCK_SIZE) / 2;
        this.posY = window.innerHeight - BLOCK_SIZE;
        this.updatePosition();
    }
}