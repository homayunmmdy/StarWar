class Game {
  private jet;

  constructor() {
    this.jet = document.getElementById("jet") as HTMLElement;
  }
  initialize(): void {
    console.log(this.jet)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  game.initialize();
});
