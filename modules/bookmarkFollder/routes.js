const express = require('express');
const router = express.Router();

const {getbookmarkFolder,getbookmarkFolders,createbookmarkFolder,updatebookmarkFolder,deletebookmarkFolder} = require('./controller');

router.get('/',getbookmarkFolders);

router.get('/:id',getbookmarkFolder);

router.get('/create',createbookmarkFolder);

router.get('/update',updatebookmarkFolder);

router.get('/delete',deletebookmarkFolder)

module.exports = router;