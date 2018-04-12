'use strict';

let plan =  new Level(`
########################################
#                                      #
#                                      #
#                                      #
#                                      #
#                                      #
#                                      #
#                                      #
#                                      #
#                                      #
#                                      #
#                                      #
#                                      #
#                                      #
#                                      #
#                                      #
#                                      #
#                                      #
#                                      #
########################################`);


//plan = plan.trim().split('\n');

//let planW = plan[0].length;
//let planH = plan.length;

let mageX = 3;
let mageY = 2;

const GRID_SIZE = 20;
class Level
{
    constructor(map){
        this.map = map.trim().split('\n');
        this.lng = map[0].length;
        this.hgh = map.length;
    }
getcell(x,y){
    if (this.map[x][y] == '#'){
        prompt('This cell is blocked!!')
    }
}
}
function drawPlan(level) {
    let planDiv = document.getElementById('plan');
    planDiv.style.width = level.lng * GRID_SIZE + 'px';
    planDiv.style.height = level.hgh * GRID_SIZE + 'px';

    for (let i = 0; i < level.hgh; i++) {
        for (let j = 0; j < level.lng; j++) {
            if (plan[i][j] == '#') {
                let wall = document.createElement('div');
                wall.style.width = GRID_SIZE + 'px';
                wall.style.height = GRID_SIZE + 'px';
                wall.style.backgroundColor = 'grey';
                wall.style.position = 'absolute';
                wall.style.top = i * GRID_SIZE + 'px';
                wall.style.left = j * GRID_SIZE + 'px';
                planDiv.appendChild(wall);
            }
        }
    }
}

function drawMage(mage) {
    let mageDiv = document.getElementById(mage.id);
    mageDiv.style.width = GRID_SIZE + 'px';
    mageDiv.style.height = GRID_SIZE + 'px';
    mageDiv.style.top = mage.xy.y * GRID_SIZE + 'px';
    mageDiv.style.left = mage.xy.x * GRID_SIZE + 'px';
    mageDiv.style.position = 'absolute';
    mageDiv.style.backgroundColor = mage.color;
}

//printPlan();

function moveLeft() {
    if (plan[mageY][mageX - 1] == ' ') {
        mageX--;
    }
    printPlan();
}

function moveRight() {
    if (plan[mageY][mageX + 1] == ' ') {
        mageX++;
    }
    printPlan();
}

class Mage {
    constructor(xy,id,color) {
        this.xy = xy;
        this.id = id;
        this.color = color;
    }

    move(dir) {
        if (dir.validate()) {
            let cellxy = new XY(this.xy.x, this.xy.y);
            cellxy.add(dir);
            if (plan[cellxy.x][cellxy.y] == ' ') {
                this.xy = cellxy;
            }
        }
    }
}

class XY {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    equals(other) {
        return this.x == other.x && this.y == other.y;
    }

    add(xy) {
        this.x += xy.x;
        this.y += xy.y;
    }
}

class Direction extends XY {
    validate() {
        return Math.abs(this.x) <= 1 && Math.abs(this.y) <= 1;
    }
}

/**
 * Moves the mage
 * @param {Direction} dir 
 */
function move(dir) {
    if (dir.validate()) {
        if (plan[mageY + dir.y][mageX + dir.x] == ' ') {
            mageX += dir.x;
            mageY += dir.y;
        }
    }
}

function keyMove(mage) {
    let com = prompt('Make turn: ');
    com = com.toLowerCase();
    switch (com) {
        case 'a':
            mage.move(new Direction(-1, 0));
            break;
        case 's':
            mage.move(new Direction(0, 1));
            break;
        case 'd':
            mage.move(new Direction(1, 0));
            break;
        case 'w':
            mage.move(new Direction(0, -1));
            break;
        case 'q':
            throw 'Stop the game';
    }
    setTimeout(drawMage(mage),0);
}

let xy1 = new XY(1, 2);
let xy2 = new XY(2, 5);
let xy3 = new XY(7, 1);
let dir = new Direction(1, 0);

let mage1 = new Mage(xy1,'mage1','red');
let mage2 = new Mage(xy2,'mage2','yellow');
let mage3 = new Mage(xy3,'mage3','blue');

drawPlan(plan);
drawMage(mage1);
drawMage(mage2);
drawMage(mage3);


const MAX_TURN = 100;
let turn = 0;

function makeTurn(mage) {
    try {
        keyMove(mage);
        turn++;
        if (turn <= MAX_TURN) {
            setTimeout(makeTurn(mage), 200);
        }
    } catch (e) {
        console.log(e);
    }
}

setTimeout(makeTurn(mage1), 0);
