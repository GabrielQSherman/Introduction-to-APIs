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

    console.log(signUpInfo);
    
}


function getall() {
    
    requestInfo.innerText = 'Getting all users'

    url = 'http://localhost:3000/users';

    reqData = {

        headers: {'Access-Control-Allow-Origin': '../'},

        method: 'GET' //this is a default method but all other methods will need to be defined
        
    }
    
    axios(url, reqData)

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