const express = require('express');
const router = express.Router();

const {getBookmarkFolders,createBookmarkFolder,updatebookmarkFolder,deletebookmarkFolder} = require('./controller');

router.get('/', getBookmarkFolders);

router.post('/', createBookmarkFolder);

router.put('/:id', updatebookmarkFolder);

router.delete('/:id', deletebookmarkFolder)

module.exports = router;
