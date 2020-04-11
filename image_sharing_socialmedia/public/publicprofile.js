

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

    function likeRequest () {

        console.log(this);
        
    }


}