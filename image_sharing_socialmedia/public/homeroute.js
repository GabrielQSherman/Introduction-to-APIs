window.onload = () => {

    if (document.getElementById('signin') != null) {

        let signInPageBtn = document.getElementById('signin');

        signInPageBtn.onclick = signInRedirect;

    }

    if (document.getElementById('signup') != null) {

        let signUpPageBtn = document.getElementById('signup');

        signUpPageBtn.onclick = signUpRedirect;
        
    }

    if (document.getElementById('home') != null) {

        let signUpPageBtn = document.getElementById('home');

        signUpPageBtn.onclick = homeRedirect;
        
    }

    if (document.getElementById('signinrequest') != null) {

        let signInPageBtn = document.getElementById('signinrequest');

        signInPageBtn.onclick = signInRequest;
        
    }

    if (document.getElementById('signuprequest') != null) {

        let signInPageBtn = document.getElementById('signuprequest');

        signInPageBtn.onclick = signUpRequest;
        
    }
    

    function signInRedirect() {

        location = 'http://localhost:3000/signin'
        
    }

    function signUpRedirect() {

        location = 'http://localhost:3000/signup'
        
    }

    function homeRedirect() {

        location = 'http://localhost:3000/'
        
    }

    function signInRequest() {

       //access form create object

       //make fetch api request
        
    }

    function signUpRequest() {

        //access form create object

       //make fetch api request
        
    }
    
}