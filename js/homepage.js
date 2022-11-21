

firebase.auth().onAuthStateChanged((user) => {

    if (user) {

        let userId = user.uid;
        //var userEmail = user.email;

        // console.log(userId)
        // console.log(userEmail)

        //sending a tweet

        document.getElementById("sendtweet").onclick = function () {
            let tweet = document.getElementById("tweet").value;
            let timeStamp = new Date();

            let sendTweet = firebase.firestore().collection("tweets").doc();
            
            sendTweet.set({
                thetweet: tweet,
                timeStamp: timeStamp,
                userid: userId,
                docID:sendTweet
            }).then(()=>{
                window.location.reload()
            })
        }

        

    } else {
        window.location.href = "twitter.html"
    }
}
)


//logout a user
document.getElementById("signout").onclick = function () {

    firebase.auth().signOut().then(() => {
        window.location.href = "twitter.html"
    }

    )
}

