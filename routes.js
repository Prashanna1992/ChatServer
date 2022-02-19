const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,"./uploads");
    },
    filename:(req, file, cb)=>{
        cb(null,Date.now()+makeid(4)+".jpg");
    }
});

const upload = multer({
    storage: storage,
});

// api

router.route("/sendImage").post(upload.single("img"),(req, res)=>{
    try{
        res.json({path:"uploads/"+req.file.filename});
    }catch(e){
        return res.json({error:e})
    }
});

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

module.exports = router;