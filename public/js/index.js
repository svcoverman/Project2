
// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
  
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};
// CARMD DID NOT WORK
// const API_KEY = process.env.CARMD_API_KEY;
// const API_TOKEN = process.env.CARMD_TOKEN;
// let queryURL = "http://api.carmd.com/v3.0/maint?year=2015&make=CHEVROLET&model=EQUINOX&mileage=51000";

// let carMD_ADD = function () {
//   axios({
//     method: "GET", //you can set what request you want to be
//     url: queryURL,
//     // data: JSON.stringify(data),
//     headers: {
//       "content-type":"application/json",
//       "authorization":API_KEY,
//       "partner-token":API_TOKEN
//       }
//   }).then(
//     function(response) {
//       console.log(response);
//       console.log(data);
//     })
//     .catch(function(error) {
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.log("---------------Data---------------");
//         console.log(error.response.data);
//         console.log("---------------Status---------------");
//         console.log(error.response.status);
//         console.log("---------------Status---------------");
//         console.log(error.response.headers);
//       } else if (error.request) {
//         // The request was made but no response was received
//         // `error.request` is an object that comes back with details pertaining to the error that occurred.
//         console.log(error.request);
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.log("Error", error.message);
//       }
//       console.log(error.config);
//     });
// };
let VIN_API_KEY=process.env.VIN_API_KEY;
let VIN = "JF1VA2V63H9822803";
var settings = {
  "url": "http://api.marketcheck.com/v1/vin/"+VIN+"/specs?api_key={{"+VIN_API_KEY+"}}",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Host": "marketcheck-prod.apigee.net"
  },
};

$.ajax(settings).done(function (response) {
  console.log(response);
  var context = {
  year: response.year,
  make: response.make, 
  model: response.model,
  transmission: response.transmission,
  HighwayMPG: response.highway_miles
  }
});

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);



