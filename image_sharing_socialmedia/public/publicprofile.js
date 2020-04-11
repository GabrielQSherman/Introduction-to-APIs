

window.onload = () => {

    console.log('start');
    


    if (document.getElementById('signin') != null) {
    
    document.getElementById('signin').onclick = signinRedirect;

    }

    let allLikeButtons = document.getElementsByClassName('likebuttons');

    if (allLikeButtons.length > 0) {

        for (let i = 0; i < allLikeButtons.length; i++) {
            
            let img = allLikeButtons[i];

            img.ondblclick = likeRequest;
            
        }
        
    }

    function signinRedirect() {

        // console.log(this);
        
        
        location = 'http://localhost:3000/signin'
    }

    async function likeRequest () {

                // console.log(this.parentElement.id);

            const updateCapObj = { postId: this.parentElement.id},

            likeReq = JSON.stringify(updateCapObj),

            likeReqObj = {
        
                method: 'PATCH',

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: likeReq
            };


        try {

            await fetch('', likeReqObj)

            .then(readS => {
                console.log(readS);
                return readS.json()
            })

            .then( parsedRes => {

                console.log(parsedRes);
                
            })
            
        } catch (err) {
            
            console.log(err, err.message);
            
        }
        
    }


}