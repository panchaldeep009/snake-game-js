
// Get Element by Id 
  function el(v,a,count) {
    if(a){
      return document.querySelectorAll(v)[a];
    } else {
      return document.querySelector(v);}
  }
// Get Element Style
  function s(e) {
    return e.style;
  }
// Current Width 
  function winW() {
      return window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;
  }
// Current Height 
  function winH() {
      return window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight;
  }
// Get Minimum Width or Height
  function minWinSize() {
      if (winW() < winH()) {
          return winW();
      } else {
          return winH();
      }
  }
//Suffle Array For Random
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }
// Max Game canvas size 
  var gameCanvasSize = 800;
// determine game block 
  var blockSize,block = 20;
// game block in pixel
  var blockSize;
// Set Game Canvas and Block 
function SetCanvas(){
  // determine game canvas 
    if(minWinSize()*0.85<1000){
      gameCanvasSize = minWinSize()*0.85;
    }
  // determine game block in pixel
    blockSize = gameCanvasSize/block;
  // Set Game Canvas 
    el('#gameCanvas').style.width = gameCanvasSize+'px';
    el('#gameCanvas').style.height = gameCanvasSize+'px';
  }

// Get Sanke Speed 
function sSpeed(){ return el('#speed').value; }
// Get Level 
function getLevel(){ return el('#level').value }
// Get Theme 
function getT(){ return el('#theme').value; }
// set Globle Veriables 
var snakeRun,snakeRunning;
var wallX,wallY,food,preF = [];
// Snakes 
var theSnake = [];
// Players upto 8 
var players = 8;
// Snake Direction 
var dir = [];
// Snake Style 
var clS = [1,2,3,4,5,6,7,8];
// Suffle Snake Style 
shuffleArray(clS);
// Get Snake Part Element 
function sp(n,i){
    if(el("#snake"+n+" s",i)){
      return el("#snake"+n+" s",i);
    } else {
    // create if not exist 
      iner = el("#snake"+n+"").innerHTML;
      el("#snake"+n+"").innerHTML = iner+'<s></s>';
      return el("#snake"+n+" s",i);
    }
  }
// Get Snake Part Holding Container 
function snkC(n){
    if(el("#snake"+n)){
      return el("#snake"+n);
    } else {
    // create if not exist 
      snkCl = clS[n-1];
      iner = el("#gameCanvas").innerHTML;
      el("#gameCanvas").innerHTML = iner+'<div id="snake'+n+'" class="snake'+snkCl+'"></div>';
      return el("#snake"+n);
    }
  }
// Get food Element 
function fd(){
    if(el("#food s")){
      return el("#food s");
    } else {
    // create if not exist 
      iner = el("#food").innerHTML;
      el("#food").innerHTML = iner+'<s></s>';
      return el("#food s");
    }
  }
// Get Wall Element 
function wallE(i){
    if(el("#wall s",i)){
      return el("#wall s",i);
    } else {
    // create if not exist 
      iner = el("#wall").innerHTML;
      el("#wall").innerHTML = iner+'<s class="wall"></s>';
      return el("#wall s",i);
    }
  }
// Get Score Element 
function scorE(n){
    if(el("#score"+n+" b")){
      return el("#score"+n+" b");
    } else {
    // create if not exist 
      iner = el("#cont").innerHTML;
      el("#cont").innerHTML = iner+'<b id="score'+n+'"> Player '+n+' SCORE : <b>0</b></b>';
      return el("#score"+n+" b");
    }
  }
