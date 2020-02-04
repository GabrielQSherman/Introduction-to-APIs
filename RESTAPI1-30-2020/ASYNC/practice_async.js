const users = [
    {
    id: 1, 
    name: 'gabe sherman', 
    hasNetflix: true, 
    email: 'email' },

    {
    id: 2, 
    name: 'ben sherman', 
    hasNetflix: false, 
    email: 'email' }
]

//OLD CODE
getCustomer(1, (customer) => {
    console.log('Customer: ', customer);
    if (customer.hasNetflix) {
      getTopMovies((movies) => {
        console.log('Top movies: ', movies);
        sendEmail(customer.email, movies, () => {
          console.log('Email sent...')
        });
      });
    }
  }); //this code will not work now that the functions simply return a promise. instead they are used to set variables that await the promise being finished

  log_async_functions(1)

  //NEW CODE
  async function log_async_functions(id) { //'await' keyword must be used in a async function 

    const customer = await getCustomer(id);
    console.log('Customer: ', customer);
    if (customer.hasNetflix) {
        const movies = await getTopMovies()
        console.log('Top movies: ', movies);
  
        const email = await sendEmail();
        console.log('email sent!');
        
    }
  }
  
  function getCustomer(id) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {

            let customer = users[id-1];
            
            resolve(customer); //send the correct user as an object

        }, 1000);  
    })
    
  }
  
  function getTopMovies() {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['Django Unchained', 'Iron Man']);
        }, 1000);
    })
    
  }
  
  function sendEmail(email, movies) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    })
    
  }