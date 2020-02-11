
    //event listeners

    document.getElementById('subPostBtn').addEventListener('click', postRequest);
    
    document.getElementById('submitUpdate').addEventListener('click', putRequest);

    document.getElementById('submitDelete').addEventListener('click', deleteRequest);


    //fetch request function

    async function postRequest() {

        let postForm = document.getElementById('postForm'),

            postFormData = create_obj_with_formdata(postForm);

            postJson = JSON.stringify(postFormData);

            //do some check on client provided data to catch errors before data is sent to API

        document.getElementById('request_message').innerText = 'Summiting';

            await fetch('http://localhost:3000/admin/', {

                method: 'POST',

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },

                body: postJson
            })

            //after the fetch POST request goes to the server through the api and back to the client a promise is returned
            //the resonse will be in a readable stream format(not good for extracting data)
            //but it will have a status code that will be useful for error handling
            .then((response) => {
                console.log(response.status);

                    if (response.status != 200) { //if a status other than 'OK' is receivedS

                    // console.log(response.json());
                    
                    throw new Error(`Request failed, Status: ${response.status}`)

  
                }
                return response.json()
                
            })

            //after the response is parsed to json its properties can be used in the DOM and a success message is sent to the client
            .then((json) => {
                console.log(json.newpost);

                document.getElementById('responseElm').innerHTML = `New Student Added to Database<br>Student's Name: ${json.newpost.firstName} ${json.newpost.lastName}<br>Document DB Id: ${json.newpost._id}`;

                document.getElementById('request_message').innerText = 'Student Successfully Posted';

                setTimeout(reset_req_mes, 3000)

            })

            .catch( err => {

                document.getElementById('responseElm').innerHTML = `Failed to Post, Error: ${err}`;

                document.getElementById('request_message').innerText = 'Student Not Posted';

            })

            .finally( clear_formData(postForm) )

        
    }
    

   async function putRequest() {

          let putForm = document.getElementById('putForm'),

              putIdTextInput = document.getElementById('put_id'),

              putFormDataObj = create_obj_with_formdata(putForm),

              putJson = JSON.stringify(putFormDataObj);

            if (putIdTextInput.value.length != 24) { //check to make sure the client input is at least in the correct format

                putIdTextInput.value = ''
                putIdTextInput.placeholder = 'Id will be 24 characters'

                return
                
            }

            putIdTextInput = putIdTextInput.value;
    
              

       await fetch('http://localhost:3000/admin/put/' + putIdTextInput, {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },

              body: putJson

       })

            //returns the response from the api and parses from readableStream to JSON
            .then( readable_stream_res => {

                return readable_stream_res.json()
            })

            //the json response is used to display status code/errors to the client
            .then( (parsedResponse) => {

                if (!checkStatusOk(parsedResponse)) {
                    return 
                }

                console.log(parsedResponse.document);

                let updatedDocObj = parsedResponse.document,

                updatedDoc = '';

                // console.log(updatedDocObj);
                
                for (const key in updatedDocObj) {

                    updatedDoc += `<br><br>  ${key}: ${updatedDocObj[key]}`;
                    
                }
                
                document.getElementById('responseElm').innerHTML = `Updated Post:${updatedDoc}`;

                document.getElementById('request_message').innerText = 'Student Successfully Updated';

                

            })

            .catch( err => {

                console.log(err);
                
            })

            .finally( () => {clear_formData(putForm); setTimeout(reset_req_mes, 3000)})
   }

    //DELETE REQUEST FOR A SPECIFIC POST (ID)
    function deleteRequest() {

            if (delete_id.value.length != 24) {

                delete_id.value = ''
                delete_id.placeholder = 'The Id must be 24 characters'

                return
                
            }

            let id = delete_id.value;

            document.getElementById('request_message').innerText = 'Sending Delete Request'


            fetch('http://localhost:3000/admin/' + id, {

                method: 'DELETE'

            })
            
            .then(readable_stream => {

                return readable_stream.json();

            })

            .then(parsedResponse => {

                    if (!checkStatusOk(parsedResponse)) {
                        return 
                    }

                    reset_req_mes() 

                    delete_id.value = '';
                    
                    delete_id.placeholder = 'Deletion Success';

                    document.getElementById('request_message').innerText = 'Completed Deletion Request';

                    document.getElementById('responseElm').innerText = parsedResponse.message;
                    

            })

            .finally( setTimeout(reset_req_mes, 3000))//resets the requestmessage element back to its original state

        
   }



   function clear_formData(formElement) {
       
        for (const key of formElement) {
            key.value = ''
        }

   }

   function reset_req_mes() {

    document.getElementById('request_message').innerText = 'Awaiting HTTP Request Submition'
       
   }

   function create_obj_with_formdata(rawFormData) {

        let newObj = {};

        for (const key of rawFormData) {

            if (key.value != '') {

                // console.log('appending', key.name, key.value);
            
                newObj[key.name] = key.value;

            }
            
        }

        return newObj
       
   }

   function checkStatusOk(response) {

    // console.log(response.status);

        if (response.status != 200) { //if a status other than 'OK/200' is received

            let clientMessage = document.getElementById('responseElm');

            document.getElementById('request_message').innerText = 'Unsuccessful Request';

            clientMessage.innerHTML = `Status Code: ${response.status}`;

            if (response.message) clientMessage.innerHTML += `<br>Message: ${response.message}`;

            if (response.error) clientMessage.innerHTML += `<br>Error: ${response.error}`; 

            return false

        }

        return true

   }