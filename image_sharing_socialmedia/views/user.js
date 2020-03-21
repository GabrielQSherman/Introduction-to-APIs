
window.onload = () => {

    let picturesSubmit = document.getElementById('picPostBtn');

    picturesSubmit.onclick = postPictureRequest;

    console.log(document.getElementById('picPostBtn'));

    document.getElementById('picPostBtn').addEventListener('onclick', postPictureRequest);

    async function postPictureRequest() {

        let postJson = JSON.stringify( createPostJson('newPostForm')),

        postRequestObj = {
            
            method: 'POST',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: postJson
        };

        console.log(postJson);
        
        
        await fetch('http://localhost:3000/user/newpost', postRequestObj)
        
        //returns the response from the api and parses from readableStream to JSON
        .then( readable_stream_res => { return readable_stream_res.json() })

        //the json response is used to display status code/errors to the client
        .then( parsedResponse => {

            console.log(parsedResponse);

        })

        .catch( err => {

            console.log(err);
            
        })

        .finally( clearFormData('newPostForm'))

        
        
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

    function clearFormData(formID) {

        let form = document.getElementById(formID);

         for (const inputBox of form) {

             inputBox.value = ''

        }
        
    }

}



