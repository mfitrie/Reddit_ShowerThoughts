const express = require('express');
const router = express.Router();

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


const getTenRandomThought = async ()=>{
    try {
        const count = await countThoughtData();
        const tenRandomNumber = [];
        const tenThought = [];

        while(tenRandomNumber.length != 9){
            const random = Math.floor(Math.random() * count) + 1;
            tenRandomNumber.push(random);
        }

        tenRandomNumber.sort((a,b)=>{
           return a-b;
        })

        for(number of tenRandomNumber){
            const data = await Thought.findOne({
                index: number
            }, {
                _id: 0,
                __v: 0,
            }) ?? 'No Data'

            tenThought.push(data);
        }

        return tenThought;

    } catch (error) {
        console.log(error);
    }
}


router.get('/', async (req,res)=>{
    const count = await countThoughtData(); 
    res.status(200).json({
        message: `Welcome to ShowerThoughts API :D!! There are ${count} number of data.`,
    });
});

router.get('/getall', async (req, res)=>{
    const data = await getAllDataThought();
    res.status(200).json({
        data
    });
});

router.get('/getThoughtRandom', async (req, res)=>{
    const data = await getTenRandomThought();
    res.status(200).json({
        data
    });
});

router.get('/getbyindex/:index', async(req, res)=>{
    const index = req.params.index;
    const data = await getDataThoughtByIndex(index) ?? 'No Data';

    res.status(200).json({
        data
    });
});

router.post('/addThought', (req, res)=>{
    res.status(200).json({
        data: 'Data added!'
    });
});



module.exports = router;
