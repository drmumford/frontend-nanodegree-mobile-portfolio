/*
Welcome to the 60fps project! Your goal is to make Cam's Pizzeria website run
jank-free at 60 frames per second.

There are two major issues in this code that lead to sub-60fps performance. Can
you spot and fix both?

Built into the code, you'll find a few instances of the User Timing API
(window.performance), which will be console.log()ing frame rate data into the
browser console. To learn more about User Timing API, check out:
http://www.html5rocks.com/en/tutorials/webperformance/usertiming/

Creator:
Cameron Pittman, Udacity Course Developer
cameron *at* udacity *dot* com
*/

// As you may have realized, this website randomly generates pizzas.
// Here are arrays of all possible pizza ingredients.
var pizzaIngredients = {
  "maxNumberOfMeats": 4,
  "meats": [
    "Pepperoni", "Sausage", "Fennel Sausage", "Spicy Sausage", "Chicken", "BBQ Chicken",
    "Chorizo", "Chicken Andouille", "Salami", "Tofu", "Bacon", "Canadian Bacon",
    "Proscuitto", "Italian Sausage", "Ground Beef", "Anchovies", "Turkey", "Ham",
    "Venison", "Lamb", "Duck", "Soylent Green", "Carne Asada", "Soppressata Picante",
    "Coppa", "Pancetta", "Bresola", "Lox", "Guanciale", "Chili", "Beef Jerky",
    "Pastrami", "Kielbasa", "Scallops", "Filet Mignon"
  ],
  "maxNumberOfNonMeats": 3,
  "nonMeats": [
    "White Onions", "Red Onions", "Sauteed Onions", "Green Peppers", "Red Peppers",
    "Banana Peppers", "Ghost Peppers", "Habanero Peppers", "Jalapeno Peppers", "Stuffed Peppers",
    "Spinach", "Tomatoes", "Pineapple", "Pear Slices", "Apple Slices", "Mushrooms",
    "Arugula", "Basil", "Fennel", "Rosemary", "Cilantro", "Avocado", "Guacamole",
    "Salsa", "Swiss Chard", "Kale", "Sun Dried Tomatoes", "Walnuts", "Artichoke",
    "Asparagus", "Caramelized Onions", "Mango", "Garlic", "Olives", "Cauliflower",
    "Polenta", "Fried Egg", "Zucchini", "Hummus"
  ],
  "maxNumberOfCheeses": 2,
  "cheeses": [
    "American Cheese", "Swiss Cheese", "Goat Cheese", "Mozzarella Cheese", "Parmesean Cheese",
    "Velveeta Cheese", "Gouda Cheese", "Muenster Cheese", "Applewood Cheese", "Asiago Cheese",
    "Bleu Cheese", "Boursin Cheese", "Brie Cheese", "Cheddar Cheese", "Chevre Cheese",
    "Havarti Cheese", "Jack Cheese", "Pepper Jack Cheese", "Gruyere Cheese", "Limberger Cheese",
    "Manchego Cheese", "Marscapone Cheese", "Pecorino Cheese", "Provolone Cheese", "Queso Cheese",
    "Roquefort Cheese", "Romano Cheese", "Ricotta Cheese", "Smoked Gouda"
  ],
  "sauces": [
    "Red Sauce", "Marinara", "BBQ Sauce", "No Sauce", "Hot Sauce"
  ],
  "crusts": [
    "White Crust", "Whole Wheat Crust", "Flatbread Crust", "Stuffed Crust"
  ]
};

