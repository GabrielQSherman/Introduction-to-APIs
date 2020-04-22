

window.onload = () => {

    //getting access to DOM elements
    const userName = document.getElementById('username').innerText,
          homePageBtn = document.getElementById('home'),
          pagebox = document.getElementById('pagebox');

    let allLikeButtons = document.getElementsByClassName('likebuttons');

    // console.log(userName);

    //setting event listeners
    if (document.getElementById('signin') != null) {
    
    document.getElementById('signin').onclick = signinRedirect;

    }

    homePageBtn.onclick = homeRedirect;


    pagebox.ondblclick = changeBackground;


    if (allLikeButtons.length > 0) {

        for (let i = 0; i < allLikeButtons.length; i++) {
            
            let img = allLikeButtons[i];

            img.ondblclick = likeRequest;
            
        }
        
    }

    //simple eventlistener functions, redirects

    function changeBackground(evnt) {
        // console.log(this, evnt,evnt.target);

        if (this == evnt.target) {
            this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        }
        
    }

    function signinRedirect() {

        // console.log(this);
        
        
        location = 'http://localhost:3000/signin'
    }

     //direct window.location back to homepage

    function homeRedirect() {

        location = 'http://localhost:3000/'
        
    }

    //request to like a post
    
    async function likeRequest () {

                // console.log(this.parentElement.id);

            const likeReqBody = { postId: this.parentElement.id},

            likeReq = JSON.stringify(likeReqBody),

            likeReqObj = {
        
                method: 'PATCH',

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: likeReq
            };


        try {

            await fetch(`http://localhost:3000/user/${userName}/likepost`, likeReqObj)

            .then(readS => {
                // console.log(readS);
                return readS.json()
            })

            .then( parsedRes => {


                let userDiv = this.parentElement.parentElement;

                for (let i = 0; i < userDiv.children.length; i++) {


                     if (userDiv.children[i].className == 'likesCount') {

                        let newLikes = parseInt(userDiv.children[i].innerText.replace(/ Likes/, '')) + 1;
                        
                        userDiv.children[i].innerText = `${newLikes} Likes`;
                    }
                    
                }
                // this.parentElement

                this.style.display = 'none'
                
            })
            
        } catch (err) {
            
            console.log(err, err.message);
            
        }
        
    }


}