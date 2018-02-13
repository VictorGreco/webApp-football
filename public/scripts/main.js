/*eslint-env browser*/
/*eslint "no-console": "off" */
/*eslint "no-undef": "off" */


//************************FUNCTIONS****************************

function sendPasswordReset() {
    var email = document.getElementById('email_reset').value;
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function () {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
        $('#email_reset, #reset_email').hide();
        $('#username, #email, #password, #login, #register, #reset_password').show();

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
            alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
            alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });
    // [END sendpasswordemail];
}



function getGamesAccordeonMatchesOctober(data) {
    var tpl = $('#octoberAccordeonInfo').html();
    var html = Mustache.render(tpl, data);
    $('#accordion2').html(html);

}

function getGamesAccordeonMatchesSeptember(data) {
    var tpl = $('#septemberAccordeonInfo').html();
    var html = Mustache.render(tpl, data);
    $('#accordion').html(html);
}

function getGamesAccordeonMatches(data) {
    getGamesAccordeonMatchesSeptember(data);
    getGamesAccordeonMatchesOctober(data);

}

function getGamesButtonMonth(data) {

    var tpl = $('#gamesButtonHeader_Template').html();
    var html = Mustache.render(tpl, data);
    $('#gamesButtonHeader').html(html);
}

function getChatPage() {
    $('#chat_page')
        .append('<div class="row" id="selectLogin"><div class="col-xs-12"><div class="jumbotron"><p id="chat_selectLogin">')
        .append('<div class="row" id="chat_out" style="display: none;"><div class="col-xs-12"><div class="jumbotron" id="chat_OutJumbo">')
        .append('<div class="row" id="select_room" style="display: none;"><div class="col-xs-12"><div class="jumbotron" id="chat_roomJumbo">')
        .append('<div class="row" id="chat_in" style="display: none;"><div class="col-xs-12"><div class="chatjumbo logout" id="chat_Jumbo">');

    $('#chat_selectLogin')
        .append('<button type="button" class="btn-lg btn-warning" id="emailLogin">Login with Email')
        .append('<button class="btn-lg loginBtn loginBtn--google" id="googleLogin">Login with Google')
        .append('<button class="btn-lg loginBtn loginBtn--facebook" id="facebookLogin">Login with Facebook');

    $('#chat_OutJumbo')
        .append('<p class="login" id="chat_firstChild">')
        .append('<p id="chat_SecondChild">');

    $('#chat_firstChild')
        .append('<input type="text" name="username" id="username" placeholder="Username">')
        .append('<input type="email" name="email" id="email" placeholder="Email">')
        .append('<input type="password" name="password" id="password" placeholder="Password">')
        .append('<input type="email" name="email" id="email_reset" placeholder="Insert your Email" style="display: none;">');

    $('#chat_SecondChild')
        .append('<button type="button" class="btn-lg btn-success" id="login">Login!')
        .append('<button type="button" class="btn-lg btn-default" id="register">Register')
        .append('<button type="button" class="btn-lg btn-link" id="reset_password">Forgot your Password ?')
        .append('<button type="button" class="btn-lg btn-default" id="reset_email" style="display:none;">Send reset password Email');

    $('#chat_roomJumbo')
        .append('<input type="text" name="username" id="chat_room_name" placeholder="Room Name">')
        .append('<button type="button" class="btn-lg btn-default" id="room_button">Enter!')
        .append('<div class="row"><div class="jumbotron asla" id="currentRooms" style="color:black; font-size:15px;"><p>Current Rooms:');

    $('#chat_Jumbo')
        .append('<button type="button" class="btn btn-danger" id="logout">Logout')
        .append('<div class="messageScreen" id="messageScreen"><div class="cssload-container"><div class="cssload-progress cssload-float cssload-shadow"><div class="cssload-progress-item">')
        .append('<input class="textInput" id="textMessage" type="text" placeholder="Type a message...and press enter to send" onkeypress="enterPressOnChat(event)">');
}

