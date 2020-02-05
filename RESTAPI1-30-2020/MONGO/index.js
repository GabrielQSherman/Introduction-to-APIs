const mongoose = require('mongoose'),
      express =  require('express'),
      app = express();


    app.use(express.json())

    const courseSchema = mongoose.Schema({ 
        //this is model's 'object' constructor function it will set the blueprint for the objects that will be stored in the database
        name: String,
        author: String,
        tags: [String],
        date: { type: Date, default: Date.now},
        isPublished: { type: Boolean, default: false}
    });

    const Course = mongoose.model('Course', courseSchema); //having a mongoose model allows the program to create intances of the schema and this will be what gets called upon to find data in a partiucular portion of the database

    const gabe_course = new Course({
        name: 'Gabes Photography Course 1',
        author: 'Gabriel Sherman',
        tags: ['intro', 'photos101'],
    })

    // console.log(gabe_course);

    // gabe_course.save()

    app.get('/', (req, res) => {
        res.send('hello')
    })


    app.get('/showcourses', async (req, res) => {

        const allCourses = await Course.find();

        res.send(allCourses)

    })

    app.get('/showcourses/:id', get_doc_by_id, (req, res) => {

        console.log(req.document);
        
        res.send('complete')
        // res.send(req.document)
    })


    async function get_doc_by_id(req, res, next) {

        console.log(req.params.id);

        let id = req.params.id
        
        req.document = await Course.findOne({_id: id});
        
        next()
    }


app.listen(3000, () => {

    console.log('\nListening on 3000\n');
    
})


mongoose.connect('mongodb+srv://user314:31415@cluster0-ichxa.mongodb.net/playground?retryWrites=true&w=majority', ( { useNewUrlParser: true , useUnifiedTopology: true})) //this creates a promise
    .then(() => console.log('Connected to Database')) //if everything goes well
    .catch( err => console.log('Could not connect to database...', err)) //if not give an error to the log
    