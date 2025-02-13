import { BLOCK_SIZE } from "../config/config";

export class Enemy {
    private blockElement: HTMLElement;
    private posX: number;
    private posY: number;

    constructor(blockElement: HTMLElement) {
        this.blockElement = blockElement;
        this.posY = 0; // Fixed at the top of the page
        this.posX = this.getRandomXPosition(); // Random X position
        this.updatePosition();
    }

    // Generate a random X position within the page width
    private getRandomXPosition(): number {
        const maxX = window.innerWidth - BLOCK_SIZE; // Ensure the enemy stays within the page
        return Math.floor(Math.random() * maxX);
    }

    // Update the enemy's position on the screen
    updatePosition(): void {
        this.blockElement.style.left = `${this.posX}px`;
        this.blockElement.style.top = `${this.posY}px`;
    }
}