window.onload = () => {

    if (document.getElementById('signin') != null) {

        let signInPageBtn = document.getElementById('signin');

        signInPageBtn.onclick = signInRedirect;

    }

    if (document.getElementById('signup') != null) {

        let signUpPageBtn = document.getElementById('signup');

        signUpPageBtn.onclick = signUpRedirect;
        
    }

    if (document.getElementById('signin') != null) {

        let signInPageBtn = document.getElementById('signin');

        signInPageBtn.onclick = signInRedirect;
        
    }
    
    

    function signInRedirect() {

        location = 'http://localhost:3000/signin'
        
    }

    function signUpRedirect() {

        location = 'http://localhost:3000/signup'
        
    }
}