var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;


//create feed and lastFed variable here
var feed, lastFed;
var fedTime;
var lastFedTime;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  lastFedS=database.ref('FeedTime');
  lastFedS.on("value",readFeedTime);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
feed=createButton("Feed The Dog");
feed.position(700,95);
feed.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
 // fedTime=database.ref('')

  //write code to display text lastFed time here
  if(lastFedTime>=12){
    console.log(lastFedTime);
    fill("white");
    text("Last Fed: "+lastFedTime%12+" PM",350,50);
  }

  else if(lastFedTime==0) {
    text("Last Fed: 12AM",350,50);
  }
 
  else{
    text("Last Fed: "+lastFedTime+" AM",350,50);
  }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function readFeedTime(data){
  
  lastFedTime=data.val();
  console.log(lastFedTime);
  foodObj.setFedTime(lastFedTime);
}


function feedDog(){
  dog.addImage(happyDog);

  var food_stock_val=foodObj.getFoodStock;

  delFoods();

  lastFed = hour();
 
  
  

  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function delFoods(){
  foodS--;
  database.ref('/').update({
    Food:foodS

  })

  database.ref('/').update({
    FeedTime:hour()
  })
}






