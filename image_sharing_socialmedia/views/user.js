
window.onload = () => {

    let picturesSubmit = document.getElementById('picPostBtn');

    picturesSubmit.onclick = postPictureRequest;

    console.log(document.getElementById('picPostBtn'));

    document.getElementById('picPostBtn').addEventListener('onclick', postPictureRequest);

     function postPictureRequest() {

        const postObj = createPostJson('newPostForm');

        const postCheck = checkPostValidity(postObj);

       setTimeout( async () => {

           console.log(postCheck);
           
            let postErrMsg = document.getElementById('postFormErrMsg');

            postErrMsg.innerText = '';

            if (postCheck.failedCaption == true) {
                postErrMsg.innerText += '* Caption must be under 50 characters and more than 0\n'
            }

            if (postCheck.failedImage == true) {
                postErrMsg.innerText += '* Image URL Failed To Load Vaild Img'
            }

            if (postCheck.failedCaption == true || postCheck.failedImage == true) {
                return
            }

            const postJson = JSON.stringify(postObj);

            const postRequestObj = {
                
                method: 'POST',

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: postJson
            };

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

            // console.log(postCheck);


       }, 100)
        

       
        
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

    function checkPostValidity(checkObject) {

        console.log(checkObject.url);
        
        

        let errorCheck = {failedCaption: false, failedImage: false};

          let testImage = new Image();

            testImage.src = checkObject.url;

            testImage.onload = () => {
                console.log('image url works');
                
            }

            testImage.onerror = () => {
                errorCheck.failedImage = true
            }
            // console.log(errorCheck);

        if (checkObject.caption.length < 1 || checkObject.caption.length > 50) {
            errorCheck.failedCaption = true;
            
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



