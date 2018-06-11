// use MOMENT.JS library//
// First Train Time -- in military time
// Frequency -- in minutes
// Code this app to calculate when the next train will arrive; this should be relative to the current time.
// Users from many different machines must be able to view same train times.
// Styling and theme are completely up to you. Get Creative!

var config = {
    apiKey: "AIzaSyBKERkOAlaYoZKVXlKY-ntRWOOvs35RGXY",
    authDomain: "train-scheduler-9a706.firebaseapp.com",
    databaseURL: "https://train-scheduler-9a706.firebaseio.com",
    projectId: "train-scheduler-9a706",
    storageBucket: "train-scheduler-9a706.appspot.com",
    messagingSenderId: "801018169358"
  };
firebase.initializeApp(config);
var database = firebase.database();
$(document).ready(function() {
$("#button").on("click", function (event) {
    event.preventDefault();
    //console.log("I've been clicked");
    // Get the input values
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var frequency = $("#frequency").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    
    database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        firstTrain: firstTrain,
    });
    // console.log(trainName);
    // console.log(destination);
    // console.log(firstTrain);
    // console.log(frequency);
});
});
database.ref().on("child_added", function (snapshot) {
    if (snapshot.child("trainName").exists() && snapshot.child("destination").exists()  && snapshot.child("frequency").exists() && snapshot.child("firstTrain").exists()) {
        var trainName = snapshot.val().trainName;
        var destination = snapshot.val().destination;
        var frequency = snapshot.val().frequency;
        var firstTrain = snapshot.val().firstTrain;
        var tr = $("<tr>");
        tr.append ($("<td>").text(trainName));
        
        tr.append ($("<td>").text(destination));
        tr.append ($("<td>").text(frequency));
        tr.append ($("<td>").text(firstTrain));
        $('#trainBody').append(tr);
        

    }
  
});


