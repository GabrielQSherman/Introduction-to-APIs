window.onload = () => {
    
    let signInPageBtn = document.getElementById('signin');

    signInPageBtn.onclick = backToSignIn;

    function backToSignIn() {

        location = 'http://localhost:3000/'
        
    }
}