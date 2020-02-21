//Document Vars

const requestInfo = document.getElementById('requestInfo'),
      responseInfo = document.getElementById('responseInfo');


//Event Listeners
document.getElementById('signup_submit').addEventListener('click', submitSignUp);

document.getElementById('signin_submit').addEventListener('click', submitSignIn);

document.getElementById('getall').addEventListener('click', getall);

//Request Functions

  //SIGN UP
 //creates an object from the form element on the client side.
// if infomation is left blank the client will be notified and the xhr will not be executed

function submitSignUp() {
    
    let signUpInfo = compile_form_data('signup_form');

    if (signUpInfo === false) {

        requestInfo.innerText = 'Request Could Not Be Made';

        responseInfo.innerText = 'A Required Input Was Left Blank'

        return

    } 

    console.log(signUpInfo);

    
    
    
//  this data will be passed to axios as the 'data' parameter
    const reqData = {

        url: 'http://localhost:3000/users',

        headers: {
            
            'Access-Control-Allow-Origin': '*',
            
             Accept: 'application/json',

            'content-type':'application/json'
        
        },

        method: 'POST',
        
        data: signUpInfo
    };

    axios(reqData)

    .then( response  => {

        console.log(response);

        if (response.status === 201) {

            requestInfo.innerText = 'Successful sign up!!!'

            responseInfo.innerText = `Thank you for signing up ${response.data.document.name}!`
            
        }
        
    }) 


    .catch ( err => {

        console.log(err.message);

        requestInfo.innerText = 'Sign Up NOT Successful'

        responseInfo.innerText = `Error: ${err.message}`
        
        return

    })

    .finally ( () => {

        clearForm('signup_form');

    })
    
}

/////////////////////////////////////////////////////////////////////////////////////////
function submitSignIn() {
    
    let signInInfo = compile_form_data('signin_form');

    if (signInInfo === false) {

        requestInfo.innerText = 'Request Could Not Be Made';

        responseInfo.innerText = 'A Required Input Was Left Blank'

        return

    } 

    const reqData = {

        headers: {
            
            'Access-Control-Allow-Origin': '*',
            
             Accept: 'application/json',

            'content-type':'application/json'
        
        },

        method: 'POST',
        
        data: signInInfo
    };

    axios.post('http://localhost:3000/login', reqData)

    .then( response  => {

        // console.log(response.message);

        if (response.status === 200) {

            console.log(response.data);
            

            const {username} = response.data;

            location.replace(`http://localhost:3000/profile/${username}`)

            // requestInfo.innerText = 'Successful sign in!!!'

            // responseInfo.innerHTML = `User Info:<br>Name: ${name}<br>Email: ${email}`

        } else if (response.status === 271) { //catches error if password or email fail credential check in backend
            
            requestInfo.innerText = 'Sign in NOT Successful'
            responseInfo.innerHTML = `A Problem Occured:<br>${response.data.message}`
            return

        }
        
    })

    .catch ( err => {

        requestInfo.innerText = 'An Error Occured'

        console.log(err);

        return

    })

    .finally ( () => {
        clearForm('signin_form')
    })
    
}

function getall() {
    
    requestInfo.innerText = 'Getting all users'

    let reqData = {

        url: 'http://localhost:3000/profile/asdf',

        headers: {'Access-Control-Allow-Origin': '*'},

        method: 'GET' //this is a default method but all other methods will need to be defined
        
    };
    
    axios(reqData)

    // .then ( response => {

    //     requestInfo.innerText = response.data.message;
        
    //     const allUsers = response.data.document;

    //     console.log(allUsers);
        

    //     responseInfo.innerText = 'User documents found in console';
        
    // })

    // .catch( err => {

    //     requestInfo.innerText = 'Get Request Failed';

    //     responseInfo.innerText = err.message;
    // })
    
    
}

function clearForm(formID) {

    let formElement = document.getElementById(formID);

    for (const key of formElement) {

        key.value = '';

    }

}

function compile_form_data(formID) {

    let dataObj = {}, leftBlank = false;

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