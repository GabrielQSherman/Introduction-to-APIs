document.getElementById('signup_submit').addEventListener('click', submitSignUp);

function submitSignUp() {
    
    let signUpInfo = {},
        formElement = document.getElementById('signup_form')

    for (const key of formElement) {

        signUpInfo[key.name] = key.value

    }

    console.log(signUpInfo);
    
}