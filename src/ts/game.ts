import { Jet } from "./jet";

class Game {
    private blockElement: HTMLElement;
  private jet: Jet;

  constructor() {
    this.blockElement = document.getElementById("jet") as HTMLElement;
    this.jet = new Jet(this.blockElement);
  }
  initialize(): void {
    console.log(this.jet)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  game.initialize();
});
