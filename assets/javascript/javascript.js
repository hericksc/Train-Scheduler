
//Information for Firebase Database//
var config = {
    apiKey: "AIzaSyBKERkOAlaYoZKVXlKY-ntRWOOvs35RGXY",
    authDomain: "train-scheduler-9a706.firebaseapp.com",
    databaseURL: "https://train-scheduler-9a706.firebaseio.com",
    projectId: "train-scheduler-9a706",
    storageBucket: "train-scheduler-9a706.appspot.com",
    messagingSenderId: "801018169358"
};

// Initializing Database//
firebase.initializeApp(config);
//Defining variable database equal to firebase funtion//
var database = firebase.database();
$(document).ready(function () {
    $("#button").on("click", function (event) {
        event.preventDefault();


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
        $("#trainForm input").val("");
         
    });
});
database.ref().on("child_added", function (snapshot) {
    if (snapshot.child("trainName").exists() && snapshot.child("destination").exists() && snapshot.child("firstTrain").exists() && snapshot.child("frequency").exists()) {
        var trainName = snapshot.val().trainName;
        var destination = snapshot.val().destination;
        var frequency = snapshot.val().frequency;
        var firstTrain = snapshot.val().firstTrain;

       



       //calculation to get next train arrival//
        var now = moment();
        // need to indicate where the : will be in the time format. 
        var trainArr = firstTrain.split(':');
        // coverting the moment() functuion into hours using hours.(function)
        var trainTime = moment().hours(trainArr [0]).minutes(trainArr [1]);
        var maxMoment = moment.max(now, trainTime);
        var tMinutes;
        var tArrival;

        if (maxMoment === trainTime) {
            tArrival = trainTime.format('hh:mm A');
            tMinutes = trainTime.diff(now, "minutes");
        }
        else {
            var diffTimes = now.diff(trainTime, "minutes");
            var tRemainder = diffTimes % frequency;
            tMinutes = frequency - tRemainder;
            tArrival = moment().add(tMinutes,"m").format('hh:mm A');

        }
        var tr = $("<tr>");
        tr.append($("<td>").text(trainName));

        tr.append($("<td>").text(destination));
        tr.append($("<td>").text(firstTrain));
        tr.append($("<td>").text(frequency));
        tr.append($("<td>").text(tArrival));
        tr.append($("<td>").text(tMinutes));


        $('#trainBody').append(tr);

      
       
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
   
    }
    /* This script displays a greeting based on the time of day the page is loaded. It is an example from my JavaSript book */
    //Javasript& JQuery, (Jon Duckett) // 

});



