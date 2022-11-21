document.getElementById("register1").onclick = function(){
    //getting values from input 

    let useremail = document.getElementById("email1").value ;
    let userpassword = document.getElementById("password1").value ;
    

    firebase.auth().signInWithEmailAndPassword(useremail , userpassword).then((givenCred) =>{

        window.location.href= "login.html";
    })

}
