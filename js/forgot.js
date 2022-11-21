document.getElementById("resetpassword").onclick = function (){
let email = document.getElementById("email").value ;

firebase.auth().sendPasswordResetEmail(email).then(() => {
    window.location.href= "resetsuccess.html";
  })

}