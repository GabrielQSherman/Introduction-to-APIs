const promise = new Promise((resolve, reject) => { //creating an new instance of the promise class

  setTimeout(() => { //async part of code

    // a promise can be resolved or rejected 
    //both return a value, resolve returns data like an array, string, int etc. reject can also return data but should return a error object
    // resolve(3); 
    reject(new Error('You got an error')); //this string will be stored in the error object in the message property
  }, 500);
});

promise //this is the format of how a promise should look, its methods can be stringed together on the next line. most method calls can be used like this but is best practice in particularly for promises
  .then(result => console.log('Result', result))
  .catch(err => console.log('Error', err.message));


  // more promises being created

  const promise1 = new Promise((resolve) => {
    setTimeout(() => {
      console.log('Async operation 1...');
      resolve(1);
    }, 2000);
  });
  
  const promise2 = new Promise((resolve) => {
    setTimeout(() => {
      console.log('Async operation 2...');
      resolve(2);
    }, 2000);
  });
  
  Promise.race([promise1, promise2]) //Promise is a global object that has methods such as .all and .race.
    .then(result => console.log(result))
    .catch(err => console.log('Error', err.message));

  Promise.all([promise1, promise2]) 
    .then(result => console.log(result))
    .catch(err => console.log('Error', err.message));