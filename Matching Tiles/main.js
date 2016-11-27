var tileArray = ["red", "red", "blue", "blue", "green", "green", "yellow", "yellow", "orange", "orange", "purple", "purple", "pink", "pink", "teal", "teal"];

var randomizedTiles = shuffle(tileArray);
var flipTimer,
    flipTimerActive = false;

// First attempted puzzle with multidimensional arrays to test
// var idSelectors = [];
// var gameArray = [];
// for(i=0; i<16; i++) {
//     gameArray[i] = new Array(2);
// }

//Prototype for the object type: Tile. Stores data about the tiles, including their id, color, flipped status, and matched status.
function Tile(id, color) {
    this.id = id;
    this.color = color;
    this.flipped = false;
    this.matched = false;
}

var gameTiles = [];

// Shuffles the array of colors to produce a random game layout, then stores the new value in "randomizedTiles".
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function onLoad() {
    var idSelector = "";
    // var backgroundColor = "";
    console.log(randomizedTiles);
    for (i = 0; i < randomizedTiles.length; i++) {
        idSelector = "#tile" + (i + 1);
        // idSelectors[i] = idSelector;
        // backgroundColor = randomizedTiles[i];
        // gameArray[i][0] = idSelector;
        // gameArray[i][1] = randomizedTiles[i];
        gameTiles[i] = new Tile(idSelector, randomizedTiles[i]);
        // console.log(idSelector, backgroundColor);
        // $(idSelector).text(i + 1).css("background-color", "black");
    }
    // console.log(gameArray);
    console.log(JSON.stringify(gameTiles));
}

function flipTile(tile) {
    var tileSelector = tile.id + ' .flipper';
    console.log(tileSelector);
    $(tileSelector).toggleClass('flipped');
}

function tileMatch(tile1, tile2) {
    var tile1Selector = tile1.id + ' .flipper';
    var tile2Selector = tile2.id + ' .flipper';
    console.log(tile1Selector);
    console.log(tile2Selector);
    console.log(tile1.id);
    console.log(tile2.id);
    flipTimerActive = true;
    flipTimer = setTimeout(function() {
        if (tile1.color != tile2.color) {
            $(tile1.id + ' .flipper').toggleClass('flipped');
            $(tile2.id + ' .flipper').toggleClass('flipped');
        } else {
            console.log("It's a match!");
            tile1.matched = true;
            tile2.matched = true;
        }
        flipTimerActive = false;
    }, 1000);
}

$(document).ready(function() {
    var clickCounter = 0,
        id1,
        tile1,
        id2,
        tile2;
    $(".tile").on("click", function(event) {
        console.log(flipTimer);
        var clickedTile;
        for (var i = 0; i < gameTiles.length; i++) {
            // console.log(gameTiles[i].id);
            if (gameTiles[i].id == ("#" + $(this).attr('id'))) {
                clickedTile = gameTiles[i];
                console.log(clickedTile.matched);
            }
        }
        if (clickedTile.matched != true && clickedTile != tile1 && clickedTile != tile2 && flipTimerActive == false) {
            clickCounter += 1;
            if (clickCounter == 1) {
                tile1 = clickedTile;
                // id1 = "#" + $(this).attr('id');
                // console.log(id1);
                // for (var i = 0; i < gameTiles.length; i++) {
                //     // console.log(gameTiles[i].id);
                //     if (gameTiles[i].id == id1) {
                //         tile1 = gameTiles[i];
                //     }
                // }
                flipTile(tile1);
                // console.log("ID " + clickCounter + " is " + id1);
                // console.log("Color " + clickCounter + " is " + color1);
            } else if (clickCounter == 2) {
                tile2 = clickedTile;
                // id2 = "#" + $(this).attr('id');
                // console.log(id2);
                // for (var i = 0; i < gameTiles.length; i++) {
                //     // console.log(gameTiles[i]);
                //     if (gameTiles[i].id == id2) {
                //         tile2 = gameTiles[i];
                //     }
                // }
                flipTile(tile2);
                // console.log("ID " + clickCounter + " is " + id2);
                // console.log("Color " + clickCounter + " is " + color2);
                console.log(tile1.color + " : " + tile2.color);
                // if (tile1.color == tile2.color) {
                //     console.log("Congratulations! It's a match!");
                // }
                // else {
                //     console.log("Sorry! Not a match!");
                // }
                tileMatch(tile1, tile2);
                clickCounter = 0;
                tile1 = "";
                tile2 = "";
            }
            console.log("Tile clicked.");
        }
    });
});
