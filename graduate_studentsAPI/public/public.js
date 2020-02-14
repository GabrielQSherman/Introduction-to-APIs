    
    //event listeners
    document.getElementById('get_all').addEventListener('click', get_all_graduates);

    document.getElementById('search_grads').addEventListener('click', (search_graduates));

    // document.getElementById('get_recent').addEventListener('click', (get_recent_graduates));


    //button function

   async function get_all_graduates() {

        try {

            document.getElementById('graduate_layout').innerHTML = 'loading...';

           await fetch('http://localhost:3000/find/all')

            .then(response => {
                return response.json();
            })
            .then(parsedData => {
                // console.log(parsedData);

                document.getElementById('graduate_layout').innerHTML = '';

                create_student_grid(parsedData)
                
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

        if (filterParam.value == '') {

            document.getElementById('search_message').innerHTML = 'You must select a filter';

            return
           
            
        } else if (filParamValue.value == '') {

            filParamValue.placeholder = 'This is a required feild';

            document.getElementById('search_message').innerHTML = '<p>You must select a filter AND enter value</p>';

            return
            
            
        }

        document.getElementById('graduate_layout').innerHTML = 'loading...';

       fetch(`http://localhost:3000/filter/${filterParam.value}/${filParamValue.value}`)

        .then(response => {
            return response.json();
        })
        
        .then(parsedData => {


            if (parsedData.document == undefined && parsedData.error) {

                document.getElementById('graduate_layout').innerHTML = parsedData.error;

                return
            }

            filParamValue.value = '';

            document.getElementById('graduate_layout').innerHTML = '';

            let studentsFound = parsedData.document;

            create_student_grid(studentsFound)
            
        })

        .catch( err => {

            console.log(err);  
            document.getElementById('graduate_layout').innerHTML = err.message;

        })


   }

//    async function get_recent_graduates() {

//     console.log('test');
        
//    }


   function create_one_stud_div(data) {

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

            image.className = 'studentPhoto';
        
            //First and Last Name
            Name.innerText = data.firstName +" "+ data.lastName;
            Name.className = 'studentName';

            //Employment information
            jobTitle_Company.innerHTML = `Works for ${data.company_Name}<br>As a ${data.job_Title}`;
            jobTitle_Company.className = 'jobTitle';

            //Students graduation info
            graduationDate.innerHTML = `Graduation Date;<br>${data.gradMonth}-${data.gradYear}<hr>`;
            graduationDate.className = 'gradDate';

            // hpref links

            let links = document.createElement('div');

            links.className = 'studentLinks'

            //gitHub
            gitHubHL.href = data.gitHub;
            gitHubHL.innerHTML = 'GitHub<br>';

            //twitter
            twitterHL.href = data.twitter;
            twitterHL.innerHTML = 'Twitter<br>';

            //linkedIn
            linkedInHL.href = data.linkedIn;
            linkedInHL.innerHTML = 'LinkedIn<br>';

            links.appendChild(gitHubHL);
            links.appendChild(twitterHL);
            links.appendChild(linkedInHL);

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
            newDiv.appendChild(links);

            newDiv.className = 'students';

        return newDiv
       
   }


   function create_student_grid(all_docs) {

        for (let i = 0; i < all_docs.length; i++) {

            graduateDoc = create_one_stud_div(all_docs[i]);

            console.log(graduateDoc);

            document.getElementById('graduate_layout').appendChild(graduateDoc);
            
            
        }
       
   }
