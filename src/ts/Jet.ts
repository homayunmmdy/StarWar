import { BLOCK_SIZE } from "../config/config";
import { Shot } from "./Shot";

export class Jet {
    private blockElement: HTMLElement;
    private posX: number;
    private posY: number;
    private shots: Shot[] = []; // Array to track active shots

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

    shoot(): void {
        // Create a new shot at the jet's current position
        const shot = new Shot(this.posX + BLOCK_SIZE / 2, this.posY);
        this.shots.push(shot);
    }
}