function getContactPage() {
    var aTexts = ['Michael Randall', 'League Coordinator', 'General Contact:'];
    //[START ROW 1]
    $('#contact_page')
        .append('<div class="row"><div class="col-xs-12"><div class="flex_column" id="contact_flex_column">');
    $('#contact_flex_column')
        .append('<div class="name" id="contact_name">')
        .append('<div class="images_container" id="contact_images_container">');
    $('#contact_name')
        .append('<strong>' + aTexts[0] + '')
        .append('<span>' + aTexts[1] + '');
    $('#contact_images_container')
        .append('<a href="tel:(630) 690-8132"><img src="resources/auricular-phone-symbol-in-a-circle.svg" class="btn btn-danger images">')
        .append('<a href="mailto:michael.randall@chisoccer.org"><img src="resources/mail-black-envelope-symbol.svg" class="btn btn-danger images">');
    //[ENDS ROW 1]
    //[START ROW 2]
    $('#contact_page').append('<div class="row2" id="contact_row2">');
    $('#contact_row2')
        .append('<strong class="name">' + aTexts[2] + '')
        .append('<a href="mailto:michael.randall@chisoccer.org"><img src="resources/mail-black-envelope-symbol.svg" class="btn btn-danger images">');
    //[ENDS ROW 2]
}

function getRulePage() {

}

function getGamePage() {

}
//TEMPORAL FUNCTION
function createCurrentPage(clikedElementId) {
    (clikedElementId == "games_page") ? getGamePage(): "";
    (clikedElementId == "rules_page") ? getRulePage(): "";
}

function changeTitleRowText() {
    ($('#games_page').css('display') != 'none') ? $('#titleRow').text('Games'): "";
    ($('#rules_page').css('display') != 'none') ? $('#titleRow').text('Rules'): "";
    ($('#contact_page').css('display') != 'none') ? $('#titleRow').text('Contact'): "";
    ($('#chat_page').css('display') != 'none') ? $('#titleRow').text('Chat'): "";
}

function showTheWantedMonth(clikedElementId) {
    $('#september, #october, #information').hide();
    $('#' + clikedElementId + '').show();
}

function showTheWantedPage(clikedElementId) {
    $('#chat_page, #contact_page, #rules_page, #games_page').hide();
    $('#' + clikedElementId + '').show();
    changeTitleRowText();
    //TEMPORAL FUNCTION
    createCurrentPage(clikedElementId);
}

function clickButton() {
    //add to these array all the ids of the pages!
    var pagesArray = ["chat_button", "contact_button", "rules_button", "games_button"];
    var monthArray = ["september_button", "october_button"];
    var clikedElementId = this.id;
    var b = clikedElementId.split("_");

    $(pagesArray).each(function () {
        if (clikedElementId == this) {
            clikedElementId = b[0] + "_page";
            showTheWantedPage(clikedElementId);
        }
    });

    $(monthArray).each(function () {
        if (clikedElementId == this) {
            clikedElementId = b[0];
            showTheWantedMonth(clikedElementId);
        }
    });
}

//********************* WORKING FUNCTIONS *****************************
$(function () {

    var url = "https://api.myjson.com/bins/16agb7";
    $.getJSON(url, function (data) {

        getGamesButtonMonth(data);
        getGamesAccordeonMatches(data);
        getContactPage();
        getChatPage();
        getCurrentChatRooms();

        //[START ONLOAD PAGE SET]
        $('#rules_page').hide();
        $('#games_page').show();
        //[END ONLOAD PAGE SET]

        $('.btn, .btn-lg').click(clickButton);
        $('#emailLogin').click(emailLoginButtonClick);
        $('#googleLogin').click(googleLoginButtonClick);

        $('#facebookLogin').click(facebookLoginButtonClick);

        $('#register').click(registerNewUser);

        $('#login').click(loginUser);

        $('#logout').click(logoutUser);

        $('#menuButton').blur(function () {
            $('#myNavbar').slideUp(300);
        });

        $('#menuButton').click(function () {
            $('#myNavbar').slideToggle(100);
        })

        $('#chat_button').click(verifyIfUserIsLoged);

        $('#reset_password').click(function () {
            $('#username, #email, #password, #login, #register, #reset_password').hide();
            $('#email_reset, #reset_email').show();
        })
        $('#reset_email').click(sendPasswordReset);

        $('#room_button').click(function () {
            var chatID = $('#chat_room_name').val();
            console.log(chatID);
            firebase.auth().currentUser.updateProfile({
                photoURL: chatID,
            }).then(function(){
                $('#chat_room_name').val("");
            })
            $('#select_room').hide();
            $('#chat_in').show();
            getPosts(chatID);
        })
    });

})
