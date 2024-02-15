import multer from "multer"
// import path from "path"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './storage')
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname )
      console.log("in multer:::",file)
      
    }
  })
  
export const upload = multer({ 
    storage: storage 
})