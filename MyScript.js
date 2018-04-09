'use strict';
let plan = `
###############
#             #
#             #
#             #
#             #
#             #
###############`;

let N=20;
let zone = '\n';
for (let i = 0; i<N; i++)
{
    if ((i==0)||(i==N-1))
    {
        for(let j = 0; j<N;j++)
        {
            zone+='#';
        }
        zone+='\n';
    }else
    {
        for(let j=0;j<N;j++)
        {
            if ((j==0)||(j==N-1))
            {
                zone+='#';
            }else 
            {
                zone+=' '
            }  
        }zone+='\n';
    }
}

plan = plan.trim().split('\n');

let planW = plan[0].length;
let planH = plan.length;

let mageX = 3;
let mageY = 2;

function printPlan() {
    let s = '';
    for (let i = 0; i < planH; i++) {
        for (let j = 0; j < planW; j++) {
            if (j == mageX && i == mageY) {
                s += 'M';
            } else {
                s += plan[i][j];
            }
        }
        s += '\n';
    }
    console.log(s);
}
function printSpiral()
{
    let s = '';
}

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
function moveUp() {
    if (plan[mageY-1][mageX] == ' ') {
        mageY--;
    }
    printPlan();
}
function moveDown() {
    if (plan[mageY+1][mageX] == ' ') {
        mageY++;
    }
    printPlan();
}
function moveDownRight() {
    if (plan[mageY+1][mageX+1] == ' ') {
        mageY++;
        mageX++;
    }
    printPlan();
}
function moveDownLeft() {
    if (plan[mageY+1][mageX-1] == ' ') {
        mageY++;
        mageX--;
    }
    printPlan();
}
function moveUpRight() {
    if (plan[mageY-1][mageX+1] == ' ') {
        mageY--;
        mageX++;
    }
    printPlan();
}
function moveUpLeft() {
    if (plan[mageY-1][mageX-1] == ' ') {
        mageY--;
        mageX--;
    }
    printPlan();
}
while (plan[mageY][mageX + 1] == ' ') {
    moveRight();
}
//x=>4  y=>8
//{x:4,y:8}
let dir = {x: 13, y: 5}
function move()
{
let dirX=dir.x;
let dirY=dir.y; // Вытаскием координаты из строки dir вида {x:4,y:8}
if (dirX!==mageX)
{
    if (Math.abs(dirY-mageY)>Math.abs(dirX-mageX)) // Если разница координат Y больше, чем разница координат X, то очевидно, что мы будем двигаться по y
    {      
        if (dirY>mageY) // Если dirY больше mageY - двигаемся вниз (связано с тем, что наша ось Y направлена вниз) 
        {
            moveDown();
        }else if (dirY<mageY) //Если dirY меньше mageY - двигаемся наверх (см. выше)
        {
            moveUp();
        } // в этом цикле мы никогда не попадаем на условие, что dirY=mageY, однако это покрывается следующей веткой условий
    }
    else if (Math.abs(dirY-mageY)<Math.abs(dirX-mageX)) //Если разница координат у меньше, чем разница координат х, то мы двигаемся по иксу (если разница координат y=0, то разница координат X больше В любом случае)
    {
        if (dirX>mageX) 
        {
            moveRight();
        }else if (dirX<mageX) 
        {
            moveLeft();
        }
    }
    else if (Math.abs(dirY-mageY)==Math.abs(dirX-mageX)) // Если их разница координат равна, то мы будем двигаться по диагонали. Нужно решить - в какую сторону нам идти - вправо вниз или вправо вверх
    {   
        if (dirX>mageX)
        {
            if (dirY>mageY) // Если dirY больше mageY - двигаемся по диагонали вниз
        {
            moveDownRight();
        }else if (dirY<mageY) //Если dirY меньше mageY - двигаемся по диагонали вверх
        {
            moveUpRight();
        }
        }else if (dirX<mageX)
        {
            if (dirY>mageY) // Если dirY больше mageY - двигаемся по диагонали вниз
        {
            moveDownLeft();
        }else if (dirY<mageY) //Если dirY меньше mageY - двигаемся по диагонали вверх
        {
            moveUpLeft();
        }
        } 
    }
}else if (dirX==mageX)
{
    if (dirY==mageY)
    {

    }else if (dirY>mageY)
    {
        moveDown();
    }else 
    {
        moveUp();
    } 
}

}
function change(a,b)
{
  let x1=a;
  let x2=b;
  a=a+b;
  b=a+b;
  a=b-a;
  b=b-2*a;
  console.log(a,b);
}