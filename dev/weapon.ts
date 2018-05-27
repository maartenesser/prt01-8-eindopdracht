/// <reference path="gameObject.ts"/>

class Weapon extends GameObject {

    private speed:number = 0
    public shooting:boolean = false

    constructor(x:number, y:number, el:string, s:number) {
        super(x, y, el)
        this.speed = s
    }

    public update():void {

        if(this.shooting) {
            if(this.y <= (window.innerHeight * -1)) {
                super.removeForeground()
                this.shooting = false
            }

            this.y -= this.speed
            this.el.style.transform = `translate(${(this.x)}px, ${this.y}px)`
        }

    }

    public shoot(x:number):void {
        
        this.setX(x + 20)
        this.y = 0

        super.drawForeground()
        this.shooting = true

    }

}