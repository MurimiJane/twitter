
firebase.auth().onAuthStateChanged((user)=>{
    if(user){

        var myId = user.uid;

        //pulling all users from the db
        firebase.firestore().collection("users").get().then((usersList)=>{
            var content = '';
            usersList.forEach((theUser)=>{

                let username = theUser.data().username;
                let userId = theUser.data().userId;
                let userProfile = theUser.data().profilephoto;

                let thelink = "messages.html"+"?"+userId;

                if(myId != userId ){
                    content += '<a href="'+thelink+'" >';
                    content += '<div class="Userscontainer">';
                    content += '<div class="d-flex" style="align-items:center;" cursor:pointer; >';
                    content += '<img src=" ' + userProfile + '">';
                    content += '<h6>' + username + '</h6>';
                    content += '</div>';
                    content += '<hr>'
                    content += '</a>';
                }
                
            })

            $("#allUsers").append(content);  
        })
        //end

        //get the user id
        let receivedID =  decodeURIComponent(window.location.search);
        let recUserID = receivedID.substring(1);


        //send a chat

        document.getElementById("sendchat").onclick = function(){

            let message =  document.getElementById("chatText").value;

            let sendText = firebase.firestore().collection("chats").doc();
            sendText.set({
                chatID:sendText.id,
                messageFrom:myId,
                messageTo:recUserID,
                message:message
            }).then(()=>{
                window.location.reload();
            })
        }

        //end

    //read all messages

    firebase.firestore().collection("chats").get().then((usersList)=>{
        var content = '';
        usersList.forEach((doc)=>{
           
            let messageFrom = doc.data().messageFrom;
            let message = doc.data().message;
            let messageTo = doc.data().messageTo;


            
            if(messageTo ==recUserID && messageFrom ==myId ){
                content += '<p class="messageTo">'+message+'</p>';
            }

            if(messageTo ==myId && messageFrom == recUserID){
                content += '<p class="messageFrom">'+message+'</p>';
            }

        })
        $("#allmessages").append(content);  
    })
    //end



}else{
    window.location.href = "sign.html"
}
})
