
window.onload = () => {

    let picturesSubmit = document.getElementById('picPostBtn');

    picturesSubmit.onclick = postPictureRequest;

    console.log(document.getElementById('picPostBtn'));

    document.getElementById('picPostBtn').addEventListener('onclick', postPictureRequest);

    async function postPictureRequest() {

        let postJson = createPostJson('newPostForm'),

        postRequestObj = {
            
            method: 'POST',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: postJson

        };

        console.log(postJson);
        
        
        // await fetch('http://localhost:3000/user/newpost', postRequestObj)
        
        
    }


    function createPostJson(formID) {

        let form = document.getElementById(formID),

            postObj = {};

        for (const inputBox of form) {

            let name = inputBox.name;

            postObj[name] = inputBox.value; 
            
        }

        // console.log(form);
        
        return postObj
        
    }

}

