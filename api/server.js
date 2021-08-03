// BUILD YOUR SERVER HERE
const express = require("express")

const User = require("./users/model")
const server = express()
server.use(express.json())



server.get( "/api/users",(req,res) => {


    User.find()
    .then(event => {
      if(event){  res.status(200).json(event)}
      else{
          res.status(404).json({message: "we need to try a lillte harder"})
      }
    
    })

    .catch(err =>{
        res.status(500).json({ message: err.message})
    })
}
    
)
    





server.get("/api/users/:id", (req,res) => {

const {id} = req.params

User.findById(id)
.then(event => {
    if(!event){
    res.status(404).json({message: ` try again  ${id} not found `})
}
else{
    res.status(200).json(event)
}


})
.catch(err => {
    res.status(500).json({ message: err.message})
})
})





server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;
    User.remove(id)
      .then((del) => {
        if (!del) {
          res
            .status(404)
            .json({ message: "Specified ID does not exist" });
        } else {
          res.json(del);
        }
      })
      .catch(() => {
        res.status(500).json({
          message: "User is not removed",
        });
      });
  });



server.post("/api/users/" , (req,res) => {  
const user = req.body;
//console.log(user.name, user.bio)
User.insert(user)
.then(u => {
// throw new Error("AHHH!")
res.json(u)
})
.catch(err => {
   res.status(500).json({ message: err.message}) 
})

})




server.put("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    if (!name || !bio) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
    }
    try {
      const updatedUser = await User.update(id, { name, bio });
      if (!updatedUser) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.json(updatedUser);
      }
    } catch (err) {
      res.status(500).json({
        message: "The user information could not be modified",
      });
    }
  });






module.exports = server; // EXPORT YOUR SERVER instead of {}
