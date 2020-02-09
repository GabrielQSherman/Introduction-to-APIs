    
    //event listeners
    document.getElementById('submitPost').addEventListener('click', postRequest);

    document.getElementById('submitUpdate').addEventListener('click', (putRequest));

    document.getElementById('submitDelete').addEventListener('click', (deleteRequest));


    //fetch request function

    function postRequest() {
        console.log('test');
        
    }

    function putRequest() {
        console.log('test');
        
    }

    //DELETE REQUEST FOR A SPECIFIC POST (ID)
    function deleteRequest() {

        try {

            let id = delete_id.value;

            fetch('http://localhost:3000/admin/delete/' + id, {
                method: 'DELETE'
            })
            
            .then(response => {
                return response.json();
            })

            .then(parsedData => {
                console.log(parsedData);
                
            })
            
            .then(response => {

                delete_id.value = '';

                if (response.status == 200) {
                    
                    
                    delete_id.placeholder = 'Succesfully deleted document';
                    
                } else {

                    delete_id.placeholder = 'Request Error: ' + response.status;
                    console.log(response);
                    
                }
            })

            
        } catch (err) {

            console.log(err);
            
        }
        
   }


