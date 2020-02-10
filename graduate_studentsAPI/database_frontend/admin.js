
    //event listeners

    

    document.getElementById('subPostBtn').addEventListener('click', postRequest);

    
    document.getElementById('submitUpdate').addEventListener('click', (putRequest));

    document.getElementById('submitDelete').addEventListener('click', (deleteRequest));


    //fetch request function

    async function postRequest() {

        let postForm = document.getElementById('postForm'),

            postFormData = {}
        
        // console.log(postForm);

        for (const key of postForm) {

            console.log('appending', key.name, key.value);
            
            postFormData[key.name] = key.value
        }

        // const 
        

        // console.log(postFormData);
        
        

        document.getElementById('request_message').innerText = 'Summiting';

        try {

            const Post = await fetch('http://localhost:3000/admin/', {

                method: 'POST',

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },

                body: JSON.stringify(postFormData)
            })
            const PostResponse = await Post.json();

            console.log(PostResponse);

            document.getElementById('request_message').innerText = 'post submitied';
            

        } catch (err) {

            console.log(err);
            
            
        }



        
    }

    function putRequest() {

          let postForm = document.getElementById('putForm'),

              postFormData = {},

              docId;
        
        // console.log(postForm);

        for (const key of postForm) {

            if (key.name == 'docid' && key.value != '') {
                console.log('Document Id', key.value);
                
                docId = key.value
                
            } else if (key.value != '') {
                console.log('appending', key.name, key.value);
            
                postFormData[key.name] = key.value
            }
            
        }

        (async () => {
            const Update = await fetch('http://localhost:3000/admin/put/' + docId, {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(postFormData)
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


   const testData = JSON.stringify({
    firstName: "New",

     lastName: "Student",

     gradYear: "2024",
     
     gradMonth: "07",

     job_Title: "head-chef",

     company_Name: "5-start-resturant",

     key_Skills: ["cook", "clean", "do-it-all"],

     gitHub: "github/mygit.com",

     linkedIn: "mylinkedin.linkedin",

     twitter: "twitter/newstudent.com",

     linkedInIMG: "test"

})
