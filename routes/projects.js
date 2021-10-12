const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//  create projects api/projects
router.post('/',
    auth,
    [
        check('name', 'Project name is required.').not().isEmpty()
    ],
    projectController.createProject
);

// get projects
router.get('/',
    auth,
    projectController.getProjects
);

// update project
router.put('/:id',
    auth,
    [
        check('name', 'Name projects is required').not().isEmpty()
    ],
    projectController.updateProject
);


module.exports = router;