const Project = require('../models/Project');

exports.createProject = async(req, res) => {

    try {
        
        // creat project
        const project = new Project(req.body); 
        // save creator by jwt 
        project.creator= req.user.id;

        project.save();
        res.json(project)

    } catch (error) {
        console.error(error);
        res.status(500).send('There was an error');
    }

}