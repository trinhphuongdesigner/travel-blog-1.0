const express = require('express');
const router = express.Router();

const {getbookmarkFolder,getbookmarkFolders,createbookmarkFolder,updatebookmarkFolder,deletebookmarkFolder} = require('./controller');

router.getgit