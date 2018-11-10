var config = {
    apiKey: "AIzaSyCMtZBkG6LjJMer0GCMM9YIqXvyOdw-dEk",
    authDomain: "rps-game-5de7b.firebaseapp.com",
    databaseURL: "https://rps-game-5de7b.firebaseio.com",
    projectId: "rps-game-5de7b",
    storageBucket: "rps-game-5de7b.appspot.com",
    messagingSenderId: "83002717061"
  };

firebase.initializeApp(config);

var database = firebase.database();
var player = database.ref("/players");
var guess = database.ref("/guesses");

var name1 = "";
var name2 = "";

var pick1 = "";
var pick2 = "";

var player1Wins = 0;
var player2Wins = 0;
var ties = 0;

function checkthewinner(guess1, guess2) {
    if ((guess1 === "r") && (guess2 === "s")) {
        return 1;
    } else if ((guess1 === "r") && (guess2 === "p")) {
        return 2;
    } else if ((guess1 === "s") && (guess2 === "r")) {
        return 2;
    } else if ((guess1 === "s") && (guess2 === "p")) {
        return 1;
    } else if ((guess1 === "p") && (guess2 === "r")) {
        return 1;
    } else if ((guess1 === "p") && (guess2 === "s")) {
        return 2;
    } else if (guess1 === guess2) {
        return 3;
    }
}

function reset() {
    $("#text1").empty();
    $("#text2").empty();
    $("#result").empty();

    guess.set({
        guess1: "",
        guess2: ""
    })

    $(".button1").show();
    $(".button2").show();

}

$("#submit1").on("click", function(event) {
    event.preventDefault();
    
    name1 = $("#name1").val().trim();
    $("#player1").text(name1);
    $("#name1").val("");

    player1Wins = 0;
    player2Wins = 0;
    ties = 0;

    player.set({
        player1: name1,
        player2: name2
    });
});

$("#submit2").on("click", function(event) {
    event.preventDefault();
    
    name2 = $("#name2").val().trim();
    $("#player2").text(name2);
    $("#name2").val("");

    player1Wins = 0;
    player2Wins = 0;
    ties = 0;

    player.set({
       player1: name1,
       player2: name2 
    });
});

player.on("value", function(snap) {
    $("#player1").text(snap.val().player1);
    $("#player2").text(snap.val().player2);

    name1 = snap.val().player1;
    name2 = snap.val().player2;
});

$(".button1").on("click", function() {
    
    pick1 = $(this).val();
    $("#text1").text("wait for your opponent");

    guess.set({
        guess1: pick1,
        guess2: pick2
    });

    $(".button1").hide();
    $(".button2").hide();
});

$(".button2").on("click", function() {

    pick2 = $(this).val();
    $("#text2").text("wait for your opponent");

    guess.set({
        guess1: pick1,
        guess2: pick2
    });
    $(".button1").hide();
    $(".button2").hide();
});

guess.on("value", function(snap) {
    pick1 = snap.val().guess1;
    pick2 = snap.val().guess2;

    if ((snap.val().guess1) && (snap.val().guess2)) {
        var result = checkthewinner(pick1, pick2);
        if (result === 1) {
            $("#result").text(name1 + " won!!! Next round stars in 3 seconds.");
            player1Wins++;
            $("#wins").text(name1 + " score: " + player1Wins);
            setTimeout(reset, 3000);
        } else if (result === 2) {
            $("#result").text(name2 + " won!!! Next round stars in 3 seconds.");
            player2Wins++;
            $("#losses").text(name2 + " score:" + player2Wins);
            setTimeout(reset, 3000);
        } else {
            $("#result").text("It is a tie!!! Next round stars in 3 seconds.");
            ties++;
            $("#ties").text("ties: " + ties);
            setTimeout(reset, 3000);
        }
    }
});