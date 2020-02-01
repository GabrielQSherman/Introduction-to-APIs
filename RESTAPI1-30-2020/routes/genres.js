const express = require('express'),
      router = express.Router(),
      Joi = require('joi');


    const genres = [
        {id:1, name: "horror"},
        {id:2, name: "action"},
        {id:3, name: "drama"},
        {id:4, name: "comedy"}
    ];



//handling get all request on /api/genres
router.get('/', (req, res) => {
    res.json({genres});
});

//get request for specific genres by id on /api/genres
router.get(':id', (req, res) => {
    const specificGenre = genres.find(c => c.id === parseInt(req.params.id));

    if (!specificGenre) return res.status(404).send('That genres could not be found');


    res.status(200).send(specificGenre);

});

//POST HANDLING on /api/genres
router.post('/', (req, res) => {

    const { error } = validate_genres(req.body);
    
    if (error) return res.status(400).json({ message: error });

    const newgenres = {
        id: genres.length+1,
        name: req.body.name
    }

    genres.push(newgenres);

    res.status(200).json({newgenres: newgenres})

});

//PUT update a post on /api/genres
router.put('/:id', (req, res) => {

    const specificGenre = genres.find(c => c.id === parseInt(req.params.id));

    if (!specificGenre) return res.status(404).send('That genres could not be found');

    const { error } = validate_genres(req.body);
    
    if (error) return res.status(400).json({ message: error });

    //now that the potential erros have been handled, update the data
    specificGenre.name = req.body.name;

    res.send(specificGenre);

})

//DELETE REQUEST on /api/genres
router.delete('/:id', (req, res) => {
    const specificGenre = genres.find(c => c.id === parseInt(req.params.id));

    if (!specificGenre) return res.status(404).send('That genres could not be found');

    //now that the potential erros have been handled, delete the desired data
    genres.splice(genres.indexOf(specificGenre), 1);

    res.send(specificGenre);

})


//validation middleware for /api/genres
function validate_genres(genres) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genres, schema);

}


module.exports = router;