
   document.getElementById('get_all').addEventListener('click', get_all_graduates);

    document.getElementById('get_individual').addEventListener('click', (get_individual_graduates));

    document.getElementById('get_recent').addEventListener('click', (get_recent_graduates));

    get_all_graduates()

     function get_all_graduates() {

        try {

           fetch('http://localhost:3000/find/all')

            .then(response => {
                return response.json();
            })
            .then(parsedData => {
                // console.log(parsedData);

                document.getElementById('graduate_layout').innerHTML = '';


                for (let i = 0; i < parsedData.length; i++) {

                    console.log('\n\nNext Doc');

                    graduateDoc = create_student_data_layout(parsedData[i])
                    
                    // graduateDoc = document.createElement('div');
    
                    // for (const key in parsedData[i]) {
                       
                    //     console.log(parsedData[i][key]);
                        
                    // }
    
                    document.getElementById('graduate_layout').appendChild(graduateDoc);
                    
                }

                
            })

           

          

            
        } catch (err) {

            console.log(err);  

        }

        // document.getElementById('graduate_layout').appendChild()
        
    }



   async function get_individual_graduates() {

    console.log('test');
    
        
   }

   async function get_recent_graduates() {

    console.log('test');
        
   }


   function create_student_data_layout(data) {

    console.log(data);
        //create the elements

        let newDiv = document.createElement('div'),
            
            Name = document.createElement('h3'),
            jobTitle_Company = document.createElement('h5'),
            graduationDate = document.createElement('p');


            //set their values

            Name.innerText = data.firstName +" "+ data.lastName;

            jobTitle_Company.innerText = data.company_Name +": "+ data.job_Title;

            graduationDate.innerText = data.gradMonth +" "+ data.gradYear;

            //append them to the parent element
    
            newDiv.appendChild(Name);
            newDiv.appendChild(jobTitle_Company);
            newDiv.appendChild(graduationDate);



        return newDiv
       
   }
