const {User} = require('../../models/index');

module.exports = {
    user: ()=> {},
    users: ()=> {},

    createUser: async (req,res)=> {
        const addUser = await new userSchema ({
            firstName : "nguyen",
            lastName : "son",
            role: "manager", //amin,manager,contributor
            email: "sonnguyen2766@gmail.com",
            phone: 0333332766,
            address: "456 Trung Nu Vuong - DaNang",
            about: "String",
            socialLink: {
                facebook: "https://www.facebook.com/sonnguyen2766/",
                instagram: "https://www.instagram.com/_son.1612/",
            },
            bookmarkFolderId: mongoose.ObjectId,
            createAt: new Date(),
            updateAt: new Date()
    }),
        addUser.save().then(()=> {
            res.send('Create successfull !!')
        })
    },

    
    updateUser: ()=> {},
    deleteUser: ()=> {},
}