
    //event listeners

    document.getElementById('subPostBtn').addEventListener('click', postRequest);
    
    document.getElementById('submitUpdate').addEventListener('click', putRequest);

    document.getElementById('submitDelete').addEventListener('click', deleteRequest);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //FETCH Request Functions


//POST
    async function postRequest() {


           let postJson = (create_Obj('postForm'));

            document.getElementById('request_message').innerText = 'Summiting';

            await fetch('http://localhost:3000/admin', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
  
                body: postJson
  
            })
  
              //returns the response from the api and parses from readableStream to JSON
              .then( readable_stream_res => {
  
                  return readable_stream_res.json()
              })
  
              //the json response is used to display status code/errors to the client
              .then( parsedResponse => {
  
                  if (!checkStatusOk(parsedResponse)) {
                      return 
                  }
  
                //   console.log(parsedResponse.document);
  
                  let newPostDocument = parsedResponse.document,
  
                  putHTML = display_doc_info(newPostDocument);
                  
                  document.getElementById('responseElm').innerHTML = `Updated Post:${putHTML}`;
  
                  document.getElementById('request_message').innerText = 'Student Successfully Updated';
                  
  
              })
  
              .catch( err => {
  
                  console.log(err);
                  
              })
  
              .finally( () => {clear_formData(putForm); setTimeout(reset_req_mes, 3000)})

        
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
//PUT
   async function putRequest() {

          let putJson = create_Obj('putForm'),

              putIdTextInput = document.getElementById('put_id'),

              requestId;

            if (putIdTextInput.value.length != 24) { //check to make sure the client input is at least in the correct format

                putIdTextInput.value = ''
                putIdTextInput.placeholder = 'Id will be 24 characters'

                return
                
            }

            requestId = putIdTextInput.value;
      
            
            document.getElementById('request_message').innerText = 'Updating Document';

       await fetch( `http://localhost:3000/admin/${requestId}` , {

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

                if (!checkStatusOk(parsedResponse)) { //function checks if the response obj returns a status of 200
                    return 
                }

                let putHTML = display_doc_info(parsedResponse.document); //an html string will be created based off what was returned in the response 
                
                document.getElementById('responseElm').innerHTML = `Updated Post:${putHTML}`;

                document.getElementById('request_message').innerText = 'Student Successfully Updated';

            })

            .catch( err => {

                console.log(err);
                
            })

            .finally( () => {clear_formData(putForm); setTimeout(reset_req_mes, 3000)})
   }

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//DELETE REQUEST FOR A SPECIFIC POST (ID)
    async function deleteRequest() {

            if (delete_id.value.length != 24) {

                delete_id.value = ''
                delete_id.placeholder = 'The Id must be 24 characters'

                return
                
            }

            let id = delete_id.value;

            document.getElementById('request_message').innerText = 'Sending Delete Request'


            await fetch('http://localhost:3000/admin/' + id, {

                method: 'DELETE'

            })
            
            .then(readable_stream => {

                return readable_stream.json();

            })

            .then(parsedResponse => {

                    if (!checkStatusOk(parsedResponse)) {
                        return 
                    }

                    delete_id.value = '';
                    
                    delete_id.placeholder = 'Deletion Success';

                    document.getElementById('request_message').innerText = 'Completed Deletion Request of Document w/ ID: ' + id;

                    document.getElementById('responseElm').innerText = parsedResponse.message;
                    

            })

            .finally( setTimeout(reset_req_mes, 7000))//resets the requestmessage element back to its original state

        
   }

//NESTED FUNCTIONS (smaller reuseable functions used in the fetch request functions)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   //RESET SOME DOM VALUE

   function reset_req_mes() { //resets a specific text element that shows the current status of the request

    document.getElementById('request_message').innerText = 'Awaiting HTTP Request Submition'
       
   }

   //can be used for any form element to clear all its client input
   function clear_formData(formElement) {
       
        for (const key of formElement) {
            key.value = ''
        }

   }

   //functions that COMPILE or create some value then return a value...


   //Form element name ---> JS Variable (Form Element) ---> JS Obj ---> JSON string ---> THEN GET INSTERED INTO .FETCH CALL(Body for fetch or Xml request)
   //creates a json string from a FORM element name

   function create_Obj(element_name) {

        let formElm = document.getElementById(element_name)
            
            formDataAsObj = {}; //the values and key names from the form element will be stored inside of an object as key/value pairs

        for (const key of formElm) {

            if (key.value != '') {

                // console.log('appending', key.name, key.value);
            
                formDataAsObj[key.name] = key.value;

            }
            
        }

    //the fetch request will need the body to be in JSO notation and not just as a JS Object.
        //so json.stringify is used
        let Json = JSON.stringify(formDataAsObj); 

        return Json
       
   }

   //creates a html text string that can be instered right into the dom so that all desired components of the DB document are displayed
   function display_doc_info(res_document) {

    let HtmlText = '';

        for (const key in res_document) {

            if (key != '__v' && key != 'lastUpdated') {

                let kStr = key.toString();
                //creates a display of the schema property names in a more legible format
                let keyDisplayName = kStr.substring(0,1).toUpperCase() + kStr.substring(1, kStr.length).replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\_/, ' ');
                    docKeyValue = res_document[key];

                if (res_document[key].toString().substring(0,8) === 'https://') { //special case for link values

                    HtmlText += `<br><br> <a href='${docKeyValue}'>${keyDisplayName}<a/>`;

                } else {

                    HtmlText += `<br><br>  ${keyDisplayName}: ${docKeyValue}`;

                }

            }
            
        }

        return HtmlText
       
   }

   //functions that vailidate or check some sources of infomation

   function checkStatusOk(response) {

    // console.log(response.status);

        if (response.status != 200) { //if a status other than 'OK/200' is received

            let clientMessage = document.getElementById('responseElm');

            document.getElementById('request_message').innerText = 'Unsuccessful Request';

            if (response.status) clientMessage.innerHTML = `Status Code: ${response.status}`;

            if (response.message) clientMessage.innerHTML += `<br>Message: ${response.message}`;

            if (response.error) clientMessage.innerHTML += `<br>Error: ${response.error}`; 

            return false

        }

        return true

   }