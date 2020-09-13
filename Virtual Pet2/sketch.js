var dog,dogImg, happyDog, database, foodS, foodStock,fedTime;
var food;

function preload(){
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();

  dog = createSprite(400,400,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  
  food = new Food();
}


function draw() { 
  background(46,139,87); 

  /*if(keyWentDown("D")){
    dog.addImage(happyDog);
    writeStock(foodS);
  }*/

  //console.log(foodS);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  feed.mouseReleased(resetDog);

  addFood = createButton("Add Food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods);

  /*if(lastFed>=12){
    text("lastFed:"+lastFed%12+"PM",600,200);
  }
  else if(lastFed===0){
    text("lastFed:12AM",600,200);
  }
  else{
    text("lastFed:"+lastFed+"AM",600,200);
  }*/
  
  //console.log(food);

  //keyPressed();
  drawSprites();
  textSize(20);
  fill(255,255,255)

  if(foodS!==undefined){
  text("Food:"+foodS,100,400);
  }
}

function readStock(data) {
  foodS = data.val();
}

function feedDog(){
  dog.addImage(happyDog);

  if(foodS<=0){
    foodS = 0;
  }
  else{
    foodS = foodS-1;
  }

  database.ref('/').update({
    Food:foodS
  })
}

function resetDog(){
  dog.addImage(dogImg);
}

function addFoods(){
  if(foodS<=0){
    foodS = 20;
  }
}





