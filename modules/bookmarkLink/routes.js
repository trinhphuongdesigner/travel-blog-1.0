const express = require('express');
const router = express.Router();

const {getBookmarkLinks,deleteBookmarkLink,createBookmarkLink,updateBookmarkLink} = require ('./controller')

router.get('/',getBookmarkLinks);
router.post('/', createBookmarkLink);
router.put("/:id", updateBookmarkLink);
router.delete('/:id', deleteBookmarkLink);

module.exports = router;
