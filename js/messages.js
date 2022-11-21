firebase.auth().onAuthStateChanged((user) => {
    if (user) {

        //assign a variable to user id

        let myuserId = user.uid;

        //pull all users from the database
        firebase.firestore().collection("users").get().then((usersList) => {
            let content = '';
            usersList.forEach((theUser) => {

                let username = theUser.data().username;
                let userProfile = theUser.data().profilephoto;
                let userid = theUser.data().userid;

                let thelink = "messages.html" + "?" + userid;

                if (myuserId != userid) {
                    content += '<a href= "' + thelink + '">';
                    content += '<div class="Userscontainer">';
                    content += '<div class="d-flex" style="align-items:center;" cursor:pointer; >';
                    content += '<img src=" ' + userProfile + '">';
                    content += '<h6>' + username + '</h6>';
                    content += '</div>';
                    content += '</div>';
                    content += '</a>';
                    content += '<br>';
                    content += '<hr>';
                }
            })
            $("#allUsers").append(content);
            $("#selectparticipants").append(content);


        })

        //display username on navbar
        firebase.firestore().collection("users").get().then((usersList) => {
            let content = '';
            usersList.forEach((theUser) => {

                let username = theUser.data().username;
                let userid = theUser.data().userid;
                let thelink = "messages.html" + "?" + userid;

                if (myuserId != userid) {
                    content += '<a href= "' + thelink + '">';
                    content += '<h6>' + username + '</h6>';
                    content += '</a>';
                
                }
            })
            $("#username").append(content);
        })

        let recievedID = decodeURIComponent(window.location.search);
        let recUserID = recievedID.substring(1);



        //sending message to firebase
        document.getElementById("sendchat").onclick = function () {

            let message = document.getElementById("chatText").value;

            let sendChat = firebase.firestore().collection("chats").doc();
            sendChat.set({
                chatID: sendChat.id,
                messageFrom: myuserId,
                messageTo: recUserID,
                message: message
            }).then(() => {
                window.location.reload();
            })

        }

        //pull mytexts from database
        firebase.firestore().collection("chats").get().then((chatList) => {
            let content = '';
            chatList.forEach((doc) => {

                let messageFrom = doc.data().messageFrom;
                let messageTo = doc.data().messageTo;
                let message = doc.data().message;


                if (myuserId == messageFrom && messageTo == recUserID) {

                    content += '<p class="messageTo">' + message + '</p>';
                    content += ' <hr>';

                }
                if (messageTo == myuserId && messageFrom == recUserID) {
                    content += '<p class="messageFrom">' + message + '</p>';
                    content += ' <hr>';
                }

                /*if (groupID == recievedID) {
                    content += '<p class="messageFrom">' + message + '</p>';
                    content += ' <hr>';
                }*/
            })

            $("#allmessages").append(content);

        })


        //creating group collection
        document.getElementById("groupbtn").onclick = function () {

            let groupName = document.getElementById("groupname").value;
            let timeStamp = new Date();


            let sendgChat = firebase.firestore().collection("groupchats").doc();
            sendgChat.set({
                groupID: sendgChat.id,
                timeStamp: timeStamp,
                groupName: groupName

            }).then(() => {
                window.location.reload();
            })


        }


        //upload groupprofile image
        document.getElementById("uploadImage").onclick = function () {

            let groupprofile = document.getElementById("editphoto").files[0];

            //creating a storage reference
            let storageReference = firebase.storage().ref();

            //creating a folder
            let uploadTask = storageReference.child("groupProfile/").child(groupprofile.name).put(groupprofile);

            uploadTask.on('state_changed', (snapshot) => {

                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                let wholeNumber = Math.round(progress);

                document.getElementById("vProgress").innerText = wholeNumber + "%";
                document.getElementById("progressbar").style.width = wholeNumber + "%";
                console.log(progress)
            }, (error) => {

            }, () => {
                //handle successful uploads

                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {


                    firebase.firestore().collection("groupchats").doc(groupID).update({
                        groupprofile: downloadURL

                    }).then(() => {
                        window.location.reload();
                    })

                })
                //display alert once complete

                alert("uploaded succesfully")
            })
        }


        document.getElementById("selectparticipants").onclick = function(){
              let addedPa = document.getElementById("selectparticipants").value;
        }

        //create participants collection

        firebase.firestore().collection("users").get().then((usersList) => {
            usersList.forEach((theUser) => {

                let userid = theUser.data().userid;
                
                document.getElementById("addPa").onclick = function () {

                    let timeStamp = new Date();

                    let addPa = firebase.firestore().collection("groupPa").doc();
                    addPa.set({
                        userid: userid,
                        groupID: sendgChat.id,
                        timeStamp: timeStamp,

                    }).then(() => {
                        window.location.reload();
                    })

                }
            })
        })


        firebase.firestore().collection("users").where("groupid", "==", "recievedID").get().then((groupSnapshot) => {
            let content = '';
            groupSnapshot.forEach((user) => {

                let theuser = user.data().users;


                //use jquery to display comments from database to html page
                content += '<p>' + theuser + '<p>';


            })
            $("#participants").append(content);

        })



        //collectiongrouppa
        //docA
        //userid
        //groupid

        //docB
        //userid
        //groupid

        //pull users from grouppa where groupid == recievedid


        //pull all messages from groupchat where groupid==recievedid
        firebase.firestore().collection("groupchats").get().then((groupList) => {
            let content = '';
            groupList.forEach((theGroup) => {

                let groupname = theGroup.data().groupName;
                let groupID = theGroup.data().groupID;
                let groupprofile = theGroup.data().groupprofile;

                let thelink = "messages.html" + "?" + groupID;

                if (myuserId != groupID) {
                    content += '<a href= "' + thelink + '">';
                    content += '<div class="Userscontainer">';
                    content += '<div class="d-flex" style="align-items:center;" cursor:pointer; >';
                    content += '<img src=" ' + groupprofile + '">';
                    content += '<h6>' + groupname + '</h6>';
                    content += '</div>';
                    content += '</div>';
                    content += '</a>';
                    content += '<br>';
                    content += '<hr>';
                }
            })
            $("#allUsers").append(content);
        })

        //pull mytexts from database
        firebase.firestore().collection("groupchats").get().then((chatList) => {
            let content = '';
            chatList.forEach((doc) => {

                // groupName = doc.data().groupName;
                //let messageFrom = doc.data().messageFrom;
                //et messageTo = doc.data().messageTo;
                //let message = doc.data().message;




                //if (myuserId == messageFrom && messageTo == recUserID) {

                // content += '<p class="messageTo">' + message + '</p>';
                // content += ' <hr>';

                // }
                //if (messageTo == myuserId && messageFrom == recUserID) {
                // content += '<p class="messageFrom">' + message + '</p>';
                // content += ' <hr>';
                // }
            })

            $("#allmessages").append(content);

        })


    } else {
        window.location.href = "signin.html"
    }
})