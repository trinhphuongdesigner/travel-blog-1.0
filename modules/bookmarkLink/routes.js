const express = require('express');
const router = express.Router();

const {getbookmarkLink,getbookmarkLinks,deletebookmarkLink,createbookmarkLink,updatebookmarkLink} = require ('./controller')

router.get('/',getbookmarkLinks);
router.get('/:id',getbookmarkLink);
router.get("/delete", createbookmarkLink);
router.get("/create", updatebookmarkLink);
router.get('/update', deletebookmarkLink);

module.exports = router;