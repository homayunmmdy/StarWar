import { playSound } from "./features/sound";

export class Shot {
    private shotElement: HTMLElement;
    private posX: number;
    private posY: number;
    private moveInterval: number;

    constructor(startX: number, startY: number) {
        this.posX = startX;
        this.posY = startY;

        // Create a new shot element
        this.shotElement = document.createElement("div");
        this.shotElement.className = "shot";
        this.shotElement.style.left = `${this.posX}px`;
        this.shotElement.style.top = `${this.posY}px`;
        document.body.appendChild(this.shotElement);

        // Move the shot upwards and check for collisions
        this.moveInterval = setInterval(() => this.move(), 16); // ~60 FPS
    }

    move(): void {
        this.posY -= 5; // Move the shot upwards
        this.shotElement.style.top = `${this.posY}px`;

        // Remove the shot if it goes off-screen
        if (this.posY < 0) {
            this.remove();
            return;
        }

        // Check for collisions with enemies
        this.checkCollisions();
    }

    checkCollisions(): void {
        const enemies = document.querySelectorAll(".enemy") as NodeListOf<HTMLElement>;

        enemies.forEach((enemy) => {
            const enemyRect = enemy.getBoundingClientRect();
            const shotRect = this.shotElement.getBoundingClientRect();

            // Check for collision
            if (
                shotRect.left < enemyRect.right &&
                shotRect.right > enemyRect.left &&
                shotRect.top < enemyRect.bottom &&
                shotRect.bottom > enemyRect.top
            ) {
                // Remove the enemy and the shot
                playSound('explosion');
                enemy.remove();
                this.remove();
            }
        });
    }

    remove(): void {
        clearInterval(this.moveInterval); // Stop the shot's movement
        this.shotElement.remove(); // Remove the shot from the DOM
    }
}