// Here are arrays of all possible pizza names.
var pizzaNames = {
  "adjectives": [
    // Dark adjectives
    "Dark", "Morbid", "Scary", "Spooky", "Gothic", "Deviant", "Creepy", "Sadistic", "Black",
    "Dangerous", "Dejected", "Haunted", "Morose", "Tragic", "Shattered", "Broken", "Sad",
    "Melancholy", "Somber", "Dark", "Gloomy", "Homicidal", "Murderous", "Shady", "Misty",
    "Dusky", "Ghostly", "Shadowy", "Demented", "Cursed", "Insane", "Possessed", "Grotesque",
    "Obsessed",

    // Color adjectives
    "Blue", "Green", "Purple", "Grey", "Scarlet", "Neon Green", "Neon Blue", "Neon Pink",
    "Hot Pink", "Pink", "Black", "Red", "Maroon", "Silver", "Golden", "Yellow",
    "Orange", "Mustard", "Plum", "Violet", "Cerulean", "Brown", "Lavender",
    "Magenta", "Chestnut", "Rosy", "Copper", "Crimson", "Teal", "Indigo", "Navy", "Azure",
    "Periwinkle", "Brassy", "Verdigris", "Veridian", "Tan", "Raspberry", "Beige",
    "Sandy", "Electric Blue", "White", "Champagne", "Coral", "Cyan",

    // Whimsical adjectives
    "Whimsical", "Silly", "Drunken", "Goofy", "Funny", "Weird", "Strange", "Odd",
    "Playful", "Clever", "Boastful", "Breakdancing", "Hilarious", "Conceited", "Happy",
    "Comical", "Curious", "Peculiar", "Quaint", "Quirky", "Fancy", "Wayward", "Fickle",
    "Yawning", "Sleepy", "Cockeyed", "Dizzy", "Dancing", "Absurd", "Laughing", "Hairy",
    "Smiling", "Perplexed", "Baffled", "Cockamamie", "Vulgar", "Hoodwinked", "Brainwashed",

    // Shiny adjectives
    "Sapphire", "Opal", "Silver", "Gold", "Platinum", "Ruby", "Emerald", "Topaz", "Diamond",
    "Amethyst", "Turquoise", "Starlit", "Moonlit", "Bronze", "Metal", "Jade", "Amber", "Garnet",
    "Obsidian", "Onyx", "Pearl", "Sunlit", "Brass", "Brassy", "Metallic", // Copper, (but it's also a color)

    // Noise adjectives
    "Untuned", "Loud", "Soft", "Shrieking", "Melodious", "Musical", "Operatic", "Symphonic",
    "Dancing", "Lyrical", "Harmonic", "Orchestral", "Noisy", "Dissonant", "Rhythmic", "Hissing",
    "Singing", "Crooning", "Shouting", "Screaming", "Wailing", "Crying", "Howling", "Yelling",
    "Hollering", "Caterwauling", "Bawling", "Bellowing", "Roaring", "Squealing", "Beeping",
    "Knocking", "Tapping", "Rapping", "Humming", "Scatting", "Whispered", "Whispering",
    "Rasping", "Buzzing", "Whirring", "Whistling", "Whistled",

    // Apocalyptic adjectives
    "Nuclear", "Apocalyptic", "Desolate", "Atomic", "Zombie", "Collapsed", "Grim", "Fallen",
    "Collapsed", "Cannibalistic", "Radioactive", "Toxic", "Poisonous", "Venomous", "Disastrous",
    "Grimy", "Dirty", "Undead", "Bloodshot", "Rusty", "Glowing", "Decaying", "Rotten", "Deadly",
    "Plagued", "Decimated", "Rotting", "Putrid", "Decayed", "Deserted", "Acidic",

    // Insulting adjectives
    "Stupid", "Idiotic", "Fat", "Ugly", "Hideous", "Grotesque", "Dull", "Dumb", "Lazy",
    "Sluggish", "Brainless", "Slow", "Gullible", "Obtuse", "Dense", "Dim", "Dazed", "Ridiculous",
    "Witless", "Daft", "Crazy", "Vapid", "Inane", "Mundane", "Hollow", "Vacuous", "Boring",
    "Insipid", "Tedious", "Monotonous", "Weird", "Bizarre", "Backward", "Moronic", "Ignorant",
    "Scatterbrained", "Forgetful", "Careless", "Lethargic", "Insolent", "Indolent", "Loitering",
    "Gross", "Disgusting", "Bland", "Horrid", "Unseemly", "Revolting", "Homely", "Deformed",
    "Disfigured", "Offensive", "Cowardly", "Weak", "Villainous", "Fearful", "Monstrous",
    "Unattractive", "Unpleasant", "Nasty", "Beastly", "Snide", "Horrible", "Syncophantic",
    "Unhelpful", "Bootlicking",

    // Praise adjectives
    "Beautiful", "Intelligent", "Smart", "Genius", "Ingenious", "Gorgeous", "Pretty", "Witty",
    "Angelic", "Handsome", "Graceful", "Talented", "Exquisite", "Enchanting", "Fascinating",
    "Interesting", "Divine", "Alluring", "Ravishing", "Wonderful", "Magnificient", "Marvelous",
    "Dazzling", "Cute", "Charming", "Attractive", "Nifty", "Delightful", "Superior", "Amiable",
    "Gentle", "Heroic", "Courageous", "Valiant", "Brave", "Noble", "Daring", "Fearless", "Gallant",
    "Adventurous", "Cool", "Enthusiastic", "Fierce", "Awesome", "Radical", "Tubular", "Fearsome",
    "Majestic", "Grand", "Stunning",

    // Scientific adjectives
    "Scientific", "Technical", "Digital", "Programming", "Calculating", "Formulating",
    "Cyberpunk", "Mechanical", "Technological", "Innovative", "Brainy", "Chemical",
    "Quantum", "Astro", "Space", "Theoretical", "Atomic", "Electronic", "Gaseous",
    "Investigative", "Solar", "Extinct", "Galactic"
  ],

  "nouns": [
    // Animal nouns
    "Flamingo", "Hedgehog", "Owl", "Elephant", "Pussycat", "Alligator", "Dachsund", "Poodle",
    "Beagle", "Crocodile", "Kangaroo", "Wallaby", "Woodpecker", "Eagle", "Falcon", "Canary",
    "Parrot", "Parakeet", "Hamster", "Gerbil", "Squirrel", "Rat", "Dove", "Toucan", "Raccoon",
    "Vulture", "Peacock", "Goldfish", "Rook", "Koala", "Skunk", "Goat", "Rooster", "Fox",
    "Porcupine", "Llama", "Grasshopper", "Gorilla", "Monkey", "Seahorse", "Wombat", "Wolf",
    "Giraffe", "Badger", "Lion", "Mouse", "Beetle", "Cricket", "Nightingale", "Hawk", "Trout",
    "Squid", "Octopus", "Sloth", "Snail", "Locust", "Baboon", "Lemur", "Meerkat", "Oyster",
    "Frog", "Toad", "Jellyfish", "Butterfly", "Caterpillar", "Tiger", "Hyena", "Zebra", "Snail",
    "Pig", "Weasel", "Donkey", "Penguin", "Crane", "Buzzard", "Vulture", "Rhino", "Hippopotamus",
    "Dolphin", "Sparrow", "Beaver", "Moose", "Minnow", "Otter", "Bat", "Mongoose", "Swan",
    "Firefly", "Platypus",

    // Profession nouns - not included in original implementation.
    //"Doctor", "Lawyer", "Ninja", "Writer", "Samurai", "Surgeon", "Clerk", "Artist", "Actor",
    //"Engineer", "Mechanic", "Comedian", "Fireman", "Nurse", "Rockstar", "Musician", "Carpenter",
    //"Plumber", "Cashier", "Electrician", "Waiter", "President", "Governor", "Senator",
    //"Scientist", "Programmer", "Singer", "Dancer", "Director", "Mayor", "Merchant", "Detective",
    //"Investigator", "Navigator", "Pilot", "Priest", "Cowboy", "Stagehand", "Soldier",
    //"Ambassador", "Pirate", "Miner", "Police",

    // Fantasy nouns
    "Centaur", "Wizard", "Gnome", "Orc", "Troll", "Sword", "Fairy", "Pegasus", "Halfling", "Elf",
    "Changeling", "Ghost", "Knight", "Squire", "Magician", "Witch", "Warlock", "Unicorn",
    "Dragon", "Wyvern", "Princess", "Prince", "King", "Queen", "Jester", "Tower", "Castle",
    "Kraken", "Seamonster", "Mermaid", "Psychic", "Seer", "Oracle",

    // Music nouns - not included in original implementation.
    //"Violin", "Flute", "Bagpipe", "Guitar", "Symphony", "Orchestra", "Piano", "Trombone", "Tuba",
    //"Opera", "Drums", "Harpsichord", "Harp", "Harmonica", "Accordion", "Tenor", "Soprano", "Baritone",
    //"Cello", "Viola", "Piccolo", "Ukelele", "Woodwind", "Saxophone", "Bugle", "Trumpet", "Sousaphone",
    //"Cornet", "Stradivarius", "Marimbas", "Bells", "Timpani", "Bongos", "Clarinet", "Recorder", "Oboe",
    //"Conductor", "Singer",

    // Horror nouns
    "Murderer", "Chainsaw", "Knife", "Sword", "Murder", "Devil", "Killer", "Psycho", "Monster",
    "Godzilla", "Werewolf", "Vampire", "Demon", "Graveyard", "Zombie", "Mummy", "Curse", "Death",
    "Grave", "Tomb", "Beast", "Nightmare", "Frankenstein", "Specter", "Poltergeist", "Wraith",
    "Corpse", "Scream", "Massacre", "Cannibal", "Skull", "Bones", "Undertaker", "Zombie", "Creature",
    "Mask", "Psychopath", "Fiend", "Satanist", "Moon", "FullMoon", // Ghost (but in fantasy)

    // Gross nouns
    "Slime", "Bug", "Roach", "Fluid", "Pus", "Booger", "Spit", "Boil", "Blister", "Orifice",
    "Secretion", "Mucus", "Phlegm", "Centipede", "Beetle", "Fart", "Snot", "Crevice", "Flatulence",
    "Juice", "Mold", "Mildew", "Germs", "Discharge", "Toilet", "Udder", "Odor", "Substance",
    "Fluid", "Moisture", "Garbage", "Trash",

    // Everyday nouns
    "Mirror", "Knife", "Fork", "Spork", "Spoon", "Tupperware", "Minivan", "Suburb", "Lamp",
    "Desk", "Stereo", "Television", "Tv", "Book", "Car", "Truck", "Soda", "Door", "Video",
    "Game", "Computer", "Calender", "Tree", "Plant", "Flower", "Chimney", "Attic", "Kitchen",
    "Garden", "School", "Wallet", "Bottle",

    // Jewelry nouns
    "Earrings", "Ring", "Necklace", "Pendant", "Choker", "Brooch", "Bracelet", "Cameo",
    "Charm", "Bauble", "Trinket", "Jewelry", "Anklet", "Bangle", "Locket", "Finery",
    "Crown", "Tiara", "Blingbling", "Chain", "Rosary", "Jewel", "Gemstone", "Beads",
    "Armband", "Pin", "Costume", "Ornament", "Treasure",

    // Places nouns
    "Swamp", "Graveyard", "Cemetery", "Park", "Building", "House", "River", "Ocean", "Sea",
    "Field", "Forest", "Woods", "Neighborhood", "City", "Town", "Suburb", "Country",
    "Meadow", "Cliffs", "Lake", "Stream", "Creek", "School", "College", "University",
    "Library", "Bakery", "Shop", "Store", "Theater", "Garden", "Canyon", "Highway",
    "Restaurant", "Cafe", "Diner", "Street", "Road", "Freeway", "Alley",

    // Scifi nouns
    "Robot", "Alien", "Raygun", "Spaceship", "UFO", "Rocket", "Phaser", "Astronaut", "Spaceman",
    "Planet", "Star", "Galaxy", "Computer", "Future", "Time Machine", "Wormhole", "Time Traveler",
    "Scientist", "Invention", "Martian", "Pluto", "Jupiter", "Saturn", "Mars", "Quasar",
    "Black Hole", "Warp Drive", "Laser", "Orbit", "Gears", "Molecule", "Electron", "Neutrino",
    "Proton", "Experiment", "Photon", "Apparatus", "Universe", "Gravity", "Dark Matter",
    "Constellation", "Circuit", "Asteroid"
  ]
};