// Start Game 
startGame();
// On game start 
function startGame(){
  // Set Players
  players = el('#players').value;
  // Clean Game Canvas 
  el("#gameCanvas").innerHTML ='<div id="food"></div><div id="wall"></div>';
  // Set canvas 
    SetCanvas();
  // Snake puse in game start
    FirstStart = false;
  // Snake Position Part,X,Y,Rotation,Moving direction 
    for (i = 0; i < players; i++) {
      theSnake[i] = [[1,block/2,block/2+i,1,1,1],[2,block/2-1,block/2+i,1,1],[3,block/2-2,block/2+i,1,1]];
    }
    /* Snake direction 
        1 = Right, 2 = Down, 3 = top, 4 = Left */
    
    for (i = 0; i < theSnake.length; i++) {
      dir[i+1] = 1;
    }
  // Wall Position X and Y axies 
    wallX = [];
    wallY = [];
  // Food Position [X,Y] axies 
    food = [];
  // Previous Position [X,Y] axies 
    preF = [-1,-1];
  // Set walls by Current level
    SetLevel(getLevel());
  // Set Food Position 
    setFood();
  // Set Food Position 
    setTheme(getT());
  //Clean Snake 
    for (i = 0; i < theSnake.length; i++) {
      snkC(i+1).innerHTML = "";
    }
  // Put Snake in Canvas 
    for (pc = 1; pc <= theSnake.length; pc++) {
      updateSnake(theSnake[(pc-1)],pc);
      if(FirstStart){
        snakeRun = runSnake(sSpeed());
      // Snake Running Status 
        snakeRunning = true;
      } else {
      // Snake Running Status 
        snakeRunning = false;
      }
    }
  // Set All Score to Zero 
    for(var n=1;n<=players;n++){
      scorE(n).innerHTML = '0';
    }
  }

