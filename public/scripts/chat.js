/*eslint-env browser*/
/*eslint "no-console": "off" */
/*eslint "no-undef": "off" */


//*******************************************FUNCTIONS****************************************************
function verifyIfUserIsLoged() {
    if (firebase.auth().currentUser != null) {
        $('#selectLogin, #chat_out, #chat_in').hide();
        $('#select_room').show();
        
        
    } else {
        $('#select_room, #chat_out, #chat_in').hide();
        $('#selectLogin').show();
        
    }
}

function enterPressOnChat(event) {
    currentEvent = event.which;
    var introEventUnicode = 13;
    var textMessage = $('#textMessage').val();
    if (currentEvent == introEventUnicode && textMessage != "") {
        console.log("working enter!");
        console.log(textMessage);
        newPostForCurrentUser(textMessage);
        $('#textMessage').val("");
    }
}

function writeNewPost(uid, username, body) {
    var room = firebase.auth().currentUser.photoURL;
    // A post entry.
    var postData = {
        author: firebase.auth().currentUser.displayName,
        email: firebase.auth().currentUser.email,
        uid: uid,
        body: body,
        starCount: 0,
    };

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child(room).push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/'+room+'/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
}


function newPostForCurrentUser(text) {
    // [START single_value_read]
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
        var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        // [START_EXCLUDE]
        return writeNewPost(firebase.auth().currentUser.uid, username, text);
        // [END_EXCLUDE]
    });
    // [END single_value_read]
}
function getCurrentChatRooms(){
     firebase.database().ref().on('value', function (data) {
         
         $(currentRooms).html("");
         currentChatRooms = Object.keys(data.val());
         console.log(currentChatRooms);
         
         var parent = $('#currentRooms');
         parent.append('<p>Current Rooms:');
         $(currentChatRooms).each(function(){
             var h5 = document.createElement('span');
             h5.append(this + ' | ');
             parent.append(h5);
             console.log(this);
         })
     })
}
function getPosts(room) {
    firebase.database().ref(room).on('value', function (data) {
        var logs = document.getElementById("messageScreen");

        logs.innerHTML = "";

        var posts = data.val();
        console.log(data.val());

        for (var key in posts) {
            var text = document.createElement("p");
            var text_name = document.createElement("p");
            var linea = document.createElement('div');
            var rows = document.createElement("div");
            var parent_text = document.createElement("div");

            rows.classList.add("row");
            parent_text.classList.add("parent_text");
            var element = posts[key];

            text.append(element.body);
            parent_text.append(text_name);
            parent_text.append(linea);
            parent_text.append(text);
            rows.append(parent_text);
            logs.append(rows);

            if (element.email == firebase.auth().currentUser.email) {
                text_name.append("Me: ");
                parent_text.classList.add("currentUserMessage");
            } else {
                text_name.append(element.author + ": ");
                parent_text.classList.add("notCurrentUserMessages");
            }
            logs.scrollTop = logs.scrollHeight;
        }
    });

}


function registerNewUser() {
    var email = $('#email').val();
    var password = $('#password').val();
    var username = $('#username').val();
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
        firebase.auth().currentUser.updateProfile({
            displayName: username,
        }).then(function () {
            alert("registered");
            $('#chat_out').hide();
            $('#select_room').show();
            
            
        });

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
    });
}

function loginUser() {
    var email = $('#email').val();
    var password = $('#password').val();
    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        alert("login");
        $('#chat_out').hide();
        $('#select_room').show();
        
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }
    });
}

function logoutUser() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        alert("sign-out");
        $('#select_room, #chat_in').hide();
        $('#selectLogin').show();
    }).catch(function (error) {
        // An error happened.
        error = "not signed-out";
        alert(error);
    });
}

function emailLoginButtonClick() {
    $('#selectLogin').hide();
    $('#chat_out, #select_room').show();
}

function googleLoginButtonClick() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function () {
        $('#selectLogin').hide();
        $('#select_room').show();
        alert("logge in with google!");
        

    });

}

function facebookLoginButtonClick() {
//    alert('fixing some issues! Facebook Login aviable soon. ');
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        $('#selectLogin').hide();
        $('#chat_in').show();
        alert("logge in with facebook!");
        getPosts();
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        alert(errorMessage);
    });
}


//*******************************************RUNNING STAFF****************************************************
$(function () {




})
