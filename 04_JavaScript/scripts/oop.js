function Dog(name) {
   this.name = name;

   this.bark = function() {
      console.log('Bark!');
   };
}

function Cat(name) {
   this.name = name;
}

Cat.prototype.meow = function() {
   console.log("Meow!");
};

window.onload = function() {
   var dog = new Dog('Spot');
   console.log("The dog's name is " + dog.name);
   dog.bark();

   var cat = new Cat('Mittens');
   console.log("The cat's name is " + cat.name);
   cat.meow();

   var sphynx = cat;
   sphynx.name = "Ugly Cat";
   sphynx.numHairs = 0;
   sphynx.doYouLoveMe = function() {
      return false;
   };
   sphynx.meow = function() {
      console.log('Hairless meow!');
   };
   console.log("The cat's name is now " + cat.name);
   cat.meow();
   console.log('Do we love it? ' + cat.doYouLoveMe());
   console.log(cat.meow);
};
