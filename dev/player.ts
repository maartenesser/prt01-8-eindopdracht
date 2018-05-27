class Player extends GameObject {

    private game:Game
    private speed:number = 0

    private weapon:Weapon

    constructor(x:number, y:number, el:string, g:Game) {
        
        super(x, y, el)
        this.game = g

        this.weapon = new Arrow(this.getX(), 0, 'arrow', 10)
        g.gameObjects.push(this.weapon)

        super.drawForeground()

        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e))

    }

    public update():void {
        
        if(this.getX() >= 10 && (this.getX() <= (window.innerWidth - 85))) {
            this.setX(this.getX() + this.speed)
            this.move()
        } else {
            let x = this.getX()
            switch(true) {
                case x < 15:
                    this.setX(15)
                    break
                case x > 15:
                    this.setX(window.innerWidth - 90)
                    break
            }
        }

    }

    private onKeyDown(event:KeyboardEvent):void {
        
        let el = this.getEL()
        
        switch(event.keyCode) {
            case 39:
                this.speed = 5                
                el.style.backgroundImage = 'url("../docs/images/shooter-right.png")'
                break
            case 37:
                el.style.backgroundImage = 'url("../docs/images/shooter-left.png")'
                this.speed = -5
                break
            case 38:
                if(!this.weapon.shooting) {
                    this.weapon.shoot(this.getX())
                }
        }

    }

    private onKeyUp(event:KeyboardEvent):void {
        this.speed = 0
        let el = this.getEL()
        el.style.backgroundImage = 'url("../docs/images/shooter-back.png")'
    }



}