const Project = require('../models/Project');
const { validationResult } = require('express-validator');
const { exists } = require('../models/Project');

exports.createProject = async (req, res) => {

    //valid error 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        // creat project
        const project = new Project(req.body);
        // save creator by jwt 
        project.creator = req.user.id;

        project.save();
        res.json(project)

    } catch (error) {
        console.error(error);
        res.status(500).send('There was an error');
    }

}

// get all project of actual user
exports.getProjects = async (req, res) => {

    try {

        const projects = await Project.find({ creator: req.user.id }).sort({ created_at: -1 });
        res.json({ projects });

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }

}

// update a project
exports.updateProject = async (req, res) => {

    //valid error 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    if (name) {
        const newProject = {};
        newProject.name = name;
    }

    try {

        // check ID 
        let project = await Project.findById(req.params.id);

        // if project exists 
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        // verify project creator 
        if (project.creator.toString() !== req.user.id) {
            return res.status(404).json({ msg: 'User no authorized' });
        }

        // update 
        project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true });

        res.json({ project });

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }

}

// delete a project
exports.deleteProject = async (req, res) => {

    try {

        // check ID 
        let project = await Project.findById(req.params.id);

        // if project exists 
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        // verify project creator 
        if (project.creator.toString() !== req.user.id) {
            return res.status(404).json({ msg: 'User no authorized' });
        }

        // delete 
        await Project.findOneAndRemove({ _id: req.params.id })

        res.json({ msg: 'Project deleted' });

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }

}