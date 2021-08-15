const express = require ('express');
const uuid = require ('uuid');
const router = express.Router();
const members = require ('../../Members');

//Gets all members
router.get('/', (req, res) => res.json(members));

//get a single members
router.get('/:id', (req, res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No member with th id of ${req.params.id}`});
    }   
});

//Create member
router.post('/', (req, res) => {
    const newMember = {
        id : uuid.v4(),
        name : req.body.name,
        email : req.body.email,
        status : 'active' 
    }

    if(!newMember.name || !newMember.email) {
        return res.status(400).json({ msg : 'Please include a name and email'});
    }

    members.push(newMember);
    res.json(members);
    // res.redirect('/');
});

//Update member
router.put('/:id', (req, res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        const updMember = req.body;
        members.forEach(members => {
            if (members.id === parseInt(req.params.id)) {
                members.name = updMember.name ? updMember.name : members.name;
                members.email = updMember.email ? updMember.email : members.email;

                res.json({ msg: 'member updated', members});
            }
        });
    } else {
        res.status(400).json({ msg: `No member with th id of ${req.params.id}`});
    }   
});

//Delete member
router.delete('/:id', (req, res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json({
            msg : 'Member deleted', 
            members : members.filter(member => member.id !== parseInt(req.params.id))
    });
    } else {
        res.status(400).json({ msg: `No member with th id of ${req.params.id}`});
    }   
});


module.exports = router;