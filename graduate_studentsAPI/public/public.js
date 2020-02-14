    
    //event listeners
    document.getElementById('get_all').addEventListener('click', get_all_graduates);

    document.getElementById('search_grads').addEventListener('click', (search_graduates));

    document.getElementById('get_recent').addEventListener('click', (get_recent_graduates));


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


   async function search_graduates() {

        let filterParam = document.getElementById('filter_by'),
        filParamValue = document.getElementById('filter_value');

        if (filParamValue.value == '') {

            filParamValue.placeholder = 'This is a required feild';

            document.getElementById('search_message').innerHTML = 'You must select a filter AND enter value';

            return
            
        } else if (filterParam.value == '') {

            document.getElementById('search_message').innerHTML = 'You must select a filter';

            return
            
        }

        document.getElementById('graduate_layout').innerHTML = 'loading...';

       fetch(`http://localhost:3000/filter/${filterParam.value}/${filParamValue.value}`)

        .then(response => {
            return response.json();
        })
        .then(parsedData => {

            document.getElementById('graduate_layout').innerHTML = '';

            let studentsFound = parsedData.document;

            for (let i = 0; i < studentsFound.length; i++) {

                graduateDoc = create_student_data_layout(studentsFound[i]);

                console.log(graduateDoc);
    
                document.getElementById('graduate_layout').appendChild(graduateDoc);
                
            }

            
        })

        .catch( err => {

            console.log(err);  
            document.getElementById('graduate_layout').innerHTML = err.message;

        })


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
            keySkills = document.createElement('ul'),
            gitHubHL = document.createElement('a'),
            twitterHL = document.createElement('a'),
            linkedInHL = document.createElement('a');


            //set their values

            //Profile image
            image.style = "width:100px;height:100px;"

            image.src = data.linkedInIMG;

            image.onerror = () => {
                image.src = './defaultIcon.png';
            }

            image.alt = 'Student Portrait';
        
            //First and Last Name
            Name.innerText = data.firstName +" "+ data.lastName;

            //Employment information
            jobTitle_Company.innerText = data.company_Name +": "+ data.job_Title;

            //Students graduation info
            graduationDate.innerHTML = `Graduation;<br> Month: ${data.gradMonth},<br> Year: ${data.gradYear}`;

            //gitHub
            gitHubHL.href = data.gitHub;
            gitHubHL.innerHTML = 'GitHub<br>';

            //twitter
            twitterHL.href = data.twitter;
            twitterHL.innerHTML = 'Twitter<br>';

            //linkedIn
            linkedInHL.href = data.linkedIn;
            linkedInHL.innerHTML = 'LinkedIn<br>';

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
            newDiv.appendChild(gitHubHL);
            newDiv.appendChild(twitterHL);
            newDiv.appendChild(linkedInHL);

            newDiv.className = 'students';

        return newDiv
       
   }
