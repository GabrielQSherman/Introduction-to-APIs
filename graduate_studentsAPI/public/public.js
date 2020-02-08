
   document.getElementById('get_all').addEventListener('click', get_all_graduates);

    document.getElementById('get_individual').addEventListener('click', (get_individual_graduates));

    document.getElementById('get_recent').addEventListener('click', (get_recent_graduates));

    get_all_graduates()

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

   async function get_recent_graduates() {

    console.log('test');
        
   }


   function create_student_data_layout(data) {

    // console.log(data); //shows the document object for the individual student being displayed

        //create the elements
        let newDiv = document.createElement('div'),
            
            image = document.createElement('img'),
            Name = document.createElement('h3'),
            jobTitle_Company = document.createElement('h5'),
            graduationDate = document.createElement('p'),
            keySkills = document.createElement('ul');


            //set their values

            image.style = "width:100px;height:100px;"
            image.src = data.linkedInIMG;
            image.alt = 'Student Portrait';
            

            Name.innerText = data.firstName +" "+ data.lastName;

            jobTitle_Company.innerText = data.company_Name +": "+ data.job_Title;

            graduationDate.innerText = data.gradMonth +" "+ data.gradYear;


            //creating key skills list
            keySkills.innerText = 'Key Skills:  '
            for (let i = 0; i < data.key_Skills.length; i++) {
                
                let listElement = document.createElement('li');
                listElement.innerText = data.key_Skills[i];

                keySkills.appendChild(listElement);
                
            }

            //append them to the parent element (individual student post)

            newDiv.appendChild(image);
            newDiv.appendChild(Name);
            newDiv.appendChild(jobTitle_Company);
            newDiv.appendChild(graduationDate);
            newDiv.appendChild(keySkills);


        return newDiv
       
   }