// Chooses random adjective and random noun
function randomName() {
  var adjIndex = parseInt(Math.random() * pizzaNames.adjectives.length);
  var nounIndex = parseInt(Math.random() * pizzaNames.nouns.length);
  return "The " + pizzaNames.adjectives[adjIndex] + " " + pizzaNames.nouns[nounIndex];
}

// These functions return a string of a random ingredient from each respective category of ingredients.
var selectRandomMeat = function() {
  var randomMeat = pizzaIngredients.meats[Math.floor(Math.random() * pizzaIngredients.meats.length)];
  return randomMeat;
};

var selectRandomNonMeat = function() {
  return pizzaIngredients.nonMeats[Math.floor(Math.random() * pizzaIngredients.nonMeats.length)];
};

var selectRandomCheese = function() {
  return pizzaIngredients.cheeses[Math.floor(Math.random() * pizzaIngredients.cheeses.length)];
};

var selectRandomSauce = function() {
  return pizzaIngredients.sauces[Math.floor(Math.random() * pizzaIngredients.sauces.length)];
};

var selectRandomCrust = function() {
  return pizzaIngredients.crusts[Math.floor(Math.random() * pizzaIngredients.crusts.length)];
};

var ingredientItemizer = function(string) {
  return "<li>" + string + "</li>";
};

