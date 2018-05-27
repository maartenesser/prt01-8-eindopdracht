"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(x, y, el) {
        this.x = x;
        this.y = y;
        this.el = document.createElement(el);
        this.el.style.transform = "translate(" + (this.x) + "px, " + this.y + "px";
        this.foreground = document.getElementsByTagName("foreground")[0];
        this.background = document.getElementsByTagName("background")[0];
    }
    GameObject.prototype.update = function () {
        console.log('update');
    };
    GameObject.prototype.move = function () {
        this.el.style.transform = "translate(" + (this.x) + "px, " + this.y + "px)";
    };
    GameObject.prototype.getX = function () {
        return this.x;
    };
    GameObject.prototype.getY = function () {
        return this.y;
    };
    GameObject.prototype.setX = function (x) {
        this.x = x;
    };
    GameObject.prototype.setY = function (y) {
        this.y = y;
    };
    GameObject.prototype.getEL = function () {
        return this.el;
    };
    GameObject.prototype.drawForeground = function () {
        this.foreground.appendChild(this.el);
    };
    GameObject.prototype.drawBackground = function () {
        this.background.appendChild(this.el);
    };
    GameObject.prototype.removeForeground = function () {
        this.foreground.removeChild(this.el);
    };
    return GameObject;
}());
var Weapon = (function (_super) {
    __extends(Weapon, _super);
    function Weapon(x, y, el, s) {
        var _this = _super.call(this, x, y, el) || this;
        _this.speed = 0;
        _this.shooting = false;
        _this.speed = s;
        return _this;
    }
    Weapon.prototype.update = function () {
        if (this.shooting) {
            if (this.y <= (window.innerHeight * -1)) {
                _super.prototype.removeForeground.call(this);
                this.shooting = false;
            }
            this.y -= this.speed;
            this.el.style.transform = "translate(" + (this.x) + "px, " + this.y + "px)";
        }
    };
    Weapon.prototype.shoot = function (x) {
        this.setX(x + 20);
        this.y = 0;
        _super.prototype.drawForeground.call(this);
        this.shooting = true;
    };
    return Weapon;
}(GameObject));
var Arrow = (function (_super) {
    __extends(Arrow, _super);
    function Arrow(x, y, el, s) {
        return _super.call(this, x, y, el, s) || this;
    }
    Arrow.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    Arrow.prototype.shoot = function (x) {
        _super.prototype.shoot.call(this, x);
    };
    return Arrow;
}(Weapon));
var Game = (function () {
    function Game() {
        this.gameObjects = [];
        this.player = new Player(((window.innerWidth / 2) - 75), (window.innerHeight - 110), 'player', this);
        var floor = new Interface(0, 0, 'floor');
        var leftWall = new Interface(0, 0, 'left-wall');
        var rightWall = new Interface(0, 0, 'right-wall');
        var ceiling = new Interface(0, 0, 'ceiling');
        this.gameObjects.push(this.player);
        this.gameObjects.push(floor);
        this.gameObjects.push(leftWall);
        this.gameObjects.push(rightWall);
        this.gameObjects.push(ceiling);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        for (var i = 0, len = this.gameObjects.length; i < len; i++) {
            this.gameObjects[i].update();
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var Interface = (function (_super) {
    __extends(Interface, _super);
    function Interface(x, y, el) {
        var _this = _super.call(this, x, y, el) || this;
        _super.prototype.drawBackground.call(_this);
        return _this;
    }
    Interface.prototype.update = function () {
    };
    return Interface;
}(GameObject));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(x, y, el, g) {
        var _this = _super.call(this, x, y, el) || this;
        _this.speed = 0;
        _this.game = g;
        _this.weapon = new Arrow(_this.getX(), 0, 'arrow', 10);
        g.gameObjects.push(_this.weapon);
        _super.prototype.drawForeground.call(_this);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
    Player.prototype.update = function () {
        if (this.getX() >= 10 && (this.getX() <= (window.innerWidth - 85))) {
            this.setX(this.getX() + this.speed);
            this.move();
        }
        else {
            var x = this.getX();
            switch (true) {
                case x < 15:
                    this.setX(15);
                    break;
                case x > 15:
                    this.setX(window.innerWidth - 90);
                    break;
            }
        }
    };
    Player.prototype.onKeyDown = function (event) {
        var el = this.getEL();
        switch (event.keyCode) {
            case 39:
                this.speed = 5;
                el.style.backgroundImage = 'url("../docs/images/shooter-right.png")';
                break;
            case 37:
                el.style.backgroundImage = 'url("../docs/images/shooter-left.png")';
                this.speed = -5;
                break;
            case 38:
                if (!this.weapon.shooting) {
                    this.weapon.shoot(this.getX());
                }
        }
    };
    Player.prototype.onKeyUp = function (event) {
        this.speed = 0;
        var el = this.getEL();
        el.style.backgroundImage = 'url("../docs/images/shooter-back.png")';
    };
    return Player;
}(GameObject));
//# sourceMappingURL=main.js.map