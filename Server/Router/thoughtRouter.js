const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const Thought = require('../../DB/model');


const getDataThoughtByID = async (id)=>{
    try {
        const data = await Thought.findById(id);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
// getDataThoughtByID();


const getDataThoughtByIndex = async (index)=>{
    try {
        const data = await Thought.findOne({index}, {
            _id: 0,
            __v: 0,
        });
        return data
    } catch (error) {
        console.log(error);
    }
}


const getAllDataThought = async ()=>{
    try {
        const data = await Thought.find({}, {
            _id: 0,
            __v: 0
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}



const countThoughtData = async()=>{
    try {
        const countData = await Thought.countDocuments().exec();
        return countData;
    } catch (error) {
        console.log(error);
    }
}


const getFiveRandomThought = async (protocol, hostName)=>{
    try {
        const count = await countThoughtData();
        const TOTAL_IMAGE = 7;
        const tenRandomNumber = [];
        const tenThought = [];

        while(tenRandomNumber.length != 5){
            const random = Math.floor(Math.random() * count) + 1;
            tenRandomNumber.push(random);
        }

        tenRandomNumber.sort((a,b)=>{
           return a-b;
        })

        for(number of tenRandomNumber){
            const dataDB = await Thought.findOne({
                index: number
            }, {
                _id: 0,
                __v: 0,
            }) ?? 'No Data'

            const randomNumberImage = Math.floor(Math.random() * TOTAL_IMAGE) + 1;
            const data = {
                index: dataDB.index,
                vote: dataDB.vote,
                thought: dataDB.thought,
                image: `${protocol}://${hostName}/api/picture/${randomNumberImage}`
            }

            // data.image = `${hostName}/picture/anime_curious/1.png`;
            // data.image = 'hello';

            tenThought.push(data);
        }

        return tenThought;

    } catch (error) {
        console.log(error);
    }
}

router.use(express.static(path.resolve(__dirname, '../../anime_curious')));


router.get('/', async (req,res)=>{
    const count = await countThoughtData(); 
    res.status(200).json({
        message: `Welcome to ShowerThoughts API :D!! There are ${count} number of data.`,
    });
});

router.get('/picture/:id', (req, res)=>{
    try {
        const MAX_ID = 7;
        const id = req.params.id;

        if(id <= MAX_ID){
            res.status(200).sendFile(path.resolve(__dirname, `../../anime_curious/${id}.jpg`));
            return;
        }

        throw Error;
        
    } catch (error) {
        res.status(404).json({
            message: `There is no ID: ${req.params.id}`
        });
    }
})

router.get('/getall', async (req, res)=>{
    const data = await getAllDataThought();
    res.status(200).json({
        data
    });
});

router.get('/getThoughtRandom', async (req, res)=>{
    try {
        const data = await getFiveRandomThought(req.protocol, req.get('host'));
        res.status(200).json({
            data,
        });
        // res.status(200).send(`<img src=${data}>`)
    } catch (error) {
        res.status(404).json({
            message: 'Error in server'
        })
    }
});

router.get('/getbyindex/:index', async(req, res)=>{
    const index = req.params.index;
    const data = await getDataThoughtByIndex(index) ?? 'No Data';

    res.status(200).json({
        data
    });
});

// TESTING POST
router.post('/addThought', (req, res)=>{
    const username = req.body.username;

    res.status(200).json({
        username,
        data: 'Data added!'
    });
});



module.exports = router;
