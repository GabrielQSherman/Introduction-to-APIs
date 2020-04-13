//USE MOUSELEAVE FOR DELETE BUTTON 
window.onload = () => {


    //Setting Event Listener Properties

    //get accesss to buttons on JS
    let picturesSubmit = document.getElementById('picPostBtn'),
        deleteAllBtn = document.getElementById('deleteAllPostBtn'),
        DelPostBtns = document.getElementsByClassName('postDeleteBtn'),
        editPostCapBtns = document.getElementsByClassName('editPostCap'),
        logOutOneBtn = document.getElementById('logOutOne'), 
        logOutAllBtn = document.getElementById('logOutAll'),
        homePageBtn = document.getElementById('home'),
        colorChangeBtn = document.getElementById('requestColorChange');

    //set the onclick events
    picturesSubmit.onclick = postPictureRequest;
    
    logOutOneBtn.onclick = logOutOneRequest;

    logOutAllBtn.onclick = logOutAllRequest;

    homePageBtn.onclick = homeRedirect;

    colorChangeBtn.onclick = colorChangeReq;

    if (deleteAllBtn != null) {

        deleteAllBtn.onclick = deleteAllPost;
    }

    //set the onclick event for every deletepostbutton

    for (const button of DelPostBtns) {

        button.onclick = deleteThisPost;
        
    }

    //set the onclick event for every edit caption button

    for (const button of editPostCapBtns) {

        button.onclick = editThisPostCaption;
        
    }

    //direct window.location back to homepage

    function homeRedirect() {

        location = 'http://localhost:3000/'
        
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

        const postId = this.attributes.postid.value

        //logs the button object information that was click,
       // because the id of the post is set as a property of the button it cab be transfered into the request body
      // console.log(this, postId); 

        const deleteOneObj = { id: postId},

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

        let confirmDelete = prompt('Enter your username if you are sure you want to delete all post from your profile, this action can not be undone.', 'username'),

            nameOnServer = document.getElementById('username').innerText.toLowerCase();
        console.log(confirmDelete);
        

        if (confirmDelete == null) {

            alert('Deletion Of All Post Canceled')

        } else if (confirmDelete.toLowerCase() === nameOnServer ) {
            const delAllRequestObj = {
                
                method: 'POST',

            };

                await fetch('http://localhost:3000/user/deleteallposts', delAllRequestObj)
                
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
            alert('No Post Were Deleted Because You Did Not Correctly Input Your Username')
    
        }

    }

    async function logOutOneRequest () {

        const logoutObj = {
                
                method: 'POST',

        };

         await fetch('http://localhost:3000/user/logout', logoutObj)
        
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

        .finally( () => { setTimeout( () => { location = 'http://localhost:3000/signedout'; }, 300); })

    }

    async function logOutAllRequest () {

        const logoutObj = {
                
                method: 'POST',

        };

         await fetch('http://localhost:3000/user/logoutall', logoutObj)
                
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

        .finally( () => { setTimeout( () => { location = 'http://localhost:3000/signedout'; }, 300); })

    }


    //event function that allows user to change a caption of a post
    async function editThisPostCaption() {


         const postId = this.attributes.postid.value
        console.log(this, postId);

        let newCaption = prompt('Type in a new caption to caption this post');

        if (newCaption != null && newCaption.trim() != ''){

            console.log('update the caption');

             const updateCapObj = { id: postId, caption: newCaption},

              updateCapJson = JSON.stringify(updateCapObj),

              updateRequestObj = {
        
                method: 'PATCH',

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: updateCapJson
            };

            await fetch('http://localhost:3000/user/updatecaption', updateRequestObj)
            
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

            .catch( err => { 

                alert('Error trying to update caption:', err.message)
                console.log(err); 

            })

            .finally( () => { setTimeout( () => { location = 'http://localhost:3000/user/profile'; }, 300); })

            
        } else {

            alert('The post\'s caption was not updated');

        }


    }

    async function colorChangeReq() {

        let form = document.getElementById('colorChoice')

        let colorChoice = form.profileColor.value;

        if (!isNaN(colorChoice)) {

            console.log('changing color number to', colorChoice);
            
            
        } else {
            console.log('abort color change');
            return
        }

        await fetch(`http://localhost:3000/user/profilecolor/${colorChoice}`, {method: 'PATCH'})

        .then( res => {
            if (res.status == 200) {

                document.getElementById('requestColorChange').innerText = 'Color Updated, Page Will Now Reload...'
              
                setTimeout(() => { location.reload() }, 2000);

            } else {

                document.getElementById('requestColorChange').innerText = 'Color Update Failed'

            }
            
            return res.json()
        })

        .then( res => {

            console.log(res);
            
            
        })

        .catch( err => {

            console.log(err, err.message);
            
        })
        
    }

}

