'use strict';

class StrategyRedTeam1 extends MageStrategy {
    constructor(myTeam, myId) {
        super(myTeam, myId);
    }

    init(level, state) {}

    turn(state) {
        let action = { id: this.id };
        let dir = [new Direction(-1, 0), new Direction(1, 0), new Direction(0, -1), new Direction(0, 1)];
        let n = Math.floor(Math.random() * dir.length);
        let chance = Math.floor(Math.random() * 100);
        if (chance < 80) {
            action.type = ActionType.MOVE;
            action.dir = dir[n];
        } else {            
            action.type = ActionType.CAST;
            action.spell = new FireballSpell();            
            action.spell.dir = dir[n];
        }        
        return action;
    }
}


class StrategyRedTeam2 extends MageStrategy {
    constructor(myTeam, myId) {
        super(myTeam, myId);
    }

    init(level, state) {}

    turn(state) {
        let action = { id: this.id };
        let dir = [new Direction(-1, 0), new Direction(1, 0), new Direction(0, -1), new Direction(0, 1)];
        let n = Math.floor(Math.random() * dir.length);
        let chance = Math.floor(Math.random() * 100);
        if (chance < 80) {
            action.type = ActionType.MOVE;
            action.dir = dir[n];
        } else {            
            action.type = ActionType.CAST;
            action.spell = new FireballSpell();            
            action.spell.dir = dir[n];
        }        
        return action;
    }
}


class StrategyRedTeam3 extends MageStrategy {
    constructor(myTeam, myId) {
        super(myTeam, myId);
    }

    init(level, state) {}

    turn(state) {
        let action = { id: this.id };
        return action;

    }
}

















let TurnCount = 0 ;
class StrategyRedTeam4 extends MageStrategy {
    constructor(myTeam, myId) {
        super(myTeam, myId);
    }

    init(level, state) {}

    turn(state) {
        ;
        console.log(this.team.id);
        let action = { id: this.id };
        let MyTeammates = [];
        for (let mage of state.mages) {
            //console.log(mage.teamId);
            if (mage.teamId == this.team.id)
            MyTeammates.push(mage);
            //console.log(MyTeammates);
        }
            let readyToFire = false;
            let opponent = new XY();
            let my = new XY();
            for (let mage of state.mages){
                if (this.id == mage.id){
                    my = mage.xy;
                }
            }
            for (let mage of state.mages){
                    if (this.id !== mage.id && mage.teamId !== this.team.id && mage.status !== status.DEAD ){
                         opponent = mage.xy;
                        // console.log(mage.id);
                    }     
            }
            TurnCount++;
            console.log(TurnCount);
        
            if (this.health <=60){
                HealSpell.apply();
            }
            let deltaX = Math.abs(opponent.x - my.x);                // надо вытащить данные и записать их в координаты 
            let deltaY = Math.abs(opponent.y - my.y);
            let vectorX ;
            let vectorY ;

                    if (deltaX != 0) 
                        vectorX = ( opponent.x - my.x ) / Math.abs(opponent.x - my.x); 
                    else 
                        vectorX = 0;

                    if (deltaY != 0)
                        vectorY = ( opponent.y - my.y ) / Math.abs(opponent.y - my.y);
                    else
                        vectorY = 0;


            if( (deltaX == 0 && deltaY > 1 ) || (deltaY == 0 && deltaX > 1 ) ) 
            {    
                action.type = ActionType.CAST;
                action.spell = new FireballSpell();            
                action.spell.dir = new Direction(vectorX,vectorY); // вектор атаки
            }
            else
            {
                        if (deltaX > 1 && deltaY > 1  ) { //main if
                            if (deltaX < deltaY){
                                action.type = ActionType.MOVE; 
                                action.dir = new Direction(vectorX,0); 
                            }else if(deltaX > deltaY){
                                action.type = ActionType.MOVE; 
                                action.dir = new Direction(0,vectorY); 
                            } else {
                                action.type = ActionType.MOVE; 
                                action.dir = new Direction(vectorX,0); 
                            }
                        }else{
                            if (deltaX == 1){  
                                if (deltaY > 3){                         // or 3 - better
                                    action.type = ActionType.MOVE; 
                                    action.dir = new Direction(0,vectorY); 
                                }else{
                                    readyToFire = true;
                                }
        
                            }else if (deltaY == 1) {
                                if (deltaX > 3) {
                                    action.type = ActionType.MOVE; 
                                    action.dir = new Direction(vectorX,0); 
                                }else
                                    readyToFire = true;
                            } 
                        }
                           // main
                          // console.log(TeammateOnTheLine(MyTeammates));
        // function
                        if (readyToFire == true) {                  // start if
                            if (deltaX + deltaY < 2) {
                                if ( my.x - vectorX == Cell.EMPTY){ // если склянка или другой маг - Error
                                    action.type = ActionType.MOVE; 
                                    action.dir = new Direction((-1)*vectorX,0); 
                                }else if( my.y - vectorY == Cell.EMPTY){
                                    action.type = ActionType.MOVE; 
                                    action.dir = new Direction(0,(-1)*vectorY); 
                                }   
                                else {                          // кажется тут надо допилить
                                    // fireball - attack 
                                }
                            }else{
                                if (deltaX < deltaY){
                                    action.type = ActionType.MOVE; 
                                    action.dir = new Direction(vectorX,0); 
                                }else{
                                    action.type = ActionType.MOVE; 
                                    action.dir = new Direction(0,vectorY); 
                                }
                            }  
                        }                                           // end if
                    } 
        function spellHere(state,xy,dir) { 
            for (let spell of state.spells){
                 if(spell.xy.equals(xy)){
                     if (dir.x == spell.dir.x && dir.y == spell.dir.y){
                         return true;
                     }
                 }  
             }
         }
         
        return action;
        
    }
    
}





