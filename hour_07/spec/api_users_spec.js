"use strict";


var frisby = require("frisby");

var URL = "http://localhost:3232/";

// PUT YOUR HEADERS HERE
frisby.globalSetup({
    request: {
        Authorization: "Bearer XSESU121JKHS..........................."
    }
});

frisby.create("Create a user")
    .post(URL + 'api/v1/users', {
        name: 'John',
        age: '45'
    })
    .expectStatus(201)
    .expectJSONTypes('', {_id: String})
    .afterJSON(function(user){
        console.log(user)
    })
.toss();