class GameObject {

    public x:number
    public y:number
    public el:HTMLElement
    private foreground:Element
    private background:Element
    
    constructor(x:number, y:number, el:string) {
        
        this.x = x
        this.y = y
        this.el = document.createElement(el)
        this.el.style.transform = `translate(${(this.x)}px, ${this.y}px`

        this.foreground = document.getElementsByTagName("foreground")[0]
        this.background = document.getElementsByTagName("background")[0]

    }

    public update():void {
        console.log('update')
    }

    move():void {
        this.el.style.transform = `translate(${(this.x)}px, ${this.y}px)`
    }

    getX():number {
        return this.x
    }

    getY():number {
        return this.y
    }

    setX(x:number):void {
        this.x = x
    }

    setY(y:number):void {
        this.y = y
    }

    getEL():HTMLElement {
        return this.el
    }

    drawForeground():void {
        this.foreground.appendChild(this.el)
    }

    drawBackground():void {
        this.background.appendChild(this.el)
    }

    removeForeground():void {
        this.foreground.removeChild(this.el)
    }

}