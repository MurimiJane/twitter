document.getElementById("register").onclick = function () {
    //getting values from input 
    document.getElementById("register").style.display = "none";
    document.getElementById("spinner").style.display = "block";

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
      let name = document.getElementById("username").value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCred) => {

        let userId = userCred.user.uid;
        let timeStamp = new Date();

            firebase.firestore().collection("users").doc(userId).set({
                username: name,
                email:email,
                timeStamp: timeStamp,
                userid: userId
            }).then(()=>{
                window.location.href = "profile.html";
            })

       



    }).catch((error) => {

        document.getElementById("spinner").style.display = "none";
        document.getElementById("register").style.display = "block";
        let errorMsg = error.message;
        let toastLiveExample = document.getElementById('liveToast')
        let toast = new bootstrap.Toast(toastLiveExample)
        document.getElementById("toastMsg").innerHTML = errorMsg;
        toast.show()


    })


}

/*
firebase.auth().onAuthStateChanged((user) => {
    if (user) {

        let userId = user.uid;

        document.getElementById("register").onclick = function () {
            document.getElementById("register").style.display = "none";
            document.getElementById("spinner").style.display = "block";

            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
        

            firebase.auth().createUserWithEmailAndPassword(email, password).then((userCred) => {

                window.location.href = "homepage.html";
        
        
        
            }).catch((error) => {
        
                document.getElementById("spinner").style.display = "none";
                document.getElementById("register").style.display = "block";
                let errorMsg = error.message;
                let toastLiveExample = document.getElementById('liveToast')
                let toast = new bootstrap.Toast(toastLiveExample)
                document.getElementById("toastMsg").innerHTML = errorMsg;
                toast.show()
        
        
            })
        
            let name = document.getElementById("username").value;

            let timeStamp = new Date();

            firebase.firestore().collection("users").doc().set({
                username: name,
                timeStamp: timeStamp,
                userid: userId
            })
        }

    } else {
        window.location.href = "register.html"
    }
})

*/



/*
    firebase.auth().onAuthStateChanged((user) => {

        if (user) {
           let userId = user.uid;
            
            //sending a user
            document.getElementById("register").onclick = function () {
                //getting values from input 
                document.getElementById("register").style.display = "none";
                document.getElementById("spinner").style.display = "block";
            
                let email = document.getElementById("email").value;
                let password = document.getElementById("password").value;
            
                firebase.auth().createUserWithEmailAndPassword(email, password).then((userCred) => {
            
                    window.location.href = "homepage.html";
            
            
                }).catch((error) => {
            
                    document.getElementById("spinner").style.display = "none";
                    document.getElementById("register").style.display = "block";
                    let errorMsg = error.message;
                    let toastLiveExample = document.getElementById('liveToast')
                    let toast = new bootstrap.Toast(toastLiveExample)
                    document.getElementById("toastMsg").innerHTML = errorMsg;
                    toast.show()
            
            
                })

                let name = document.getElementById("name").value;

                let timeStamp = new Date();
                
                firebase.firestore().collection("users").doc().set({
                    username: name,
                    timeStamp: timeStamp,
                    userid: userId
                })
                
            }
            
      
    
    
        } else {
            window.location.href = "register.html"
        }
    }
    )

*/





/*
document.getElementById("sendtweet").onclick = function () {
    let tweet = document.getElementById("tweet").value;
    let timeStamp = new Date();

    firebase.firestore().collection("tweets").doc().set({
        thetweet: tweet,
        timeStamp: timeStamp,
        userid: userId
    })
}
*/

