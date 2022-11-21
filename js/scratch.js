document.getElementById("groupbtn").onclick = function () {

    let groupName = document.getElementById("groupname").value;
    let timeStamp = new Date();
   

    let sendgChat = firebase.firestore().collection("groupchats").doc();
    sendgChat.set({
        groupID: sendgChat.id,
        timeStamp: timeStamp,
        groupName: groupName,
       
    }).then(() => {
        window.location.reload();
    })


}

document.getElementById("addPa").onclick = function () {

    let timeStamp = new Date();
    let userId = user.uid;

    let addPa = firebase.firestore().collection("groupPa").doc();
    addPa.set({
        userid: userId,
        groupID: sendgChat.id,
        timeStamp: timeStamp,
    
    }).then(() => {
        window.location.reload();
    })

}


firebase.firestore().collection("users").where("groupid", "==", "recievedID").get().then((groupSnapshot) => {
    let content = '';
    groupSnapshot.forEach((user) => {

        let theuser = user.data().users;


        //use jquery to display comments from database to html page
        content += '<p>' + theuser + '<p>';


    })
    $("#participants").append(content);

})

