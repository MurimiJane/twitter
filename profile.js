/*firebase.auth().onAuthStateChanged((user)=>{

    if(user){

        let userID = user.uid;
       // document.getElementById("username").innerText =userID
    
       firebase.firestore().collection("users").doc(userID).get().then((theuser)=>{
       // console.log(doc.data().userid)
        let userName = theuser.data().userid;
        document.getElementById("username").innerText = userName;
       })
    }else{

    }
})*/

firebase.auth().onAuthStateChanged((user) => {
    if (user) {

        var userID = user.uid;

        // 

        firebase.firestore().collection("users").doc(userID).get().then((doc) => {

            let userName = doc.data().username;
            document.getElementById("username").innerText = userName;
            document.getElementById("username1").innerText = userName;
            document.getElementById("profilename").innerText = userName;

            let userEmail = doc.data().email;
            document.getElementById("useremail").innerText = userEmail;


        })


        document.getElementById("sendtweet").onclick = function () {
            let tweet = document.getElementById("tweet").value;
            let timeStamp = new Date();
    

            let sendTweet = firebase.firestore().collection("tweets").doc();

            sendTweet.set({
                thetweet: tweet,
                timeStamp: timeStamp,
                userid: userID,
                docID: sendTweet
            }).then(() => {
                window.location.reload()
            })
        }



        //pull all tweets
        firebase.firestore().collection("tweets").get().then((querySnapshot) => {
            let content = '';
            querySnapshot.forEach((doc) => {
                let thetweet = doc.data().thetweet;
                let theUser = doc.data().userid;
                let timestamp = doc.data().timeStamp;
                //let theDate = timestamp.toDate().toTimeString();
                let theDay = timestamp.toDate().toDateString();
                //let theTime = timestamp.toTimeString();
                //let theMonth = timestamp.toHours().toTimeString();

                content += '<div class="tweetcontainer">';
                content += '<div class="tweetheader">';
                content += '<h1>'  + theUser + " " + theDay + '</h1>';
                content += '</div>';
                content += '<p>' + thetweet + '</p>';
                content += '</div>';
                content += '<hr>';

            })
            $("#alltweets").append(content);
        })


    } else {
        window.location.href = "twitter.html"
    }
})



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
                docID: sendTweet
            }).then(() => {
                window.location.reload()
            })
        }



    } else {
        window.location.href = "twitter.html"
    }
}
)

let content = ' ';

content += '<ul>'
content += '<li class="list items" >Home</li>'
content += '<li class="list items" >About us</li>'
content += '<li class="list items" >Contact us</li>'
content += '<ul>'
$(" #navbar").append(content);