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

    //HOMEROUTE

    app.get('/', (req, res) => {
        res.send('hello')
    })

    app.get('/showcourses', async (req, res) => {

        const allCourses = await Course.find();

        res.send(allCourses)

    })

    //GET COURSE BY ID

    app.get('/showcourses/:id', get_doc_by_id, (req, res) => {

        res.status(200).json({
            name_of_course: req.document.name,
            author_of_course: req.document.author
        });

        console.log('Get Post by Id success');
        
        
    })

    //POST A NEW COURSE

    app.post('/courses_post', async (req, res) => {

        let new_upload = new Course({
            name: req.body.name,
            author: req.body.author,
            tags: req.body.tags
        })

        try {

            savedPost = await new_upload.save();

            res.status(200).json({
                NEWPOST: savedPost
            })
            
        } catch (err) {
            res.status(400).json( {message: err.message})
        }
    });

    //DELETE A COURSE BY ID

    app.delete('/courses_delete/:id', get_doc_by_id, async (req, res) => {

        try {

            let deletedPost = req.document,
                deletedCourseReport = await Course.deleteOne({_id: req.document._id});

            res.status(200).json(deletedPost)

            console.log('\n\nDeletion report; number of documents deleted succesfuly', deletedCourseReport.deletedCount);
            
            
        } catch (err) {

            res.status(500).json( {message: err.message} )
            
        }
    })

    //Path or update a post by id

    app.patch('/courses_patch/:id', get_doc_by_id, async (req, res) => {

        try {

            if (req.body.name != undefined) {
                
                req.document.name = req.body.name;
            }

            if (req.body.author != undefined) {
                
                req.document.author = req.body.author;
            }

            if (req.body.isPublished != undefined) {
                
                req.document.isPublished = req.body.isPublished;
            }

            if (req.body.tags != undefined) {
                
                req.document.tags = req.body.tags;
            }

            let updated = await req.document.save()

            res.json(updated)
            
        } catch (err) {

            res.status(500).json( {message: err.message} )

        }
    })


    //MIDDLEWARE TO GET A COURSE BY ID
    async function get_doc_by_id(req, res, next) {

        let id = req.params.id

        try {

            req.document = await Course.findOne({_id: id})
            
            if (req.document.name == undefined) {
                res.status(404).json( {message: 'Request not complete at this time'})
            }

            next()
            
        } catch (err) {

            res.status(404).json( {message: 'Can not find a document of that id'})
            console.log('Get Post by Id failed');
            

        }
  
       
    }

//LISTEN TO A PORT ON THE LOCAL HOST
app.listen(3000, () => {

    console.log('\nListening on 3000\n');
    
})

mongoose.connect('mongodb+srv://user314:31415@cluster0-ichxa.mongodb.net/playground?retryWrites=true&w=majority', ( { useNewUrlParser: true , useUnifiedTopology: true})) //this creates a promise
    .then(() => console.log('Connected to Database')) //if everything goes well
    .catch( err => console.log('Could not connect to database...', err)) //if not give an error to the log
    