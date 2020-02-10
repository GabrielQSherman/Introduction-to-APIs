
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

            console.log(Post);

            document.getElementById('request_message').innerText = 'post submitied';
            

        } catch (err) {

            console.log(err);
            
            
        }



        
    }

    function putRequest() {

        (async () => {
            const rawResponse = await fetch('http://localhost:3000/admin/', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: testData
            });
            const content = await rawResponse.json();
          
            console.log(content);
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
