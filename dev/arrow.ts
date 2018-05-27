/// <reference path="weapon.ts"/>

class Arrow extends Weapon {

    constructor(x:number, y:number, el:string, s:number) {
        
        super(x, y, el, s)

    }

    public update():void {
        super.update()
    }

    public shoot(x:number):void {
        super.shoot(x)
    }

}