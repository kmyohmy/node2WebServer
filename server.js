const express = require('express');
const hbs = require('hbs');

var fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set("view engine", "hbs" );

//add some middleware



app.use(function (request,response,next) {
    var now = new Date().toString();
    var log = now + ":" + request.method + request.url;
    console.log(log);
    fs.appendFile('server.log', log + "\n", function (err) {
        if(err) {
            console.log('Unable to Append File');
        }
    });
    next();
});

// app.use(function(request, response) {
//     response.render('maintenance.hbs', {
//         returnh1:"Down for Maintenance",
//         returnMsg: "We apologize for the inconvenience but we will be right back"

//     });
// });

app.use(express.static(__dirname + "/assets"));

// app.get('/', function (request, response){
// // response.send("<h1>Hello Express</h1>");


//     response.send({
//         name: 'Ken',
//         likes: [
//             'biking',
//             "cities"
//         ]
        
//     });

// });



app.get('/about', function (request, response) {
    response.render('about.hbs',{ 
        footeryear: new Date().getFullYear()
    });

});

app.get('/bad', function (request, response) {
    response.send({
        errorMessage: "Stupid bruh you messed something up"
    });


});

app.get('/', function(request,response){
    response.render('home.hbs', {
        welcomeH1: "YOOOOOO",
        welcomeMsg: "Hello Welcome to the page",
        footeryear: new Date().getFullYear()

    });


})




app.listen(3000); //or app.listen(3000,callback function() {}); 

            //EXAMPLE: app.listen(3000,function() {
                        // console.log("Server has started");
                        // }); 
                        // Similar to Event load listener()