// Returns a string with random pizza ingredients nested inside <li> tags
var makeRandomPizza = function() {
  var pizza = "";

  var numberOfMeats = Math.floor(Math.random() * pizzaIngredients.maxNumberOfMeats);
  var numberOfNonMeats = Math.floor(Math.random() * pizzaIngredients.maxNumberOfNonMeats);
  var numberOfCheeses = Math.floor(Math.random() * pizzaIngredients.maxNumberOfCheeses);

  for (var i = 0; i < numberOfMeats; i++) {
    pizza = pizza + ingredientItemizer(selectRandomMeat());
  }

  for (var j = 0; j < numberOfNonMeats; j++) {
    pizza = pizza + ingredientItemizer(selectRandomNonMeat());
  }

  for (var k = 0; k < numberOfCheeses; k++) {
    pizza = pizza + ingredientItemizer(selectRandomCheese());
  }

  pizza = pizza + ingredientItemizer(selectRandomSauce());
  pizza = pizza + ingredientItemizer(selectRandomCrust());

  return pizza;
};

// returns a DOM element for each pizza
var pizzaElementGenerator = function(i) {
  var pizza =
    '<div id="pizza' + i + '" class="randomPizzaContainer" style="width:33.33%;height:325px;">' +
      '<div class="col-md-6">' +
        '<img src="images/pizza.png" class="img-responsive">' +
      '</div>' +
      '<div class="col-md-6">' +
        '<h4>' + randomName() + '</h4>' +
        '<ul>' + makeRandomPizza() + '</ul>' +
      '</div>' +
    '</div>';

  return pizza;
};

