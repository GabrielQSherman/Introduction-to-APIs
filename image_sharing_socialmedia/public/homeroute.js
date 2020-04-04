window.onload = () => {

    if (document.getElementById('signin') != null) {

        let signInPageBtn = document.getElementById('signin');

        signInPageBtn.onclick = signInRedirect;

    }

    if (document.getElementById('signup') != null) {

        let signUpPageBtn = document.getElementById('signup');

        signUpPageBtn.onclick = signUpRedirect;
        
    }

    if (document.getElementById('searchForUserSub') != null) {

        let searchUserBtn = document.getElementById('searchForUserSub');

        searchUserBtn.onclick = searchUser;
        
    }

    if (document.getElementById('home') != null) {

        let homePageBtn = document.getElementById('home');

        homePageBtn.onclick = homeRedirect;
        
    }

    if (document.getElementById('signinrequest') != null) {

        let signInRequestBtn = document.getElementById('signinrequest'),

            profileRequestBtn = document.getElementById('goToProfile');

        signInRequestBtn.onclick = signInRequest;

        profileRequestBtn.onclick = userProfileRequest;
        
    }

    if (document.getElementById('signuprequest') != null) {

        let signUpRequestBtn = document.getElementById('signuprequest');

        signUpRequestBtn.onclick = signUpRequest;
        
    }

    if (document.getElementById('headMsg') != null) {

        let headMsg = document.getElementById('headMsg');
    }

    if (document.getElementById('footMsg') != null) {

        let footMsg = document.getElementById('footMsg');
    }
    
    //Simple redirect functions, location is a property of the global 'window' object
    function signInRedirect() {

        location = 'http://localhost:3000/signin'
        
    }

    function signUpRedirect() {

        location = 'http://localhost:3000/signup'
        
    }

    function homeRedirect() {

        location = 'http://localhost:3000/'
        
    }

    function userProfileRequest() {    

        location = 'http://localhost:3000/user/profile';

    }


    //REQUEST FUNCTIONS 


    //REQUEST FOR SIGNIN 
    async function signInRequest() {

        let signInInfo = compile_form_data('signinform'), status = 200;

        console.log(signInInfo);

        if (signInInfo === false) {

            headMsg.innerText = 'Request Could Not Be Made';

            footMsg.innerText = 'A Required Input Was Left Blank'

            return

        } 

            //DATA TO LOG A USER IN
            const reqData = {

                headers: {
                    
                    'Access-Control-Allow-Origin': '*',
                    
                    Accept: 'application/json',

                    'content-type':'application/json'
                
                },

                method: 'POST',
                
                body: JSON.stringify(signInInfo)
            };

            await fetch('http://localhost:3000/login', reqData)

            .then( readable_stream_res => { 

                   console.log(readable_stream_res);

                    if (readable_stream_res.status != 200) {

                        status = readable_stream_res.status
                        
                    }
                    
                    return readable_stream_res.json()
            })

            .then( response => {

                console.log(response);

                if (status === 200) {

                    // console.log(response.data);
                    
                    this.style = 'display: none';
                    document.getElementById('signup').style = 'display: none';
                    document.getElementById('goToProfile').style = 'display: inline';

                    clearForm('signinform');

                    headMsg.innerText = 'Sign in Successful'
                    footMsg.innerHTML = `Click Go To Profile!`

                    document.cookie = `temp_token=${response.token}`;

                } else if (status === 271) { //catches error if password or email fail credential check in backend
                    
                    headMsg.innerHTML = `Sign in NOT Successful:<br>${response.message}`
                    footMsg.innerHTML = `A Problem Occured:<br>${response.message}`

                } else {

                    headMsg.innerHTML = `An Unexpected Error Occured:<br>Error Status ${status}`
                    footMsg.innerHTML = `A Problem Occured:<br>${response.message}`

                }
                
            })

            .catch ( err => {

                headMsg.innerText = 'Sign In Request Failed'

                footMsg.innerText = `${err.message}. Check Log For Detail`;

                console.log(err);

                return

            })        
        
    }

    //REQUEST FOR SIGNUP 
    async function signUpRequest() {

        let signUpInfo = compile_form_data('signupform'),
            headMsg = document.getElementById('headmessage'),
            footMsg = document.getElementById('signinmessage');

        console.log(signUpInfo);
        

          if (signUpInfo === false) {

            headMsg.innerText = 'A Required Input Was Left Blank'

            return

          } 
        console.log(signUpInfo);
        //  this data will be passed to axios as the 'data' parameter
            const reqData = {

                headers: {
                    
                    'Access-Control-Allow-Origin': '*',
                    
                    Accept: 'application/json',

                    'content-type':'application/json'
                
                },

                method: 'POST',
                
                body: JSON.stringify(signUpInfo)
            };

            await fetch('http://localhost:3000/users', reqData)

             .then( readable_stream_res => { 

                //    console.log(readable_stream_res);

                    if (readable_stream_res.status != 201) {
                        
                        throw new Error ('Sign Up Request Failed')
                    }
                    
                    return readable_stream_res.json()
            })

            .then( response => {

                // console.log(response);

                 clearForm('signupform');

                 this.style = 'display: none';

                headMsg.innerText = 'Successful sign up!!!'

                footMsg.innerText = `Thank you for signing up ${response.document.name}! Click Below To Login`
                
                
            }) 


            .catch ( err => {

                console.log(err.message);

                headMsg.innerText = 'Sign Up NOT Successful'

                footMsg.innerText = `Error: ${err.message}`
                
                return

            })
        
    }

    function searchUser() {
        console.log('testing search');

        let userName = document.getElementById('userSearch').value;

        console.log(userName);
        
        
    }


    //function that will take a given form, and a js object will be created from the forms inputs. 
    //to check if a user left an option blank it will return false. Also the user will be informed via the input box that was left blank
    function compile_form_data(formID) {

        let dataObj = {}, leftBlank = false,

            formElement = document.getElementById(formID);

            for (const key of formElement) {

                if (key.value == '') {

                    key.placeholder = 'This is required'

                    leftBlank = true
                    
                }

                dataObj[key.name] = key.value

            }


        if (leftBlank) {

            return false
            
        } else {

            return dataObj
        }

    }

    //simple function that will clear a given form of the user inputs
    function clearForm(formID) {

        let formElement = document.getElementById(formID);

        for (const key of formElement) {

            key.value = '';

        }

    }
    
}