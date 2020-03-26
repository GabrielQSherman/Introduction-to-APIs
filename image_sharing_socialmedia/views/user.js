//USE MOUSELEAVE FOR DELETE BUTTON 
window.onload = () => {


    //Setting Event Listener Properties

    //get accesss to buttons on JS
    let picturesSubmit = document.getElementById('picPostBtn'),
        deleteAllBtn = document.getElementById('deleteAllPostBtn'),
        everyDeletePostButton = document.getElementsByClassName('postDeleteBtn');

    //set the onclick events
    picturesSubmit.onclick = postPictureRequest;

    deleteAllBtn.onclick = deleteAllPost;

    //set the onclick event for every deletepostbutton

    for (const button of everyDeletePostButton) {

        button.onclick = deleteThisPost;
        
    }

    //  POST REQUEST

    //when the 'post a pic' button is pressed, this function will execute
     function postPictureRequest() {
        
        //the values from the post form are extracted from the post form into an object 
        const postObj = createPostJson('newPostForm');

        //the object is checked to see if the post can be uploaded to the database
        const postCheck = checkPostValidity(postObj);

        //a timeout is needed to give time for the image to be fetched and the postCheck object to be complete
       setTimeout( async () => {

           //ERROR CHECKING
           //get access to the heading element that alerts the user of an issue with their input
            let postErrMsg = document.getElementById('postFormErrMsg');

            postErrMsg.innerText = '';
            //the user willl be alerted of each failure in their input
            if (postCheck.failedCaption == true) {
                postErrMsg.innerText += '* Caption must be under 50 characters and more than 0\n'
            }

            if (postCheck.failedImage == true) {
                postErrMsg.innerText += '* Image URL Failed To Load Vaild Img'
            }

            //if either input resulted in an error the function should return and the post request will not be made
            if (postCheck.failedCaption == true || postCheck.failedImage == true) {
                return
            }

            //POST REQUEST IF INPUT PASSES FRONT-END SANITIZATION
            const postJson = JSON.stringify(postObj); //stringify the javascript object to JSON so fetch can send a proper request

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
                .then( parsedResponse => { console.log(parsedResponse); })

                .catch( err => { console.log(err); })

                .finally( () => { setTimeout( () => { location = 'http://localhost:3000/user/profile'; }, 300); })

       }, 100)
        
    }
    //create a javascript object from values in a form
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
    //check if the post input will be valid to put on the users profile
    function checkPostValidity(checkObject) {

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

        return errorCheck //if the input passes the test an object will be returned with both properties false

    }

    //clear a forms input fields
    function clearFormData(formID) {

        let form = document.getElementById(formID);

         for (const inputBox of form) {

             inputBox.value = ''

        }
        
    }


    //DELETE REQUESTS

    //delete a specific post
    async function deleteThisPost(){

        // console.log(this); //logs the button object information that was click, because the id of the post is set in the button this will be transfered into the request body

        const deleteOneObj = { id: this.id},

              deleteJson = JSON.stringify(deleteOneObj),

              deleteRequestObj = {
        
                method: 'POST',

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: deleteJson
            };

            await fetch('http://localhost:3000/user/deletepost', deleteRequestObj)
            
            //returns the response from the api and parses from readableStream to JSON
            .then( readable_stream_res => { 

            //    console.log(readable_stream_res);

                if (readable_stream_res.status != 200) {
                    
                    throw new Error ('Post Request Failed')
                }
                
                return readable_stream_res.json()
            })

            //the json response is used to display status code/errors to the client
            .then( parsedResponse => { console.log(parsedResponse); })

            .catch( err => { console.log(err); })

            .finally( () => { setTimeout( () => { location = 'http://localhost:3000/user/profile'; }, 300); })

    }

    //Delete all post 

    async function deleteAllPost() {

        let confirmDelete = prompt('Enter your username if you are sure you want to delete all post from your profile, this action can not be undone.', 'username').toLowerCase(),

            nameOnServer = document.getElementById('username').innerText.toLowerCase();


        if (confirmDelete === nameOnServer ) {
            const delAllRequestObj = {
                
                method: 'POST',

            };

                await fetch('http://localhost:3000/user/deleteallpost', delAllRequestObj)
                
                //returns the response from the api and parses from readableStream to JSON
                .then( readable_stream_res => { 

                //    console.log(readable_stream_res);

                    if (readable_stream_res.status != 200) {
                        
                        throw new Error ('Post Request Failed')
                    }
                    
                    return readable_stream_res.json()
                })

                //the json response is used to display status code/errors to the client
                .then( parsedResponse => { console.log(parsedResponse); })

                .catch( err => { console.log(err); })

                .finally( () => { setTimeout( () => { location = 'http://localhost:3000/user/profile'; }, 300); })

        } else {
            alert('No Post Were Deleted')
        } 
    
    }

}



