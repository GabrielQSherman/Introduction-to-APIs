
window.onload = () => {

    let picturesSubmit = document.getElementById('picPostBtn');

    picturesSubmit.onclick = postPictureRequest;

    console.log(document.getElementById('picPostBtn'));

    document.getElementById('picPostBtn').addEventListener('onclick', postPictureRequest);

    async function postPictureRequest() {

        const postJson = JSON.stringify( createPostJson('newPostForm'));

        let postCheck = checkPostValidity(postJson);

        if (postCheck.failedCaption == true) {
            console.log('caption fail');
            
        }

        if (postCheck.failedImage == true) {
            console.log('image fail');
            
        }

        const postRequestObj = {
            
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
        .then( readable_stream_res => { 

        //    console.log(readable_stream_res);

            if (readable_stream_res.status != 200) {
                
                throw new Error ('Post Request Failed')
            }
            
            return readable_stream_res.json()
        })

        //the json response is used to display status code/errors to the client
        .then( parsedResponse => {

            console.log(parsedResponse);

        })

        .catch( err => {

            console.log(err);
            
        })

        .finally( () => {
            // setTimeout( () => { location = 'http://localhost:3000/user/profile'; }, 300);
            
        })
        
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

    function checkPostValidity(obj) {

        let errorCheck = {failedCaption: false, failedImage: false};

        if (obj.caption.length < 1 && obj.caption.length > 100) {
            errorCheck.failedCaption = true;
            
        }

        let testImage = document.createElement('img');

            testImage.src = obj.url;

            testImage.onload = () => {
                console.log('image url works');
                
            }

            testImage.onerror = () => {
                errorCheck.failedImage = true
            }

        return errorCheck

    }

    function clearFormData(formID) {

        let form = document.getElementById(formID);

         for (const inputBox of form) {

             inputBox.value = ''

        }
        
    }

}



