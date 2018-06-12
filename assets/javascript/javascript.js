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
$(document).ready(function () {
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

    });
});
database.ref().on("child_added", function (snapshot) {
    if (snapshot.child("trainName").exists() && snapshot.child("destination").exists() && snapshot.child("firstTrain").exists() && snapshot.child("frequency").exists()) {
        var trainName = snapshot.val().trainName;
        var destination = snapshot.val().destination;
        var frequency = snapshot.val().frequency;
        var firstTrain = snapshot.val().firstTrain;

        var tr = $("<tr>");
        tr.append($("<td>").text(trainName));

        tr.append($("<td>").text(destination));
        tr.append($("<td>").text(frequency));
        tr.append($("<td>").text(firstTrain));


        $('#trainBody').append(tr);



       //calculation to get next train arrival//
        var now = moment();
        var then = firstTrain;

        // duration.get("hours") +":"+ duration.get("minutes") +":"+ duration.get("seconds")
        // var result = firstTrain + now - frequency;
        // var randomFormat = "HH:MM";
        // var convertedTime = moment(now, randomFormat);


        // console.log(moment(moment.duration(now.diff(then))).format("hh:mm:ss"))
        // var convertedDate = moment(trainTime, randomFormat);
        // console.log(moment(convertedDate).toNow());
        console.log(then);
        console.log(now);

        //found this code on "codepedia" to try and delete a row in Train Scheduler Table but it does not work//
        $("child_added").on("click", ".btnDelete", function () {

            snapshot.remove().trainName;
            snapshot.remove().destination;
            snapshot.remove().frequency;
            snapshot.remove().firstTrain;
        });
       

    }
    /* This script displays a greeting based on the time of day the page is loaded. It is an example from my JavaSript book */
    //Javasript& JQuery, (Jon Duckett) // 

    var today = new Date();
    var hourNow = today.getHours();
    var greeting;

    if (hourNow > 18) {
        greeting = "Good Evening!";
    } else if (hourNow > 11) {
        greeting = "Good Afternoon!";
    } else if (hourNow > 0) {
        greeting = "Good Morning!";
    } else {
        greeting = "Welcome!";
    }
    $("#greeting").html(greeting);
    $("#today").html(today);
});



