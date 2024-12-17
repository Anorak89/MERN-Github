const express = require("express");
const app = express();
const cors = require("cors");
const Contact = require("./models/contact")
app.use(cors());

app.use(express.json());
app.use(express.static("dist"))


const requestLogger = (req, res, next) => {
    console.log(`Request Method: ${req.method}`)
    console.log(`Request URL: ${req.url}`)
    console.log(`Request body: ${req.body}`)
    console.log("----------------------")
    next();
}

app.use(requestLogger)

const port = 3001

app.get("/api/contacts", async (req, res) => {
    const contacts = await Contact.find({});
    res.json(contacts)
})

app.get("/api/info", (req, res) => {
    res.send(`<h1>Contacts Web Server</h1>
    <p>Number of contacts: ${contacts.length}</p>`)
})

app.get("/api/contacts/:id", async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404).json({message: "Contact not found!"});
    } else {
        res.json(contact)
    }
})

app.delete("/api/contacts/:id", async (req, res) => {
    const contact = contacts.find(m => m.id===Number(req.params.id));
    
    if(!contact){
        res.status(404).json({message: "Contact not found!"});
    } else {
        contacts = contacts.filter((m)=>m.id != req.params.id);
        res.status(204).json({message: "Contact deleted successfully"})
    }
})

app.post("/api/contacts", async (req, res) => {
    const {name, email} = req.body;
    const contactFind = await Contact.find({email: { $eq: email}});
    if(contactFind.length !== 0){
        return res.status(409).status({error: "Email already exists"});
    }
    else if(!name){
        return res.status(400).json({error: "Name is required"});
    }
    else if(!email){
        return res.status(400).json({error: "Must provide an email"});
        
    }
    else{
        const contactItem= new Contact({name, email});
        const savedContactItem = await contactItem.save();
        res.json(savedContactItem);
    }
})


app.get("/", (req, res) => {
    res.send("What's up");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})