// Set Food on random position 
function setFood(){
  do {
  // Get random number 
    food[0] = getRNum(0, block-1);
    food[1] = getRNum(0, block-1);
  } 
  // Reset postion if snake can't reach on that position
  while(nothingON(food[0],food[1]));
  
  s(fd()).left = food[0]*blockSize+'px';
  s(fd()).top = food[1]*blockSize+'px';
  s(fd()).width = blockSize+'px';
  s(fd()).height = blockSize+'px';
  fd().className = 'f'+getRNum(1,6);
  s(fd()).display = 'block';
}
// Return 0 if maximum block reach and Return to maximum-1 if it reach to 0
function blockN(n){
  if(n >= block){
    return 0;
  }
  if(n < 0){
    return block-1;
  }
  return n;
}
// Generate Random Number 
function getRNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
// Return False if there is nothing on position X & Y
function nothingON(x,y){
  // Return True if there is a wall
  for(o=0;o<wallX.length;o++){
    if(wallX[o] == x && wallY[o] == y){ 
      return true;
    }
  }
  // Return True if there is a Snake
  for(var i=0;o<theSnake.length;i++){
    for(o=0;o<theSnake[i].length;o++){
      if(theSnake[i][o][1] == x && theSnake[i][o][2] == y){ return true; }
    }
  }
  return false;
}
// Set Theme<n>
function setTheme(n){
  document.body.className = "theme"+n;
  s(el('#gameCanvas')).backgroundImage = "url('img/gameThemes/theme"+n+"/canvas.png')";
  // To keep Nokia snake theme if only one player 
  if(players == 1 && n == 1){ el("#snake1").className = 'snake1'; }
}
// Change Direction of snake to left of it self
function goLeft(spn){
  if(dir[spn]==1){ dir[spn]=3;}
  if(dir[spn]==4){ dir[spn]=2;}
  if(dir[spn]==2){ dir[spn]=1;}
  if(dir[spn]==3){ dir[spn]=4;}
}
// Change Direction of snake to Right of it self
function goRight(spn){
  if(dir[spn]==1){ dir[spn]=2;}
  if(dir[spn]==4){ dir[spn]=3;}
  if(dir[spn]==2){ dir[spn]=4;}
  if(dir[spn]==3){ dir[spn]=1;}
}
// Run changedirection function on any key Press
document.onkeydown = changedirection;
// Check press key and set snake direction 
function changedirection(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
      dir[1] = 3;
    }
    else if (e.keyCode == '37') {
      dir[1] = 4;
    }
    else if (e.keyCode == '39') {
      dir[1] = 1;
    }
    else if (e.keyCode == '40') {
      dir[1] = 2;
    }
    // Stop snake on space press 
    if (e.keyCode == '32') {
      if(!snakeRunning) {
        snakeRun = runSnake(sSpeed());
        snakeRunning = true;
      }
      else {
        clearInterval(snakeRun);
        snakeRunning = false;
      }
    }
}
// Swift all snake part to next position in time interval 's' 
function runSnake(s){
  return setInterval(function(){
    for (pc = 0; pc < theSnake.length; pc++) {
      /*if(pc == 0){
      // Set Controls to player one 
        runSingalSnake(theSnake[pc],pc+1);
      } else {
        // Assign Computer Player 
        */AIplayer(theSnake[pc],pc+1);/*
      }*/
    }
  }, 200/s);
}
// Assign Computer Player
function AIplayer(snk,spn){
  newDir = null;
  el("#update").innerHTML = snk[0][1]+','+snk[0][2]+','+dir[spn]+' ';
  // Change Direction if there is any element next coming
  if((mouthOnOUT(snk[0][1]+1,snk[0][2],snk) && dir[spn] == 1)||
      (mouthOnOUT(snk[0][1]-1,snk[0][2],snk) && dir[spn] == 4)){
    //Change to direction that bring nears to food
    if(food[1]>snk[0][2]){
      //Change to other direction if there is OUT element next to snake
      if(!mouthOnOUT(snk[0][1],snk[0][2]+1,snk)){ dir[spn] = 2; }
      else { newDir = 3; }
    } else if(food[1]<=snk[0][2]){
      if(!mouthOnOUT(snk[0][1],snk[0][2]-1,snk)){ dir[spn] = 3; }
      else { newDir = 2; }
    }
  } else if((mouthOnOUT(snk[0][1],snk[0][2]+1,snk) && dir[spn] == 2)||
      (mouthOnOUT(snk[0][1],snk[0][2]-1,snk) && dir[spn] == 3)){
    //Change to direction that bring nears to food
    if(food[0]>snk[0][1]){
      //Change to other direction if there is OUT element next to snake
      if(!mouthOnOUT(snk[0][1]+1,snk[0][2],snk)){ dir[spn] = 1; }
      else { newDir = 4; }
    } else if(food[1]<=snk[0][1]){
      if(!mouthOnOUT(snk[0][1]-1,snk[0][2],snk)){ dir[spn] = 4; }
      else { newDir = 1; }
    }
  }
  // if newDir is not assign then try to go near to food
  if(newDir == null){
    if(dir[spn]==1||dir[spn]==4){
      //If food is in same axies
      if(food[0]==snk[0][1]){
        if((snk[0][2]-food[1])>0){
          if((snk[0][2]-food[1])<(((block-1)-snk[0][2])+food[1])){
            for(i=food[1]+1;i<snk[0][2];i++){
              if(!mouthOnOUT(snk[0][1],i,snk)){ newDir = 2; }
            }
            if(newDir == null){
              newDir = 3;
            }
          } else {
            for(i=0;i<food[1];i++){
              if(!mouthOnOUT(snk[0][1],i,snk)){ newDir = 3; }
            }
            for(i=snk[0][2];i<block;i++){
              if(!mouthOnOUT(snk[0][1],i,snk)){ newDir = 3; }
            }
            if(newDir == null){
              newDir = 2;
            }
          }
        } else {
          if((food[1]-snk[0][2])<(((block-1)-food[1])+snk[0][2])){
            for(i=snk[0][2];i<food[1];i++){
              if(!mouthOnOUT(snk[0][1],i,snk)){ newDir = 2; }
            }
            if(newDir == null){
              newDir = 3;
            }
          } else {
            for(i=0;i<snk[0][2];i++){
              if(!mouthOnOUT(snk[0][1],i,snk)){ newDir = 3; }
            }
            for(i=food[1];i<block;i++){
              if(!mouthOnOUT(snk[0][1],i,snk)){ newDir = 3; }
            }
            if(newDir == null){
              newDir = 2;
            }
          }
        }
      }
    } else if(dir[spn]==2||dir[spn]==3){
      //If food is in same axies
      if(food[1]==snk[0][2]){
        if((snk[0][1]-food[0])>0){
          if((snk[0][1]-food[0])<(((block-1)-snk[0][1])+food[0])){
            for(i=food[0]+1;i<snk[0][1];i++){
              if(!mouthOnOUT(i,snk[0][2],snk)){ newDir = 4; }
            }
            if(newDir == null){
              newDir = 1;
            }
          } else {
            for(i=0;i<food[0];i++){
              if(!mouthOnOUT(i,snk[0][2],snk)){ newDir = 4; }
            }
            for(i=snk[0][1];i<block;i++){
              if(!mouthOnOUT(i,snk[0][2],snk)){ newDir = 4; }
            }
            if(newDir == null){
              newDir = 1;
            }
          }
        } else {
          if((food[0]-snk[0][1])<(((block-1)-food[0])+snk[0][1])){
            for(i=snk[0][1];i<food[0];i++){
              if(!mouthOnOUT(i,snk[0][2],snk)){ newDir = 4; }
            }
            if(newDir == null){
              newDir = 1;
            }
          } else {
            for(i=0;i<snk[0][1];i++){
              if(!mouthOnOUT(i,snk[0][2],snk)){ newDir = 1; }
            }
            for(i=food[0];i<block;i++){
              if(!mouthOnOUT(i,snk[0][2],snk)){ newDir = 1; }
            }
            if(newDir == null){
              newDir = 4;
            }
          }
        }
      }
    }
  }
  if(newDir != null){
    //Change direction if there is newDir assign
    dir[spn] = newDir;
  }
  runSingalSnake(snk,spn);
}
// Run Sanke on direction
function runSingalSnake(snk,spn){
    // Update snake part Next position from Tail to Head 
    for (i = snk.length-1; i > 0; i--) {
        // Get Next position and rotation 
        snk[i][1] = snk[i-1][1];
        snk[i][2] = snk[i-1][2];
        snk[i][3] = snk[i-1][3];
        snk[i][4] = snk[i-1][4];

        // if this is last part of snake 
        if(i == snk.length-1){
          // make tail 
          if(snk[i][0]){
            if(snk[i][0] == 30){
              snk[i][0] = 30;
            } else {
              snk[i][0] = 3;
            }
          } else {
            snk[i][0] = 3;
          }
          // Reset previous food position
          if(snk[i][1] == preF[0] && snk[i][2] == preF[1]){
            preF = [-1,-1];
          }
          snk[i][3] = snk[i-1][3];
        }
        // If this part is not head and not tail
        if(i!=0 && i!=snk.length-1){
          // Set body part
          snk[i][0] = 2;
        }
    }
    // Set Head 
    snk[0][0] = 1;
    if((snk[0][4] == 1 || snk[0][4] == 4)&&(dir[spn] == 3 || dir[spn] == 2)||
        (snk[0][4] == 3 || snk[0][4] == 2)&&(dir[spn] == 1 || dir[spn] == 4)
      ) {
      // Set Previous direction 
      snk[0][5] = snk[0][4];
      // Set New direction
      snk[0][4] = dir[spn];
    } else {
      dir[spn] = snk[0][4];
    }
    if(snk[0][4] == 1){
      snk[0][1] = blockN(snk[0][1]+1);
    }
    if(snk[0][4] == 2){
      snk[0][2] = blockN(snk[0][2]+1);
    }
    if(snk[0][4] == 3){
      snk[0][2] = blockN(snk[0][2]-1);
    }
    if(snk[0][4] == 4){
      snk[0][1] = blockN(snk[0][1]-1);
    }
    // Open Mouth if upcoming block has food  
    if(snk[0][4] == 1 && snk[0][1] == food[0]-1 && snk[0][2] == food[1]){snk[0][0] = 10;}
    if(snk[0][4] == 4 && snk[0][1] == food[0]+1 && snk[0][2] == food[1]){snk[0][0] = 10;}
    if(snk[0][4] == 2 && snk[0][2] == food[1]-1 && snk[0][1] == food[0]){snk[0][0] = 10;}
    if(snk[0][4] == 3 && snk[0][2] == food[1]+1 && snk[0][1] == food[0]){snk[0][0] = 10;}

    // Open Mouth if next sanke tail coming 
    for (i = 0; i < theSnake.length; i++) {
      if(i!=spn-1){
        oSnk = theSnake[i];
        if(snk[0][4] == 1 && snk[0][1] == oSnk[oSnk.length-2][1]-1 && snk[0][2] == oSnk[oSnk.length-2][2]){snk[0][0] = 10;}
        if(snk[0][4] == 4 && snk[0][1] == oSnk[oSnk.length-2][1]+1 && snk[0][2] == oSnk[oSnk.length-2][2]){snk[0][0] = 10;}
        if(snk[0][4] == 2 && snk[0][2] == oSnk[oSnk.length-2][2]-1 && snk[0][1] == oSnk[oSnk.length-2][1]){snk[0][0] = 10;}
        if(snk[0][4] == 3 && snk[0][2] == oSnk[oSnk.length-2][2]+1 && snk[0][1] == oSnk[oSnk.length-2][1]){snk[0][0] = 10;}
      }
    }
    // if food position = Mouth position  
    if(snk[0][1] == food[0] && snk[0][2] == food[1]){
      // Store Previous Food Position 
      preF[0] = food[0];
      preF[1] = food[1];
      // Set New Food Position 
      setFood();
      // Increase Score 
      scoreUp(spn);
      // Increase Snake Size 
      snk.push([]);
    }
    // Set Rotation  
    snk[0][3] = dir[spn];


    // Update snake part Next position from Head to Tail
    for (i = 1; i < snk.length-1; i++) {
        // Set body part
        snk[i][0] = 2;
        // If part direction is changed then add turing Part
        if(snk[i-1][4]!=snk[i][4]){
          snk[i][0] = 21;
          // rotate turing Part to right angle
          if((snk[i][4]==3 && snk[i-1][4]==4)){
            snk[i][3] = 1;
          }
          if((snk[i][4]==1 && snk[i-1][4]==3) || (snk[i][4]==1 && snk[i-1][4]==3)){
            snk[i][3] = 2;
          }
          if((snk[i][4]==4 && snk[i-1][4]==3) || (snk[i][4]==2 && snk[i-1][4]==1)){
            snk[i][3] = 3;
          }
          if((snk[i][4]==3 && snk[i-1][4]==1)){
            snk[i][3] = 4;
          }
        }
        // If this part position = pervious food
        if(snk[i][1] == preF[0] && snk[i][2] == preF[1]){
          // Set full turn part
          snk[i][0] = 22;
          if(snk[i-1][4]==snk[i][4]){
          // Set full body part
            snk[i][0] = 20;
          }
        }
    }
    snk[snk.length-1][3] = snk[snk.length-2][4];
    el("#update").innerHTML = el("#update").innerHTML+snk[0][1]+","+snk[0][2]+","+dir[spn];
    // Update part after changing 
    updateSnake(snk,spn);
    // Eating other Snake Tail 
    for (i = 0; i < theSnake.length; i++) {
      if(i!=spn-1){
        oSnk = theSnake[i];
        if(snk[0][1]==oSnk[oSnk.length-1][1]&&snk[0][2]==oSnk[oSnk.length-1][2]&&oSnk.length>2){
          oSnk.pop();
          sp(i+1,oSnk.length-1).remove();
          oSnk[oSnk.length-1][0]=30;
          snk.push([]);
          scoreDown(i);
          scoreUp(spn);
        }
      }
    }
}
// Update Visual Snake
function updateSnake(sn,spn){
  // Check this snake mouth x and y on Out Elements ( snake body itself (sn = this snake), wall) 
  if(!mouthOnOUT(sn[0][1],sn[0][2],sn)){
    for (i = 0; i < sn.length; i++) {
      sp(spn,i);
      switch(sn[i][0]) {
        case 1:
            sp(spn,i).className = "mouth";
            break;
        case 10:
            sp(spn,i).className = "mouthOpen";
            break;
        case 2:
            sp(spn,i).className = "body";
            break;
        case 20:
            sp(spn,i).className = "bodyFull";
            break;
        case 21:
            sp(spn,i).className = "turn";
            break;
        case 22:
            sp(spn,i).className = "turnFull";
            break;
        case 3:
            sp(spn,i).className = "tail";
            break;
        case 30:
            sp(spn,i).className = "tailEatten";
            break;
      }
      switch(sn[i][3]) {
        case 1:
          if(sn[i][0]==21||sn[i][0]==22){s(sp(spn,i)).transform = "rotate(90deg)";}
          else if(sn[i][0]==3||sn[i][0]==30){s(sp(spn,i)).transform = "rotate(90deg)";}
          else {s(sp(spn,i)).transform = "rotate(0deg)";}
          break;
        case 2:
          if(sn[i][0]==21||sn[i][0]==22){s(sp(spn,i)).transform = "rotate(180deg)";}
          else if(sn[i][0]==3||sn[i][0]==30){s(sp(spn,i)).transform = "rotate(180deg) scaleX(-1)";}
          else {
            if(sn[i][5] == 1){
              s(sp(spn,i)).transform = "rotate(90deg)";
            } else {
              s(sp(spn,i)).transform = "rotate(90deg) scaleY(-1)";
            }
          }
          break;
        case 3:
          if(sn[i][0]==21||sn[i][0]==22){s(sp(spn,i)).transform = "rotate(-90deg)";}
          else if(sn[i][0]==3||sn[i][0]==30){s(sp(spn,i)).transform = "rotate(0deg)";}
          else {
            if(sn[i][5] == 1){
              s(sp(spn,i)).transform = "rotate(-90deg) scaleY(-1)";
            } else {
              s(sp(spn,i)).transform = "rotate(-90deg)";
            }
          }
          break;
        case 4:
          if(sn[i][0]==21||sn[i][0]==22){s(sp(spn,i)).transform = "rotate(0deg)";}
          else if(sn[i][0]==3||sn[i][0]==30){s(sp(spn,i)).transform = "rotate(-90deg) scaleX(-1)";}
          else {s(sp(spn,i)).transform = "scaleX(-1)";}
          break;
      }
      s(sp(spn,i)).left = sn[i][1]*blockSize+'px';
      s(sp(spn,i)).top = sn[i][2]*blockSize+'px';
      s(sp(spn,i)).width = blockSize+'px';
      s(sp(spn,i)).height = blockSize+'px';
      s(sp(spn,i)).display = 'block';
    }
  } else {
    onOut(sn,spn);
  }
}
// Check Snake is out or not
function onOut(sn,spn){
  //stop snake
  clearInterval(snakeRun);
  // if OUT then Restart Game
  winer = 0;
  winerScor = 0;
    
  for(var n=1;n<=players;n++){
    if(winerScor < parseInt(scorE(n).innerHTML)){
      winerScor = parseInt(scorE(n).innerHTML);
      winer = n;
    }
  }
  //alert("Player "+winer+" Wins with score : "+winerScor);
  //startGame();
}
// Increase Score  
function scoreUp(n){
  scorE(n).innerHTML = parseInt(scorE(n).innerHTML)+1;
}
// Decrease Score
function scoreDown(n){
  scorE(n).innerHTML = parseInt(scorE(n).innerHTML)-1;
}
// Check if there is any OUT Element on X,Y position
function mouthOnOUT(x,y,sn){
  // Check if next block has sanke body or not 
  for(o=1;o<sn.length;o++){
    if(sn[o][1] == x && sn[o][2] == y){ return true; }
  }
  // Check next block has wall or not 
  if(wallX.length>0){
    for(o=0;o<wallX.length;o++){
      if(wallX[o] == x && wallY[o] == y){ return true; }
    }
  }
  return false;
}
// Change Players Speed   
function changePlayers(){
  clearInterval(snakeRun);
  snakeRunning = false;
  el('#players').blur();
  // Change Players
  var players = el('#players').value;
  // Restart Game  
  startGame();
};
// Change Snake Speed   
function changeSpeed(){
  clearInterval(snakeRun);
  snakeRunning = false;
  el('#speed').blur();
};
// Change level   
function changeLevel(){
  clearInterval(snakeRun);
  snakeRunning = false;
  SetLevel(getLevel());
  el('#level').blur();
  // Restart Game  
  startGame();
};
// Change Theme   
function changeTheme(){
  setTheme(getT());
  el('#theme').blur();
};
/***********************************
          Levels
**********************************/
function SetLevel(Level){
  // Clean Currnet Wall 
  el("#wall").innerHTML = "";
  wallX = [];
  wallY = [];
  // Count total Block 
  for(w=0;w<block;w++){

    // Set Walls X and Y postion 
    if(Level == 1){
      wallX.push(w);
      wallY.push(0);
      wallX.push(0);
      wallY.push(w);
      wallX.push(w);
      wallY.push(block-1);
      wallX.push(block-1);
      wallY.push(w);
    } else if(Level == 2){
      if(w<(block/8)){
        wallX.push(w);
        wallY.push(0);
        wallX.push(0);
        wallY.push(w);
        wallX.push(w);
        wallY.push(block-1);
        wallX.push(block-1);
        wallY.push(w);}
      if(w>(block-1)-(block/8)){
        wallX.push(w);
        wallY.push(block-1);
        wallX.push(block-1);
        wallY.push(w);
        wallX.push(0);
        wallY.push(w);
        wallX.push(w);
        wallY.push(0);
        wallX.push(w);
        wallY.push(0);
        wallX.push(block-1);
        wallY.push(w);}
      if(w>block/4&&w<(block-1)-(block/4)){
        wallX.push(w);
        wallY.push((block/2)-2);
        wallX.push(w);
        wallY.push((block/2)+2);}
    } else if(Level == 3){ 
        if(w<(block/2+3)){
          wallX.push((block/2)-3);
          wallY.push(w);}
        if(w>block-(block/2+3)){
          wallX.push((block/2)+3);
          wallY.push(w);}
        if(w<((block/2)-1)){
          wallX.push(w);
          wallY.push(block/2+5);}
        if(w>((block/2)+1)){
          wallX.push(w);
          wallY.push(block-(block/2+5));
        }
    } else if(Level == 4){
      wallX.push(w);
      wallY.push(0);
      wallX.push(w);
      wallY.push(block-1);
      if(w<block/2-1||w>block/2+1){
        wallX.push(0);
        wallY.push(w);
        wallX.push(block-1);
        wallY.push(w);}
      if(w>4 && w<block-4){
        wallX.push(block/2-4);
        wallY.push(w);
        wallX.push(block/2+4);
        wallY.push(w);}
    } else if(Level == 5){
      wallX.push(w);
      wallY.push(block/2+4);
      if(w<(block/2)-2){
        wallX.push(w);
        wallY.push((block/2)-2);}
      if(w>(block/2)+1){
        wallX.push(w);
        wallY.push((block/2)-2);}
      if(w<(block/2)-2){
        wallX.push((block/2)-3);
        wallY.push(w);}
      if(w>block/2+4){
        wallX.push((block/2)+2);
        wallY.push(w);}
      if(w>5&&w<block-5){
        wallX.push(w);
        wallY.push(0);}
      if(w<4){
        wallX.push(0);
        wallY.push(w);
        wallX.push(w);
        wallY.push(0);}
    } else if(Level == 6){
      wallX.push(w);
      wallY.push(block/2);
      wallX.push(block/2);
      wallY.push(w);
    } else if(Level == 7){
      wallX.push(w);
      wallY.push(block/2);
      if(w>block/2){
        wallX.push(block/2-4);
        wallY.push(w);
        wallX.push(block/2+4);
        wallY.push(w);}
    }
  }
  for(z=0;z<wallX.length;z++){
    s(wallE(z)).display = 'block';
    s(wallE(z)).left = wallX[z]*blockSize+'px';
    s(wallE(z)).top = wallY[z]*blockSize+'px';
    s(wallE(z)).width = blockSize+'px';
    s(wallE(z)).height = blockSize+'px';
  }
}
