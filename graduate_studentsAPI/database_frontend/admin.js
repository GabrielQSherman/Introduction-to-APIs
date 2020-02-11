
    //event listeners

    document.getElementById('subPostBtn').addEventListener('click', postRequest);
    
    document.getElementById('submitUpdate').addEventListener('click', (putRequest));

    document.getElementById('submitDelete').addEventListener('click', (deleteRequest));


    //fetch request function

    async function postRequest() {

        let postForm = document.getElementById('postForm'),

            postFormData = create_obj_with_formdata(postForm);

            postJson = JSON.stringify(postFormData);
        
        // console.log(postForm);

        for (const key of postForm) {

            console.log('appending', key.name, key.value);
            
            postFormData[key.name] = key.value
        }

        // console.log(postFormData);
    

        document.getElementById('request_message').innerText = 'Summiting';

        try {

            const Post = await fetch('http://localhost:3000/admin/', {

                method: 'POST',

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },

                body: postJson
            })
            const PostResponse = await Post.json();

            console.log(PostResponse);

            document.getElementById('request_message').innerText = 'post submitied';

            clear_formData(postForm)
            

        } catch (err) {

            console.log(err); 
            
        }
        
    }
    

    function putRequest() {

          let putForm = document.getElementById('putForm'),

              docId,
    
              putFormDataObj = create_obj_with_formdata(putForm),

              putJson = JSON.stringify(putFormDataObj);

        (async () => {

            const Update = await fetch('http://localhost:3000/admin/put/' + docId, {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },

              body: putJson

            });
            
            const UpdateResponse = await Update.json();
          
            console.log(UpdateResponse);

        })();


        console.log('test');
        
    }

    //DELETE REQUEST FOR A SPECIFIC POST (ID)
    function deleteRequest() {

        try {

            document.getElementById('request_message').innerText = 'Sending Delete Request'

            let id = delete_id.value;

            fetch('http://localhost:3000/admin/delete/' + id, {

                method: 'DELETE'

            })
            
            .then(response => {

                console.log(response);

                return response.json();

            })

            .then(response => {

                if (response.status == 200) {

                    delete_id.value = '';
                    
                    delete_id.placeholder = 'Deletion Success';

                    document.getElementById('request_message').innerText = 'Delete Request Successful'
                    
                } else {

                    document.getElementById('request_message').innerText = 'Delete Request Not Successful'

                }
            })

            
        } catch (err) {

            console.log(err);
            
        }
        
   }



   function clear_formData(formElement) {
       
        for (const key of formElement) {
            key.value = ''
        }

   }

   function create_obj_with_formdata(rawFormData) {

        let newObj = {};

        for (const key of rawFormData) {

            if (key.name == 'docid' && key.value != '') {
                // console.log('Document Id', key.value);
                
                docId = key.value
                
            } else if (key.value != '') {

                // console.log('appending', key.name, key.value);
            
                newObj[key.name] = key.value;

            }
            
        }

        return newObj
       
   }