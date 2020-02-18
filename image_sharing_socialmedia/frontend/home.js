//Document Vars

const requestInfo = document.getElementById('requestInfo'),
      responseInfo = document.getElementById('responseInfo');


//Event Listeners
document.getElementById('signup_submit').addEventListener('click', submitSignUp);

document.getElementById('getall').addEventListener('click', getall);

//Request Functions

function submitSignUp() {
    
    let signUpInfo = {},
        formElement = document.getElementById('signup_form')

    for (const key of formElement) {

        signUpInfo[key.name] = key.value

    }

    let reqData = {

        url: 'http://localhost:3000/users/login',

        headers: {
            
            'Access-Control-Allow-Origin': '*',
            
            Accept: 'application/json',
            'content-type':'application/json'
        
        },

        method: 'POST',
        
        data: signUpInfo
    };

    axios(reqData)

    .then( data  => {
        
        console.log(data);

        return true
        
    }) 


    .catch ( err => {

        console.log(err.message);
        

        return false

    })
    
}


function getall() {
    
    requestInfo.innerText = 'Getting all users'

    

    let reqData = {

        url: 'http://localhost:3000/users',

        headers: {'Access-Control-Allow-Origin': '../'},

        method: 'GET' //this is a default method but all other methods will need to be defined
        
    };
    
    axios(reqData)

    .then ( response => {

        requestInfo.innerText = response.data.message;
        
        const allUsers = response.data.document;

        console.log(allUsers);
        

        responseInfo.innerText = 'User documents found in console';
        
    })

    .catch( err => {

        requestInfo.innerText = 'Get Request Failed';

        responseInfo.innerText = err.message;
    })
    
    
}