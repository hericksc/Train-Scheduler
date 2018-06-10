// use MOMENT.JS library//


// First Train Time -- in military time
// Frequency -- in minutes
// Code this app to calculate when the next train will arrive; this should be relative to the current time.
// Users from many different machines must be able to view same train times.
// Styling and theme are completely up to you. Get Creative!
//<script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>
// Initialize Firebase


var config = {
    apiKey: "AIzaSyDDhu4ZBMHEo88AoVr-qjPj6rdzZi6Li6k",
    authDomain: "project-1-f1b3d.firebaseapp.com",
    databaseURL: "https://project-1-f1b3d.firebaseio.com",
    projectId: "project-1-f1b3d",
    storageBucket: "project-1-f1b3d.appspot.com",
    messagingSenderId: "983021184372"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName = [];
var destination = [];
var frequency = 0;
var nextArrival = 0;
var minutes = 0;

database.ref().on("child_added", function (snapshot) {


    if (snapshot.child("trainName").exists() && snapshot.child("destination").exists() && snapshot.child("firstTrain").exists() && snapshot.child("frequency").exists()) {


        var trainName = snapshot.val().trainName;
        var destination = snapshot.val().destination;
        var firstTrain = snapshot.val().firstTrain;
        var frequency = snapshot.val().frequency;


    }



    // $("#highest-bidder").text(highBidder);
    // $("#highest-price").text(highPrice);


    $("#button").on("click", function (event) {
        event.preventDefault();
        // Get the input values
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#firstTrain").val().trim();
        var frequency = $("#frequency").val().trim();
        console.log();


        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
        });

        console.log(trainName);
        console.log(destination);
        console.log(firstTrain);
        console.log(frequency);

        //parseInt($("#bidder-price").val().trim());
    });
});


