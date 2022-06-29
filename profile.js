//on change of authentication state
firebase.auth().onAuthStateChanged((user) => {
    if (user) {

        //assign a variable to user id

        let userID = user.uid;


        //getting data from database collection
        firebase.firestore().collection("users").doc(userID).get().then((doc) => {

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

            firebase.firestore().collection("users").doc(userID).update({
                username: editUserName

            }).then(() => {
                window.location.reload()
            })
        }

        //upload backgroud pic
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


                    firebase.firestore().collection("users").doc(userID).update({
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


                    firebase.firestore().collection("users").doc(userID).update({
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
                userid: userID,
                docID: sendTweet
            }).then(() => {

                //reload the page
                window.location.reload()
            })
        }



        //pull all tweets from database
        firebase.firestore().collection("tweets").get().then((querySnapshot) => {
            let content = '';
            querySnapshot.forEach((doc) => {
                let thetweet = doc.data().thetweet;
                let theUser = doc.data().userid;
                let timestamp = doc.data().timeStamp;
                let theDay = timestamp.toDate().toDateString();


                //use jquery to display tweets from database to html page
                content += '<div class="tweetcontainer">';
                content += '<div class="tweetheader">';
                content += '<h1>' + theUser + '<br>' + theDay + '</h1>';
                content += '</div>';
                content += '<p>' + thetweet + '</p>';
                content += '</div>';
                content += '<hr>';

            })
            $("#alltweets").append(content);
        })


    } else {

        //if auth state has not changed, take back to sign in page
        window.location.href = "sign in.html"
    }
})



firebase.auth().onAuthStateChanged((user) => {

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
}
)


