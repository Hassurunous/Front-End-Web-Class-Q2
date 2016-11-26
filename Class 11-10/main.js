$("#loginBtn").on("click", function(event) {
    console.log("Login Button clicked.");
    navLoginBtns("#loginBtn", "#loginForm");
});

$("#signupBtn").on("click", function(event) {
    console.log("Signup Button clicked.");
    navLoginBtns("#signupBtn", "#signupForm");
});

$("#backLoginBtn").on("click", function(event) {
    console.log("Back Login Button clicked.");
    navLoginBtns("#backLoginBtn", "#initLogin");
});

$("#backSignupBtn").on("click", function(event) {
    console.log("Back Signup Button clicked.");
    navLoginBtns("#backSignupBtn", "#initLogin");
});

function navLoginBtns(inputButtonIdString, locationIdString) {
    var inputDiv = $(inputButtonIdString).parent().parent();

    function popInput() {
        inputDiv.delay(1000).remove();
        console.log("popInput() run...");
    }
    if (locationIdString == "#initLogin") {
        $("#display").append($(locationIdString)).css("left: -100%");
        $(locationIdString).css({
            "left": "0",
            "float": "left"
        });
        inputDiv.animate({
            left: '100%'
        }, 500, popInput);
        $(locationIdString).animate({
            left: '0'
        }, 500, popInput);
    } else {
        $("#display").append($(locationIdString));
        $(locationIdString).css({
            "left": "100%",
            "float": "left"
        });
        inputDiv.animate({
            left: '-100%'
        }, 500, popInput);
        $(locationIdString).animate({
            left: '0'
        }, 500);
    }
}

function onLoad() {
    $("#display").append($("#initLogin")).css("left: -100%");
    $("#initLogin").animate({
        left: '0'
    }, 500);
}

$("#loginForm").submit(function(event) {
    event.preventDefault();
    if ($("#password").val().length < 6) {
        console.log("Password is not long enough. Please try again.");
    } else {
        console.log("Password is long enough. ");
    }
});

$("#signupForm").submit(function(event) {
    event.preventDefault();
    if ($("#suPassword").val().length < 6) {
        console.log("Password is not long enough. Please try again.");
    } else if ($("#confirmPwd").val() === $("#suPassword").val()) {
        console.log($("#suPassword").val());
        console.log($("#confirmPwd").val());
        console.log("Passwords match. Signup may commence.");
    } else {
        console.log("Password is either too short or does not match.");
    }
});
