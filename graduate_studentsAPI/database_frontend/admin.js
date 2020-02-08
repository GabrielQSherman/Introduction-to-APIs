    
    //event listeners
    document.getElementById('submitPost').addEventListener('click', get_all_graduates);

    document.getElementById('submitUpdate').addEventListener('click', (get_individual_graduates));

    document.getElementById('submitDelete').addEventListener('click', (delete_one_document));


    //button function

     function get_all_graduates() {

        try {

            document.getElementById('graduate_layout').innerHTML = 'loading...';

           fetch('http://localhost:3000/find/all')

            .then(response => {
                return response.json();
            })
            .then(parsedData => {
                // console.log(parsedData);

                document.getElementById('graduate_layout').innerHTML = '';

                for (let i = 0; i < parsedData.length; i++) {

                    graduateDoc = create_student_data_layout(parsedData[i])
          
                    document.getElementById('graduate_layout').appendChild(graduateDoc);
                    
                }

                
            })

            
        } catch (err) {

            console.log(err);  
            document.getElementById('graduate_layout').innerHTML = err.message;

        }

        // document.getElementById('graduate_layout').appendChild()
        
    }



   async function get_individual_graduates() {

    console.log('test');
    
        
   }

    function delete_one_document() {

        try {

            let id = delete_id.value;

            fetch('http://localhost:3000/admin/delete/' + id, {
                method: 'DELETE'
            })

            
            .then(response => console.log(response))


            
            
        } catch (err) {

            console.log(err);
            
            
        }


        
   }


