import { BLOCK_SIZE } from "../config/config";

export class Enemy {
    private blockElement: HTMLElement;
    private posX: number;
    private posY: number;
    private moveInterval: number | undefined;

    constructor(blockElement: HTMLElement) {
        this.blockElement = blockElement;
        this.posY = 0; // Fixed at the top of the page
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
        const distance = Math.floor(Math.random() * 20) + 10; // Random distance to move

        this.posX += direction * distance;

        // Ensure the enemy stays within the bounds of the screen
        const maxX = window.innerWidth - BLOCK_SIZE;
        if (this.posX < 0) {
            this.posX = 0;
        } else if (this.posX > maxX) {
            this.posX = maxX;
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