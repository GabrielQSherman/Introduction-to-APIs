window.onload = () => {

    if (document.getElementById('signin') != null) {

        let signInPageBtn = document.getElementById('signin');

        signInPageBtn.onclick = signInRedirect;

    }

    if (document.getElementById('signup') != null) {

        let signUpPageBtn = document.getElementById('signup');

        signUpPageBtn.onclick = signUpRedirect;
        
    }

    if (document.getElementById('passwordAgain') != null) {

        document.getElementById('password').oninput = checkPassMatch;
        document.getElementById('passwordAgain').oninput = checkPassMatch;
    }

    if (document.getElementById('searchForUserSub') != null) {

        let searchUserBtn = document.getElementById('searchForUserSub');

        searchUserBtn.onclick = searchUser;
        
    }

    if (document.getElementById('allPost') != null) {

        document.getElementById('allPost').onclick = allPostRedirect;

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

    if (document.getElementById('privateProfile') != null) {

        document.getElementById('privateProfile').onclick = userProfileRequest
        
    }

    if (document.getElementById('userPublicProfile') != null) {

        document.getElementById('userPublicProfile').onclick = publicProfile

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

    function publicProfile() {

        let username = document.getElementById('userNameHeading').innerText;
        console.log(username);
        
        location = `http://localhost:3000/${username}`;
        
    }

    function allPostRedirect() {
        location = `http://localhost:3000/frontpage`;
    }

    //simple event listener funtion
    function checkPassMatch() {

        // console.log(document.getElementById('passwordAgain'));

        let input1 = document.getElementById('password'),
            input2 = document.getElementById('passwordAgain'),
            lable1 = document.getElementById('passwordL'),
            lable2 = document.getElementById('passwordAL'),
            lable3 = document.getElementById('passReq'),
            lable4 = document.getElementById('passMatch');
    
        input2.style.display = 'inline'
        lable2.style.display = 'inline'
        lable4.style.display = 'inline'
        lable3.style.display = 'inline'
        if (input1.value.length >= 7) {
            lable3.style.color = 'green';
        } else {
            lable3.style.color = 'red';

        }


        if (input1.value == input2.value ) {

            lable4.style.color = 'green';
            
        } else {

            lable4.style.color = 'red';

        }


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

        const namesNotAllowed = ['user', 'login', 'signin', 'signup', 'signedout', 'home', 'frontpage', 'landingpage', 'latestpost', 'popularpost', 'newestpost', 'post', 'posts'];

        let returningBool = false;

        // console.log(document.getElementById('signupform'));
        const SUF = document.getElementById('signupform');

        if (namesNotAllowed.include(SUF.name.value.trim())) {
            alert('You attempted to signup with a username that is not allowed, try a diffrent one.')
            returningBool = true;
        }

        if (SUF.profileColor.value == '') {
            alert('You must select a profile color')
            returningBool = true;
        }

        if (SUF.password.value != SUF.passwordAgain.value) {
            alert('Passwords do not match')
            returningBool = true;
        } else if (SUF.password.value.length < 7) {
            alert('Password does not meet requirements')
            returningBool = true;
        } 

        for (const input of SUF) {
            if (input.value.trim() == '') {
                input.placeholder = 'This is a required value';
                input.value = ''
                input.style.color = 'red';

                returningBool = true;
            }
        }


        if (returningBool) {
            console.log('signup request could not proceed');
            return
        }


        let signUpInfo = {

            profileColor: SUF.profileColor.value,
            name: SUF.name.value.trim(),
            username: SUF.username.value.trim().replace(/ /g, '-'),
            email: SUF.email.value.trim(),
            password: SUF.password.value.trim()
        },
        headMsg = document.getElementById('headmessage'),
        footMsg = document.getElementById('signinmessage');

        // console.log(signUpInfo);
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

            let badRequest; //bool to detirm logic path when readable stream shows request failed

            await fetch('http://localhost:3000/users', reqData)

             .then( readable_stream_res => { 

                 badRequest = readable_stream_res.status != 201 ? true : false;

                return readable_stream_res.json()
            })

            .then( response => {
                
                if (badRequest === false) {

                      clearForm('signupform');

                    this.style = 'display: none';

                    headMsg.innerText = 'Successful sign up!!!'

                    footMsg.innerText = `Thank you for signing up ${response.document.name}! Click Below To Login`
                    
                    
                } else {

                    if (response.message.includes('dup key: { email')) {

                        alert('That email is already in user.')

                    } else if (response.message.includes('email')) {
                        
                        alert('A Vaild Email Is Needed For Signup')
                        
                    } else if (response.message.includes('dup key: { username')) {
                        alert('That username is already taken. \n:(')
                    } else if (response.message.includes('password')) {
                        console.log('A Problem Occured, Try A Diffrent Password');
                        
                    } 

                }   
                
            }) 


            .catch ( err => {

                console.log(err.message);

                headMsg.innerText = 'Sign Up NOT Successful'

                footMsg.innerText = `Error: ${err.message}`
                
                return

            })
        
    }

    async function searchUser() {
        
        let userName = document.getElementById('userSearch').value.trim();

        console.log(userName);

        await fetch(`/getuserbyname/${userName}`)
        
        .then( readable_stream_res => { 

            //    console.log(readable_stream_res);

            if (readable_stream_res.status == 404) {

                document.getElementById('userSearchMsg').innerText = 'No User Could Be Found With That Name'
                
            }

            return readable_stream_res.json()

        })

        .then( response => {
            
            console.log(response);

            if (response.posts != undefined) {

                document.getElementById('userSearchMsg').innerText = 'View Post Below'

                document.getElementById('searchForUserSub').style.display = 'none';

                let publicProfileBtn = document.getElementById('publicProfile');

                publicProfileBtn.style.display = 'inline';

                publicProfileBtn.innerText = `View ${response.username}'s ${response.posts} Posts`;

                publicProfileBtn.username = response.username;

                publicProfileBtn.onclick = publicProfileRequest;
                
                
            } else if (response.username != undefined) {

                document.getElementById('userSearchMsg').innerHTML =`<u>${ response.username}</u> Has No Posts`

            }


            
        })

        .catch( err => {
            console.log(err);
            
        })


        
        
    }

    //request a public profile

    function publicProfileRequest() {

        console.log(`Going to the public profile of ${this.username}`);

        location = `/${this.username}`
        

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