let userId;
let userName;
let currentUser;
let newMember = null;
let signedOut = null;
let dropdownItems = ["Favorites", "Logout"];

$(document).ready(function() {

    document.getElementById("user-sign-in").style.display = "none";
    const ms = document.getElementById("main-section");
    ms.classList.remove("blur-effect");
});

//New user needs to make an account
$("#first-sign-in-new").on("click", function(event){
  event.preventDefault();

  document.getElementById("login-btns").style.display = "none";
  document.getElementById("top-exit-btn").style.display = "block";
  document.getElementById("create-account").style.display = "block";
});

//User already has an account and needs to sign in
$("#first-sign-in").on("click", function(event){
  event.preventDefault();

  document.getElementById("login-btns").style.display = "none";
  document.getElementById("top-exit-btn").style.display = "block";
  document.getElementById("current-user").style.display = "block";
});

//User wants to use the site without signing in
$(".no-signin").on("click", function(event){
  event.preventDefault();

  document.getElementById("login-btns").style.display = "none";
  document.getElementById("user-sign-in").style.display = "none";
  let ms = document.getElementById("main-section");
  ms.classList.remove("blur-effect");
});

//Current user sign-in
$("#sign-in").on("click", function login(event) {

  event.preventDefault();

  let userEmail = $("#email").val().trim().toLowerCase();
  let userPassword = $("#password").val().trim().toLowerCase();

  //Current user sign-in
  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
  
    //This will show if they dont have an account yet
    window.alert("Error: " + errorMessage);
  
  });
});

//Creating a new user
$("#new-member").on("click", function login(event) {

  event.preventDefault();

  userName = $("#new-username").val().trim().toLowerCase();
  let userEmail = $("#new-email").val().trim().toLowerCase();
  let userPassword = $("#new-password").val().trim().toLowerCase();
  newMember = 1;

  //Creating a new user
  firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
   
    window.alert("Error: " + errorMessage);
    
  });
});

//Login button for desktop 
$(".no-mobile").on("click", function() {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
     
      accountFunctions.newUserSignIn();
    } else {
      if (signedOut === null) {

  accountFunctions.noUserSignedIn();
      };
    };
  });
});

//Login button for mobile
$(".sidenav-trigger").on('click', function() {

  let listValue = this.getAttribute("value");

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      
      if (listValue === "0") {

        for (let i = 0; i < dropdownItems.length; i++) {
        const newList = $("<li>");
        let a = $("<a>").addClass("dropdown-item left").attr("id", dropdownItems[i]).text(dropdownItems[i]);
        newList.html(a);
        $("#nav-mobile").append(newList);
        $(".sidenav-trigger").attr("value", "1");
        };
      };
    };
  });
});  

// Logout button
$(document).on("click", "#Logout", function () {

  accountFunctions.logout();

  $(".dropdown-item").remove();
  $(".no-mobile").attr("value", "0");

  const newDiv = $("<div>").attr("id", "log-out-success").addClass("container");
  const newText = $("<span>").text("Log out successful.")
  newDiv.append(newText);
  $("body").prepend(newDiv);

  signedOut = 1;
  $(".account-info").text("Login");
  setTimeout(function(){$("#log-out-success").remove();}, 2000);

});

//Button that takes the user to the favorites area
$(document).on("click", "#Favorites", function () {

    $('html, body').animate({
        scrollTop: $("#favoritesSection").offset().top
    }, 800);
});

//This listens to changes in the users authentication 
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

    // User is signed in.
    document.getElementById("user-sign-in").style.display = "none";
    const ms = document.getElementById("main-section");
    ms.classList.remove("blur-effect");
    userId = user.uid;

    if (newMember === 1) {
      accountFunctions.writeUserData(userId, userName);
      newMember = null;
    };

    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      currentUser = snapshot.val();
      userName = currentUser.userName;

      $(".account-info").removeAttr("onclick");
      $(".account-info").empty();
      $(".account-info").text(userName);

      userFavorites.get();

    });
  
  } else {
    if (signedOut === null) {

    setTimeout(accountFunctions.noUserSignedIn, 3000);
    } else {

      $("#fav_cards").empty();
      $("#favParagraph").removeClass("hidden");
      $(".no-mobile").attr("value", "0");
      $(".account-info").attr("onclick", "accountFunctions.noUserSignedIn()");

    };
  };
});

// Functions that write or remove users information to firebase and changes the page content based on if the user is signed on or not 
let accountFunctions = {

    newUserSignIn: function() {
  
      let listValue = $(".no-mobile").attr("value");
    
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          
          if (listValue === "0") {
    
            for (let i = 0; i < dropdownItems.length; i++) {
            let newList = $("<li>");
            let a = $("<a>").addClass("dropdown-item right").attr("id", dropdownItems[i]).text(dropdownItems[i]);
            newList.html(a);
            $("#dropdown-menu").append(newList);
            $(".no-mobile").attr("value", "1");
              };
    
          } else {
            $(".dropdown-item").remove();
            $(".no-mobile").attr("value", "0");
          };
        };
      });
    }, 
  
    logout: function() {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
    },
    
    writeUserData: function(userId, userName) {
      firebase.database().ref('users/' + userId).set({
        userName: userName,
        locations: "",
      });
    },
    
    noUserSignedIn: function() {
    
      // No user is signed in.
      document.getElementById("user-sign-in").style.display = "block";
      document.getElementById("login-btns").style.display = "block";
      document.getElementById("create-account").style.display = "none";
      document.getElementById("current-user").style.display = "none";
      $("#fav_cards").empty();
  
      let ms = document.getElementById("main-section");
      ms.classList.add("blur-effect");
    
      userId;
      userName;
      currentUser;
      newMember = null;
      signedOut = null;
    
      $(".account-info").attr("onclick", "noUserSignedIn()");
      $(".account-info").empty();
      $(".account-info").text("Login");
    
    }
  };