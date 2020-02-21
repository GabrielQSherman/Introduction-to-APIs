
    //event listeners

    document.getElementById('subPostBtn').addEventListener('click', postRequest);
    
    document.getElementById('submitUpdate').addEventListener('click', putRequest);

    document.getElementById('submitDelete').addEventListener('click', deleteRequest);

    document.getElementById('submitSearch').addEventListener('click', searchRequest);

    document.getElementById('reset_display').addEventListener('click', resetDisplay);

    document.getElementById('add_post_keyskill').addEventListener('click', () => {addSkill('post')});
    
    document.getElementById('add_put_keyskill').addEventListener('click', () => {addSkill('put')});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//FETCH Request Functions

//SEARCH 
async function searchRequest() {
    
    let filterParam = document.getElementById('filter_by'),
        filParamValue = document.getElementById('filter_value');

        if (filParamValue.value == '') {

            filParamValue.placeholder = 'This is a required feild';

            document.getElementById('searchRes').innerHTML = 'You must select a filter AND input a value to filter by';

            return
            
        } else if (filterParam.value == '') {

            document.getElementById('searchRes').innerHTML = 'You must select a filter';

            return
            
        }

        document.getElementById('request_message').innerText = 'Sending Search Request';

        await fetch(`http://localhost:3000/admin/${filterParam.value}/${filParamValue.value}`, {

        })

        .then( readable_stream => {

            return readable_stream.json()
            
        })

        .then( parsedResponse => {

            if (!checkStatusOk(parsedResponse)) {
                return 
            }

            let allFoundPost = parsedResponse.document,

            searchHTML = 'Post Matched With Search:<br><hr>';

            for (let i = 0; i < allFoundPost.length; i++) {
                
                searchHTML += `Post #${i+1} --- <br>${ display_doc_info(allFoundPost[i]) }<hr><br>`;
                
            }

            document.getElementById('searchRes').innerHTML = `Found Documents:${searchHTML}`;
  
            document.getElementById('request_message').innerText = 'Search Request Successful';

            document.getElementById('responseElm').innerText = 'Number of Post/s Found: ' + allFoundPost.length;

        })

        .catch( err => {

            document.getElementById('searchRes').innerHTML = `An Error Occured: ${err} Status: ${parsedResponse.status}`;
  
        })

        .finally( () => { setTimeout(reset_req_mes, 3000); filParamValue.value = ''})


}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//POST
    async function postRequest() {


           let postJson = (create_Obj('postForm'));

           if (!postJson) {

                document.getElementById('responseElm').innerHTML = `There is a required field that did not have any input`;
    
                document.getElementById('request_message').innerText = 'Post request could not be made';
            
               return 
           }

            document.getElementById('request_message').innerText = 'Summiting';

            await fetch('http://localhost:3000/admin',{

                
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
  
                body: postJson
  
            })
  
              //returns the response from the api and parses from readableStream to JSON
              .then( readable_stream_res => { return readable_stream_res.json() })
  
              //the json response is used to display status code/errors to the client
              .then( parsedResponse => {
  
                  if (!checkStatusOk(parsedResponse)) {
                      return 
                  }
  
                //   console.log(parsedResponse.document);
  
                  let newPostDocument = parsedResponse.document,
  
                  PostHTML = display_doc_info(newPostDocument);
                  
                  document.getElementById('responseElm').innerHTML = `New Post:${PostHTML}`;
  
                  document.getElementById('request_message').innerText = 'Student Successfully Created';
                  
  
              })
  
              .catch( err => {
  
                  console.log(err);
                  
              })
  
              .finally( () => {clear_formData(postForm); setTimeout(reset_req_mes, 3000)})

        
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

   function resetDisplay() {

    document.getElementById('responseElm').innerText = 'Request Output';

    document.getElementById('searchRes').innerText = 'Search Output';
       
   }

   //functions that COMPILE or create some value then return a value...


   //Form element name ---> JS Variable (Form Element) ---> JS Obj ---> JSON string ---> THEN GET INSTERED INTO .FETCH CALL(Body for fetch or Xml request)
   //creates a json string from a FORM element name

   function create_Obj(element_name) {

        let formElm = document.getElementById(element_name)
            
            formDataAsObj = {}, //the values and key names from the form element will be stored inside of an object as key/value pairs

            skills = [], //this will hold all the skills the userinputs

            failedValidation = false, linkFailed = false;

        for (const key of formElm) {

            if (key.value != '' && key.name.includes('Skills')) {
                // console.log(key.name, key.value);
                skills.push(key.value)
                
            } else if (key.name == 'gitHub' && !validate_link(key) || key.name.includes('linkedIn') && !validate_link(key) || key.name == 'twitter' && !validate_link(key)) {
                
                linkFailed = true;
                
            } else if (key.value == '' && key.placeholder != 'Another Skill' && element_name === 'postForm') {

                key.placeholder = 'This is a required field';
                failedValidation = true;

            } else if (key.value != '' && !key.name.includes('Skill')) {
                // console.log('appending', key.name, key.value);
            
                formDataAsObj[key.name] = key.value;

            } 
            
        }

        //after the skills array has been made, it will be added to the body of the request
        //only if at least one skill has been submited will the request continue
        if (skills.length > 0) {

            formDataAsObj.key_Skills = skills;

        } else {

            failedValidation = true;
        }

        //check if at any point in creating the body obj validation failed 
        if ( failedValidation && element_name === 'postForm'  || linkFailed && element_name === 'postForm') {

            console.log(failedValidation, linkFailed);
            
            return false
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

                let kStr = key.toString(),
                    firstletter = kStr.substring(0,1).toUpperCase(),
                    restOfWord = kStr.substring(1, kStr.length).replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\_/g, ' ');
                //creates a display of the schema property names in a more legible format

                let keyDisplayName = firstletter + restOfWord,

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

   //FUNCTIONS that VALIDATE or CHECK some sources of infomation

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

   function validate_link(form_element) {

        let link = form_element.value;

        console.log(link);
        
        if (link.substring(0, 8) != 'https://') {

            form_element.value = '';
            form_element.placeholder = 'https:// is required';
            return false
        }

        return true
       
   }

   //vars to keep track of how many skill slots there are in any given form

   let putKeyInputs = 1, postKeyInputs = 1;

   //ADDS A SKILL INPUT TO A GIVEN FORM 
   function addSkill(form_name) {

    newKeySkill = document.createElement('input');

    newKeySkill.placeholder = 'Another Skill';

    newKeySkill.name = form_name == 'put' ? 'key_Skills' + ++putKeyInputs : 'key_Skills' + ++postKeyInputs;


        if (form_name == 'put' && putKeyInputs <= 10) {

            document.getElementById('putForm').appendChild(newKeySkill);

            if (putKeyInputs % 2 == 0) {
                document.getElementById('putForm').innerHTML += '<br>'
            } else {
                document.getElementById('putForm').innerHTML += ' '
            }
            
        } else if (form_name == 'post' && postKeyInputs <= 10) {

            document.getElementById('postForm').appendChild(newKeySkill);

            if (postKeyInputs % 2 == 0) {
                document.getElementById('postForm').innerHTML += '<br>'
            } else {
                document.getElementById('postForm').innerHTML += ' '
            }

        }
    
   }