// resizePizzas(size) is called when the slider in the "Our Pizzas" section of the website moves.
var resizePizzas = function(size) {
  window.performance.mark("mark_start_resize");   // User Timing API function

  // Changes the value for the size of the pizza above the slider
  function changeSliderLabel(size) {
    switch (size) {
      case "1":
        document.querySelector("#pizzaSize").innerHTML = "Small";
        return;
      case "2":
        document.querySelector("#pizzaSize").innerHTML = "Medium";
        return;
      case "3":
        document.querySelector("#pizzaSize").innerHTML = "Large";
        return;
      default:
        console.log("bug in changeSliderLabel");
    }
  }

  changeSliderLabel(size);

  // Iterates through pizza elements on the page and changes their widths
  function changePizzaSizes(size) {
    // Changes the slider value to a percent width
    function sizeSwitcher(size) {
      switch (size) {
        case "1":
          return 25;
        case "2":
          return 33.33;
        case "3":
          return 50;
        default:
          console.log("bug in sizeSwitcher");
      }
    }

    var randomPizzas = document.getElementsByClassName("randomPizzaContainer");
    for (var i = 0, length = randomPizzas.length; i < length; i++) {
      randomPizzas[i].style.width = sizeSwitcher(size) + '%';
    }
  }

  changePizzaSizes(size);

  // User Timing API is awesome
  window.performance.mark("mark_end_resize");
  window.performance.measure("measure_pizza_resize", "mark_start_resize", "mark_end_resize");
  var timeToResize = window.performance.getEntriesByName("measure_pizza_resize");
  console.log("Time to resize pizzas: " + timeToResize[0].duration + "ms");
};