/*function TeammateOnTheLine(){
    let IsOnTheLine = false;
    for (let mage of MyTeammates){
        if (mage.id !== this.id  && mage.teamId == this.team.id && mage.xy.x == this.xy.x || mage.xy.y == this.xy.y){
            IsOnTheLine = true;
        }
        else IsOnTheLine = false;
    }
    return IsOnTheLine;
}        

*/




















 class RedTeamStrategy extends MageStrategy {
     constructor (myTeam,myId) {
         super(myTeam,myId);
     }

     init(level,state) {}

    turn(state) {
            let didDodged = false;
            let action = {id: this.id};
            let readyToFire = false;
            let opponent = new XY();
            let my = new XY();
            for (let mage of state.mages){
                if (this.id == mage.id){
                    my = mage.xy;
                }
            }
            for (let mage of state.mages){
                    if (this.id !== mage.id && mage.teamId !== teams[2]){
                         opponent = mage.xy;
                    }     
            }

            function spellHere(state,xy,dir) { 
                for (let spell of state.spells){
                     if(spell.xy.equals(xy)){
                         if (dir.x == spell.dir.x && dir.y == spell.dir.y){
                             return true;
                         }
                     }  
                 }
             }
        let deltaX = Math.abs(opponent.x - my.x);                // надо вытащить данные и записать их в координаты 
        let deltaY = Math.abs(opponent.y - my.y);
            let vectorX ;
            let vectorY ;

                    if (deltaX != 0) 
                        vectorX = ( opponent.x - my.x ) / Math.abs(opponent.x - my.x); 
                    else 
                        vectorX = 0;

                    if (deltaY != 0)
                        vectorY = ( opponent.y - my.y ) / Math.abs(opponent.y - my.y);
                    else
                        vectorY = 0;

            //console.log(vectorX, vectorY);



            
for (let x = my.x-8; x <= my.x+8; x++){
    for (let spell of state.spells){
        if (x == spell.xy.x){
                if (x < my.x){
                    if (spell.dir.x > 0){
                        if (my.y-1 == Cell.EMPTY){
                            action.type = ActionType.MOVE; 
                            action.dir = new Direction(0,-1);
                            didDodged = true;
                        }else{
                            action.type = ActionType.MOVE; 
                            action.dir = new Direction(0,1);
                            didDodged = true;
                        }
                    }
                }
        }
    }
}
if (!didDodged){
    for (let y = my.y-8; y <= my.y+8; y++){
         for (let spell of state.spells){
        if (y == spell.xy.y){
                if (y < my.y){
                    if (spell.dir.y > 0){
                        if (my.x-1 == Cell.EMPTY){
                            action.type = ActionType.MOVE; 
                            action.dir = new Direction(-1,0);
                            didDodged = true;

                        }else{
                            action.type = ActionType.MOVE; 
                            action.dir = new Direction(1,0);
                            didDodged = true;

                        }
                    }
                }
        }
    }
}
}



if (!didDodged){

    if( (deltaX == 0 && deltaY > 1 ) || (deltaY == 0 && deltaX > 1 ) ) 
    {    
        action.type = ActionType.CAST;
        action.spell = new FireballSpell();            
        action.spell.dir = new Direction(vectorX,vectorY); // вектор атаки
    }
    else
    {
                if (deltaX > 1 && deltaY > 1) { //main if
                    if (deltaX < deltaY){
                        action.type = ActionType.MOVE; 
                        action.dir = new Direction(vectorX,0); 
                    }else if(deltaX > deltaY){
                        action.type = ActionType.MOVE; 
                        action.dir = new Direction(0,vectorY); 
                    } else {
                        action.type = ActionType.MOVE; 
                        action.dir = new Direction(vectorX,0); 
                    }
                }else{
                    if (deltaX == 1){  
                        if (deltaY > 3){                         // or 3 - better
                            action.type = ActionType.MOVE; 
                            action.dir = new Direction(0,vectorY); 
                        }else{
                            readyToFire = true;
                        }

                    }else if (deltaY == 1) {
                        if (deltaX > 3) {
                            action.type = ActionType.MOVE; 
                            action.dir = new Direction(vectorX,0); 
                        }else
                            readyToFire = true;
                    } 
                }   // main

// function
                if (readyToFire == true) {                  // start if
                    if (deltaX + deltaY < 2) {
                        if ( my.x - vectorX == Cell.EMPTY){ // если склянка или другой маг - Error
                            action.type = ActionType.MOVE; 
                            action.dir = new Direction((-1)*vectorX,0); 
                        }else if( my.y - vectorY == Cell.EMPTY){
                            action.type = ActionType.MOVE; 
                            action.dir = new Direction(0,(-1)*vectorY); 
                        }   
                        else {                          // кажется тут надо допилить
                            // fireball - attack 
                        }
                    }else{
                        if (deltaX < deltaY){
                            action.type = ActionType.MOVE; 
                            action.dir = new Direction(vectorX,0); 
                        }else{
                            action.type = ActionType.MOVE; 
                            action.dir = new Direction(0,vectorY); 
                        }
                    }  
                }                                           // end if
            } 
        return action;
        }    

    }
}