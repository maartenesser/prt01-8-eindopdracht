class Game {
    
    private player:Player
    public gameObjects:GameObject[]

    constructor() {

        // Create array of GameObjects
        this.gameObjects = []

        // Create player
        this.player = new Player(((window.innerWidth / 2) - 75), (window.innerHeight - 110), 'player', this)
        
        // Create user interface elements
        let floor = new Interface(0, 0, 'floor')
        let leftWall = new Interface(0, 0, 'left-wall')
        let rightWall = new Interface(0, 0, 'right-wall')
        let ceiling = new Interface(0, 0, 'ceiling')

        // Fill gameObjects[]
        this.gameObjects.push(this.player)
        this.gameObjects.push(floor)
        this.gameObjects.push(leftWall)
        this.gameObjects.push(rightWall)
        this.gameObjects.push(ceiling)
    
        this.gameLoop()
    
    }
    
    private gameLoop():void{
        
        // Update all GameObjects from gameObjects[]
        for (let i = 0, len = this.gameObjects.length; i < len; i++) {
            this.gameObjects[i].update()
        }

        requestAnimationFrame(() => this.gameLoop())
    
    }

} 

window.addEventListener("load", () => {
    
    new Game();

});