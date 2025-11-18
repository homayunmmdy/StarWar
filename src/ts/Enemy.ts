import { BLOCK_SIZE, ENEMY_ZONE } from "../config/config";

export class Enemy {
    private blockElement: HTMLElement;
    private posX: number;
    private posY: number;
    private moveInterval: number | undefined;

    constructor(blockElement: HTMLElement) {
        this.blockElement = blockElement;
        this.posY = Math.floor(Math.random() * ENEMY_ZONE); // Random Y position within the top 150px
        this.posX = this.getRandomXPosition(); // Random X position
        this.updatePosition();
        this.startRandomMovement();
    }

    // Generate a random X position within the page width
    private getRandomXPosition(): number {
        const maxX = window.innerWidth - BLOCK_SIZE; // Ensure the enemy stays within the page
        return Math.floor(Math.random() * maxX);
    }

    // Update the enemy's position on the screen
    private updatePosition(): void {
        this.blockElement.style.left = `${this.posX}px`;
        this.blockElement.style.top = `${this.posY}px`;
    }

    // Move the enemy randomly
    private moveRandomly(): void {
        const direction = Math.random() < 0.5 ? -1 : 1; // Randomly choose left or right
        const steps = Math.random() < 0.5 ? 1 : 2; // Randomly choose 1 or 2 steps
        const distance = steps * 50; // Each step is 50px

        this.posX += direction * distance;

        // Ensure the enemy stays within the bounds of the screen horizontally
        const maxX = window.innerWidth - BLOCK_SIZE;
        if (this.posX < 0) {
            this.posX = 0;
        } else if (this.posX > maxX) {
            this.posX = maxX;
        }

        // Ensure the enemy stays within the top 150px vertically
        const maxY = 150 - BLOCK_SIZE;
        if (this.posY < 0) {
            this.posY = 0;
        } else if (this.posY > maxY) {
            this.posY = maxY;
        }

        this.updatePosition();
    }

    // Start the random movement
    private startRandomMovement(): void {
        this.moveInterval = window.setInterval(() => this.moveRandomly(), 500); // Move every 500ms
    }

    // Stop the random movement (optional)
    public stopRandomMovement(): void {
        if (this.moveInterval) {
            window.clearInterval(this.moveInterval);
        }
    }
}