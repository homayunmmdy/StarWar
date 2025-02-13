import { Enemy } from "./Enemy";
import { Jet } from "./jet";

class Game {
    private jet: Jet;
    private enemies: Enemy[] = [];

    constructor() {
        // Initialize the player's jet
        const jetElement = document.getElementById("jet") as HTMLElement;
        this.jet = new Jet(jetElement);


        // Create multiple enemies
        this.createEnemies(5); // Create 5 enemies
    }

    // Create multiple enemies at the top of the page
    private createEnemies(count: number): void {
        for (let i = 0; i < count; i++) {
            const enemyElement = document.createElement("div");
            enemyElement.classList.add("enemy");
            document.body.appendChild(enemyElement);
            this.enemies.push(new Enemy(enemyElement));
        }
    }

    initialize(): void {
        console.log("Game initialized with multiple enemies!");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const game = new Game();
    game.initialize();
});