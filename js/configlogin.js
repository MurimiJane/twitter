/*document.getElementById("login").onclick = function(){
  //getting values from input 

  let email1 = document.getElementById("email1").value ;
  let password1= document.getElementById("password1").value ;
  

  firebase.auth().signInWithEmailAndPassword(email1 ,password1).then((givenCred) =>{

      window.location.href= "homepage.html";
  }).catch((error) =>{

    let errorMsg = error.message;
    alert(errorMsg)
  })

}*/



document.getElementById("login").onclick = function(){
  //getting values from input 
  document.getElementById("login").style.display = "none";
  document.getElementById("spinner").style.display = "block";

  let email1 = document.getElementById("email1").value ;
  let password1= document.getElementById("password1").value ;
  

  firebase.auth().signInWithEmailAndPassword(email1 ,password1).then((givenCred) =>{

      window.location.href= "profile.html";
  }).catch((error) =>{

    document.getElementById("spinner").style.display = "none";
    document.getElementById("login").style.display= "block";
    let errorMsg = error.message;
    let toastLiveExample = document.getElementById('liveToast')
    let toast = new bootstrap.Toast(toastLiveExample)
    document.getElementById("toastMsg").innerHTML = errorMsg;
    toast.show()
  
  
  })

}

