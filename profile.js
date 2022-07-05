//on change of authentication state
//checking if user is logged in
firebase.auth().onAuthStateChanged((user) => {
    if (user) {

        //assign a variable to user id

        let userId = user.uid;


        //getting data from database collection
        firebase.firestore().collection("users").doc(userId).get().then((doc) => {

            //assigning variables to data
            let userName = doc.data().username;
            let userEmail = doc.data().email;
            let profileImage = doc.data().profilephoto;
            let bgImage = doc.data().backgroundImage;

            //displaying data in html
            document.getElementById("username").innerText = userName;
            document.getElementById("profileimg").src = profileImage;
            document.getElementById("profilepic").src = profileImage;
            document.getElementById("profilepic2").src = profileImage;
            document.getElementById("backgroundpic").src = bgImage;
            document.getElementById("username1").innerText = userName;
            document.getElementById("profilename").innerText = userName;
            document.getElementById("editUserName").value = userName;
            document.getElementById("useremail").innerText = userEmail;


        })

        //edit button to update account
        document.getElementById("editAccount").onclick = function () {

            let editUserName = document.getElementById("editUserName").value;

            firebase.firestore().collection("users").doc(userId).update({
                username: editUserName

            }).then(() => {
                window.location.reload()
            })
        }

        //upload background pic
        document.getElementById("uploadbgImage").onclick = function () {

            let backgroundImage = document.getElementById("editbackground").files[0];

            //creating a storage reference
            let storageReference = firebase.storage().ref();

            //creating a folder
            let uploadTask = storageReference.child("Profilebg/").child(backgroundImage.name).put(backgroundImage);

            uploadTask.on('state_changed', (snapshot) => {

                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                let wholeNumber = Math.round(progress);

                document.getElementById("vProgress").innerText = wholeNumber + "%";
                document.getElementById("progressbar").style.width = wholeNumber + "%";

            }, (error) => {

            }, () => {

                //handle successful uploads
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {


                    firebase.firestore().collection("users").doc(userId).update({
                        backgroundImage: downloadURL
                    }).then(() => {
                        window.location.reload();
                    })

                })
                //display alert once complete
                alert("uploaded succesfully")
            })
        }

        //upload profile image
        document.getElementById("uploadImage").onclick = function () {

            let profilephoto = document.getElementById("editphoto").files[0];

            //creating a storage reference
            let storageReference = firebase.storage().ref();

            //creating a folder
            let uploadTask = storageReference.child("Profile/").child(profilephoto.name).put(profilephoto);

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


                    firebase.firestore().collection("users").doc(userId).update({
                        profilephoto: downloadURL

                    }).then(() => {
                        window.location.reload();
                    })

                })
                //display alert once complete

                alert("uploaded succesfully")
            })
        }

        //function to send tweet to database
        document.getElementById("sendtweet").onclick = function () {
            //get tweet value
            let tweet = document.getElementById("tweet").value;

            //get time the tweet was made
            let timeStamp = new Date();

            //send tweet and its properties to tweets collection in database
            let sendTweet = firebase.firestore().collection("tweets").doc();

            sendTweet.set({
                thetweet: tweet,
                timeStamp: timeStamp,
                userid: userId,
                docID: sendTweet.id,
                countLikes: 0,
                countComments: 0

            }).then(() => {

                //reload the page
                window.location.reload()
            })
        }

        //pull all users from db
        firebase.firestore().collection("users").get().then((usersList) => {
            usersList.forEach((theUser) => {

                let username = theUser.data().username;
                let userProfile = theUser.data().profilephoto;
                let userid = theUser.data().userid;

                console.log(userProfile)


                //pull all tweets from database
                firebase.firestore().collection("tweets").get().then((querySnapshot) => {
                    let content = '';
                    querySnapshot.forEach((doc) => {
                        let theTweet = doc.data().thetweet;
                        let tweetUserId = doc.data().userid;
                        let timestamp = doc.data().timeStamp;
                        let theDay = timestamp.toDate().toDateString();
                        let docID = doc.data().docID;
                        let countlikes = doc.data().countLikes;
                        //let countcomments = doc.data().countComments;

                        if (tweetUserId == userid) {
                            //use jquery to display tweets from database to html page
                            content += '<div class="tweetcontainer">';
                            content += '<div class="tweetheader">';
                            content += ' <img src="' + userProfile + ' " >';
                            content += '<h1>' + username + '&nbsp' + '&nbsp' + theDay + '</h1>';
                            content += '<button onclick="deleteTweet(\'' + docID + '\')" class=" btn btn-primary"  data-bs-toggle="modal" data-bs-target="#deleteModal"> Delete</button>'
                            content += '</div>';
                            content += '<div class="tweetbody">';
                            content += '<img src = "images/icons8-heart-24.png" onclick="likeTweet(\'' + docID + '\')" >';
                            content += '<h1>' + countlikes + '</h1>'
                            content += '<img src = "images/icons8-comment-24.png" class="tweeticon"  onclick="commentTweet(\'' + docID + '\')" data-bs-toggle="modal" data-bs-target="#commentModal">';
                            content += '<h1> </h1>'
                            content += '</div>'
                            content += '<p>' + theTweet + '</p>';
                            content += '</div>';
                            content += '<hr>';
                        }




                        //function to count likes
                        window.likeTweet = function (likes) {

                            let like = firebase.firestore().collection("likes").doc();
                            like.set({
                                tweetId: likes,
                                userid: userId,
                                docId: like.id
                            })

                            let addlike = countlikes + 1;

                            let count = firebase.firestore().collection("tweets").doc(docID);
                            count.update({

                                countLikes: addlike
                            }).then(() => {

                                console.log("You have liked this tweet")
                                //reload the page
                                window.location.reload()
                            })
                        }



                        //function to count comments
                        window.commentTweet = function (comments) {

                            document.getElementById("allcomments").innerHTML = '';
                            //store comments in database
                            document.getElementById("uploadcomment").onclick = function () {
                                let comment = document.getElementById("editcomment").value;
                                let timeStamp = new Date();

                                let sendComment = firebase.firestore().collection("comments").doc();
                                sendComment.set({
                                    tweetid: comments,
                                    comment: comment,
                                    timeStamp: timeStamp,
                                    userid: userId,
                                    docId: sendComment.id
                                })

                            }

                        


                                    firebase.firestore().collection("comments").where("tweetid", "==", comments).get().then((commentSnapshot) => {
                                        let content = '';
                                        commentSnapshot.forEach((tweet) => {
                                            //let docData = comments.data()
                                            //console.log(docData)
                                            let theComment = tweet.data().comment;
                                            //let commentId = doc.data().commentid;
                                            //let timestamp = doc.data().timeStamp;
                                            //let theDay = timestamp.toDate().toDateString();
                                            //let docID = doc.data().docID;

                                            
                                                //use jquery to display comments from database to html page
                                                content += '<div class="commentcontainer">';
                                                content += '<p>' + theComment + '<p>';
                                                content += '<hr>';
                                                content += '</div>';

                                                //console.log(doc.id, " => ", doc.data());
                                        })
                                        $("#allcomments").append(content);
                                        
                                    })
                            
                        

                            /*
                            firebase.firestore().collection("tweets").get().then((tweetsList) => {
                                tweetsList.forEach((tweet) => {

                                    let tweetID = tweet.data().docID;
                                    //pull all comments associated to the tweet from database
                                    firebase.firestore().collection("comments").get().then((commentSnapshot) => {
                                        let content = '';
                                        commentSnapshot.forEach((doc) => {
                                           
                                            let theComment = doc.data().comment;
                                            let commentId = doc.data().commentid;
                                            let timestamp = doc.data().timeStamp;
                                            let theDay = timestamp.toDate().toDateString();
                                            //let docID = doc.data().docID;

                                            if (commentId == tweetID) {
                                                //use jquery to display comments from database to html page
                                                content += '<div class="commentcontainer">';
                                                content += '<p>' + theComment + '<p>';
                                                content += '<hr>'
                                                content += '</div>';

                                            }
                                            
                                        })
                                        $("#allcomments").append(content);
                                    })
                                  
                                })
                               
                            })*/

                            // let addcomment = countcomments + 1;

                            //let count = firebase.firestore().collection("tweets").doc(docID);
                            //count.update({

                            // countComments: addcomment
                            // }).then(() => {

                            // console.log("You have made a comment")
                            //reload the page

                            // })
                        }
                    })
                    $("#alltweets").append(content);


                })



            })
        })


        window.deleteTweet = function (value) {
            console.log(value)

            document.getElementById("deletebtn").onclick = function () {
                firebase.firestore().collection("tweets").doc(value).delete().then(() => {
                    console.log("Document successfully deleted!");
                    window.href.reload();
                })
            }
        }




    } else {

        //if auth state has not changed, take back to sign in page
        window.location.href = "signin.html"
    }
})




/*
//delete tweet function
function deleteTweet(value){
    console.log(value)
}
*/


/*firebase.auth().onAuthStateChanged((user) => {

    if (user) {

        //assign variable to user ID
        let userId = user.uid;


        //sending a tweet
        document.getElementById("sendtweet").onclick = function () {
            //get the tweet inputed
            let tweet = document.getElementById("tweet").value;

            //define time when tweet was made
            //assign variable to time
            let timeStamp = new Date();

            //send tweet to database
            let sendTweet = firebase.firestore().collection("tweets").doc();

            sendTweet.set({
                thetweet: tweet,
                timeStamp: timeStamp,
                userid: userId,
                docID: sendTweet
            }).then(() => {
                window.location.reload()
            })
        }



    } else {

        window.location.href = "sign in.html"
    }
})


*/

