class thisFood {
    constructor() {
        this.lastFed;
        this.image = loadImage("Milk.png");

        this.loader = createElement('h3');
        
    }
    updateFoodStock(x) {
        database.ref('/').update({
            Food : x
        });
    }

    deductFoodStock(x) {
        database.ref('/').update({
            Food : x
        });
    }

    displayTextLoader() {
        this.loader.html("In queue, please wait...");
        this.loader.position(600, 50);
    }

    hideTextLoader() {
        this.loader.hide();
    }

    writeStock() {

        if (foodStock <= 0) {
          foodStock = 0;
        } 
      
      }

    display(foodStock) {
        var x=150, y=100;

        imageMode(CENTER);
        image(this.image, -50, 220, 70, 70);
        this.foodStock = foodStock;

        if(this.foodStock!=0) {
            for(var i=0; i<this.foodStock; i++) {
                if (i%8 === 0) {
                    x = 150;
                    y=y+50;
                }

                image(this.image, x, y, 50, 50);
                x=x+30;
            }
        }
    }


}