window.performance.mark("mark_start_generating"); // collect timing data

// This for-loop actually creates and appends all of the pizzas when the page loads
var pizzas = "";
for (var i = 2; i < 100; i++) {
  pizzas = pizzas + pizzaElementGenerator(i);
}

var pizzasDiv = document.getElementById("randomPizzas");
pizzasDiv.innerHTML += pizzas;

// User Timing API again. These measurements tell you how long it took to generate the initial pizzas
window.performance.mark("mark_end_generating");
window.performance.measure("measure_pizza_generation", "mark_start_generating", "mark_end_generating");
var timeToGenerate = window.performance.getEntriesByName("measure_pizza_generation");
console.log("Time to generate pizzas on load: " + timeToGenerate[0].duration + "ms");

// Iterator for number of times the pizzas in the background have scrolled.
// Used by updatePositions() to decide when to log the average time per frame
var frame = 0;

// Logs the average amount of time per 10 frames needed to move the sliding background pizzas on scroll.
function logAverageFrame(times) {   // times is the array of User Timing measurements from updatePositions()
  var numberOfEntries = times.length;
  var sum = 0;
  for (var i = numberOfEntries - 1; i > numberOfEntries - 11; i--) {
    sum = sum + times[i].duration;
  }
  console.log("Average time to generate last 10 frames: " + sum / 10 + "ms");
}

// The following code for sliding background pizzas was pulled from Ilya's demo found at:
// https://www.igvita.com/slides/2012/devtools-tips-and-tricks/jank-demo.html

var lastScrollTop = 0; // top of page.
var scrolling = false;

function OnScroll() {
  lastScrollTop = document.body.scrollTop;
  requestUpdatePositions();
}

function requestUpdatePositions() {
  if (!scrolling) {
    requestAnimationFrame(updatePositions);
  }
  scrolling = true;
}

// Moves the sliding background pizzas based on scroll position
function updatePositions() {
  frame++;
  window.performance.mark("mark_start_frame");

  var scrollTop = lastScrollTop / 1250;
  var phaseArray = [
    100 * Math.sin(scrollTop),
    100 * Math.sin(scrollTop + 1),
    100 * Math.sin(scrollTop + 2),
    100 * Math.sin(scrollTop + 3),
    100 * Math.sin(scrollTop + 4)
  ];
  for (var i = 0, length = movingPizzasArray.length; i < length; i++) {
    movingPizzasArray[i].style.left = movingPizzasArray[i].basicLeft + phaseArray[i % 5] + 'px';
  }

  scrolling = false;

  // User Timing API to the rescue again. Seriously, it's worth learning.
  // Super easy to create custom metrics.
  window.performance.mark("mark_end_frame");
  window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
  if (frame % 10 === 0) {
    var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
    logAverageFrame(timesToUpdatePosition);
  }
}

// runs updatePositions on scroll
window.addEventListener('scroll', OnScroll);

// Generates the sliding pizzas when the page loads.
//
// Note: Only 48 pizzas are generated because at normal
// zoom factors, this is a sufficient number of rows to
// cover the whole page vertically with moving pizzas.
//
// Note: A global array is created that caches references
// to all the moving pizzas so it be used to update the
// pizza locations when the scrollbar is moved. This is
// more efficient than fetching these references from the
// DOM each time the scrollbar is moved.
document.addEventListener('DOMContentLoaded', function() {
  var cols = 8;
  var s = 256;
  movingPizzasArray = [];
  for (var i = 0; i < 48; i++) {
    var elem = document.createElement('img');
    elem.className = 'mover';
    elem.src = "images/pizza.png";
    elem.style.height = "100px";
    elem.style.width = "73.333px";
    elem.basicLeft = (i % cols) * s;
    elem.style.top = (Math.floor(i / cols) * s) + 'px';
    document.querySelector("#movingPizzas1").appendChild(elem);
    movingPizzasArray.push(elem);
  }
  OnScroll();
});