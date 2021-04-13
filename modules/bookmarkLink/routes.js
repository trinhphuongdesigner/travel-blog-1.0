const express = require('express');
const router = express.Router();

const {getbookmarkLink,getbookmarkLinks,deletebookmarkLink} = require ('./controller')

router.get('/',getbookmarkLinks);
router.get('/:id',getbookmarkLink);
router.get('/delete',deletebookmarkLink)

module.exports = router;