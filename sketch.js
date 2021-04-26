//P-36 WHTJR - VIRTUAL PET V2 - MASTER
//WAIT HOW DID YOU GET HERE
//At 12:30 26-04-2021

var standingDogImage, lyingDogImage, doggo;
var database;
var foodS, foodStock, readStock, writeStock;
var milk, milkImage;
var feedYourPet, addMoreFood;
var fedTime, lastFed;
var foodObj;

function preload() {
  standingDogImage = loadImage("dogImg.png");
  lyingDogImage = loadImage("dogImg1.png");
  milkImage = loadImage("Milk.png");

}

function setup() {
    createCanvas(1000, 500);

    console.log("https://console.firebase.google.com/project/project-35---virtual-pet-43f40/database/project-35---virtual-pet-43f40-default-rtdb/data ; was not allowed to start");
    database = firebase.database();

    foodObj = new thisFood();

    feedYourPet = createButton('Feed your Pet');
    feedYourPet.position(300, 80);
    feedYourPet.style('width', '150px');
    feedYourPet.style('height', '50px')
    feedYourPet.style('background', 'lightblue');
    feedYourPet.style('font-family', 'Verdana');
    feedYourPet.mousePressed(feedYourPetRN);

    addMoreFood = createButton('Add more bottles');
    addMoreFood.position(950, 80);
    addMoreFood.style('width', '150px');
    addMoreFood.style('height', '50px')
    addMoreFood.style('background', 'lightblue');
    addMoreFood.style('font-family', 'Verdana');
    addMoreFood.mousePressed(addEvenMoreFood);
  
    doggo = createSprite(870, height/2, 50, 50);
    doggo.addImage(standingDogImage);
    doggo.scale= 0.3;

    foodStock = database.ref('Food');
    foodStock.on("value", readStock);

    fedTime = database.ref('feedTime');
    fedTime.on("value", function(data) {
        lastFed = data.val();      
    })

    setTimeout(function(){ foodObj.hideTextLoader(); }, 3800);
    
}

function draw() {
    background(255, 120, 0);

    foodObj.display(foodStock);
    foodObj.displayTextLoader();
    foodObj.writeStock()
  
    textSize(15);
    fill(255, 255, 255);
    text("Remaining bottles : "+foodStock, 50, 450);

    if (lastFed >= 12) {
    text("Last Feed : "+lastFed%12 + "PM", 800, 450);
    } else if (lastFed == 0) {
      text("Last Feed : 12 AM", 800, 450);
    } else {
      text("Last Feed : "+lastFed + "AM", 800, 450);
    }

    drawSprites();
}

function readStock(data) {
  foodStock = data.val();
}

function writeStock(x) {

  if (foodStock.x <= 0) {
    text("Oh no! You're out of bottles! :c", 250, 50);
    foodStock.x = 0;
  } 

  database.ref('/').update({
    Food:x
  })
}

function feedYourPetRN() {
    doggo.addImage(lyingDogImage);
    
    foodObj.updateFoodStock(foodStock -0);
    database.ref('/').update({
      Food : foodStock - 1
      //fedTime : hour()
    })
}

function addEvenMoreFood() {
    foodStock++;
    database.ref('/').update({
      Food : foodStock+1
    })
}

