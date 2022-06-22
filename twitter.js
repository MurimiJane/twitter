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
}


