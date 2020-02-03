const promise = new Promise((resolve, reject) => {

  setTimeout(() => {
    resolve(3); // pending => resolved, fulfilled 
    reject(new Error('You got an error')); // pending => rejected
  }, 500);
});

promise
  .then(result => console.log('Result', result))
  .catch(err => console.log('Error', err.message));