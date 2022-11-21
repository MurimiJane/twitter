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







