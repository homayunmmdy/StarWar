export class Shot {
    private shotElement: HTMLElement;
    private posX: number;
    private posY: number;

    constructor(startX: number, startY: number) {
        this.posX = startX;
        this.posY = startY;

        // Create a new shot element
        this.shotElement = document.createElement("div");
        this.shotElement.className = "shot";
        this.shotElement.style.position = "absolute";
        this.shotElement.style.left = `${this.posX}px`;
        this.shotElement.style.top = `${this.posY}px`;
        this.shotElement.style.width = "4px";
        this.shotElement.style.height = "10px";
        this.shotElement.style.backgroundColor = "red";
        document.body.appendChild(this.shotElement);

        // Move the shot upwards
        this.move();
    }

    move(): void {
        const moveInterval = setInterval(() => {
            this.posY -= 5; // Move the shot upwards
            this.shotElement.style.top = `${this.posY}px`;

            // Remove the shot if it goes off-screen
            if (this.posY < 0) {
                clearInterval(moveInterval);
                this.shotElement.remove();
            }
        }, 16); // ~60 FPS
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
                enemy.remove();
                this.shotElement.remove();
            }
        });
    }
}