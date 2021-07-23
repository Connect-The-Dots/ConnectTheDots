const express = require("express")
const SendDriftBottles = require("./messageModels/SendDriftBottles")
const TreeHoleThreads = require("./messageModels/TreeHoleThreads")
const router = express.Router()
const fs = require('fs');
const multiparty = require('multiparty');

/* SOURCE: https://rahmanfadhil.com/express-rest-api/ */

// Get all send drift bottles
router.get("/getSendDriftBottles/:userId", async (req, res) => {
	const sendDriftBottles = await SendDriftBottles.find({userId: req.params.userId})
	res.send(sendDriftBottles)
})

// Get all tree hole threads
router.get("/getTreeHoleThreads", async (req, res) => {
	const treeHoleThread = await TreeHoleThreads.find()
	res.send(treeHoleThread);
})


// Get all collected drift bottles
router.get("/getCollectedDriftBottles/:userId", async (req, res) => {
	const collectedDriftBottles = await SendDriftBottles.find({collectorUserId: req.params.userId})
	res.send(collectedDriftBottles)
})

// Collect a random  drift bottles
router.get("/getARandomDriftBottle/:userId", async (req, res) => {
	const collectedDriftBottle = await SendDriftBottles.findOne({ "userId": { "$ne": req.params.userId }, collectorUserId:  null});
    
    if(collectedDriftBottle) {
        const query = {_id: collectedDriftBottle._id},
        update = {collectorUserId: req.params.userId},
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
        await SendDriftBottles.findOneAndUpdate(query, update, options, (error, result) => {
            if (error) console.log("Failed to update collectorID when getting a random bottle " + error.stack);
            else res.send(result)
        });

    } else {
        res.json("none");
    }
	
})


const getDateString = () => {
        const date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();

        // current hours
        let hours = date_ob.getHours();

        // current minutes
        let minutes = date_ob.getMinutes();

        // current seconds
        let seconds = date_ob.getSeconds();
    
        return  year + month + date + hours +  minutes +  seconds;
}

const getHashFileName = (userId, fileName) => {
    return userId + "-" + getDateString() + Math.floor(Math.random() * 100) + 1 + fileName;
}

router.post ("/addDriftBottlesImages", (req, res) => {
    const fullServerUrl = req.protocol + '://' + req.get('host');
    const form = new multiparty.Form();
    form.parse(req, async (err,fields, files) => {
        const imageFileName = fields.imageFileName[0];
        const userId = fields.userId[0];
        const bottleId = fields.bottleId[0];
        let hashImageName = null;
        
        
        hashImageName = getHashFileName(userId, imageFileName);
        //The file itself
        const uploadImageFile = files.imageFile[0];
        const path_temp = uploadImageFile.path;
        //Move uploaded file with unique name to server public/files folder
        await fs.rename(path_temp,`${__dirname}/public/driftBottleImages/${hashImageName}`, (err) => {
            if (err) console.error(err);
        });
        
        const query = {_id: bottleId},
        update = {imageFileName: hashImageName, imageUrl: fullServerUrl+"/messageApi/getDriftBottleImages/"+hashImageName},
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
        await SendDriftBottles.findOneAndUpdate(query, update, options, (error, result) => {
            if (error) console.log("Failed to update image file name. Error: " + error.stack);
        });
        
        res.json("AddDriftBottlesImages SUCCESS")
        
    
    });

})

router.post ("/addTreeHoleThreadImages", (req, res) => {
    const fullServerUrl = req.protocol + '://' + req.get('host');
    const form = new multiparty.Form();
    form.parse(req, async (err,fields, files) => {
        const imageFileName = fields.imageFileName[0];
        const userId = fields.userId[0];
        const treeHoleThreadId = fields.treeHoleThreadId[0];
        let hashImageName = null;
        
        
        hashImageName = getHashFileName(userId, imageFileName);
        //The file itself
        const uploadImageFile = files.imageFile[0];
        const path_temp = uploadImageFile.path;
        //Move uploaded file with unique name to server public/files folder
        await fs.rename(path_temp,`${__dirname}/public/TreeHoleImages/${hashImageName}`, (err) => {
            if (err) console.error(err);
        });
        
        const query = {_id: treeHoleThreadId},
        update = {imageFileName: hashImageName, imageUrl: fullServerUrl+"/messageApi/getTreeHoleThreadImages/"+hashImageName},
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
        await TreeHoleThreads.findOneAndUpdate(query, update, options, (error, result) => {
            if (error) console.log("Failed to update tree hole image file name. Error: " + error.stack);
        });
        
        res.json("addTreeHoleThreadImages SUCCESS")
        
    
    });

})

router.post ("/addDriftBottlesVideos", (req, res) => {
    const fullServerUrl = req.protocol + '://' + req.get('host');
    const form = new multiparty.Form();
    form.parse(req, async (err,fields, files) => {
        const videoFileName = fields.videoFileName[0];
        const userId = fields.userId[0];
        const bottleId = fields.bottleId[0];
        let hashVideoName = null;
        
        
        hashVideoName = getHashFileName(userId, videoFileName);
        //The file itself
        const uploadVideoFile = files.videoFile[0];
        const path_temp = uploadVideoFile.path;
        //Move uploaded file with unique name to server public/files folder
        await fs.rename(path_temp,`${__dirname}/public/driftBottleVideos/${hashVideoName}`, (err) => {
            if (err) console.error(err);
        });
        
        const query = {_id: bottleId},
        update = {videoFileName: hashVideoName, videoUrl: fullServerUrl+"/messageApi/getDriftBottleVideos/"+hashVideoName},
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
        await SendDriftBottles.findOneAndUpdate(query, update, options, (error, result) => {
            if (error) console.log("Failed to update video file name and url. Error: " + error.stack);
        });
        
        res.json("AddDriftBottlesVideos SUCCESS")
        
    
    });

})

router.post ("/addTreeHoleThreadVideos", (req, res) => {
    const fullServerUrl = req.protocol + '://' + req.get('host');
    const form = new multiparty.Form();
    form.parse(req, async (err,fields, files) => {
        const videoFileName = fields.videoFileName[0];
        const userId = fields.userId[0];
        const treeHoleThreadId = fields.treeHoleThreadId[0];
        let hashVideoName = null;
        
        
        hashVideoName = getHashFileName(userId, videoFileName);
        //The file itself
        const uploadVideoFile = files.videoFile[0];
        const path_temp = uploadVideoFile.path;
        //Move uploaded file with unique name to server public/files folder
        await fs.rename(path_temp,`${__dirname}/public/TreeHoleVideos/${hashVideoName}`, (err) => {
            if (err) console.error(err);
        });
        
        const query = {_id: treeHoleThreadId},
        update = {videoFileName: hashVideoName, videoUrl: fullServerUrl+"/messageApi/getTreeHoleThreadVideos/"+hashVideoName},
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
        await TreeHoleThreads.findOneAndUpdate(query, update, options, (error, result) => {
            if (error) console.log("Failed to update tree hole video file name and url. Error: " + error.stack);
        });
        
        res.json("addTreeHoleThreadVideos SUCCESS")
        
    
    });

})

router.post ("/addDriftBottlesAudios", (req, res) => {
    const fullServerUrl = req.protocol + '://' + req.get('host');
    const form = new multiparty.Form();
    form.parse(req, async (err,fields, files) => {
        const audioFileName = fields.audioFileName[0];
        const userId = fields.userId[0];
        const bottleId = fields.bottleId[0];
        let hashAudioName = null;
        
        
        hashAudioName = getHashFileName(userId, audioFileName);
        //The file itself
        const uploadAudioFile = files.audioFile[0];
        const path_temp = uploadAudioFile.path;
        //Move uploaded file with unique name to server public/files folder
        await fs.rename(path_temp,`${__dirname}/public/driftBottleAudios/${hashAudioName}`, (err) => {
            if (err) console.error(err);
        });
        
        const query = {_id: bottleId},
        update = {audioFileName: hashAudioName, audioUrl: fullServerUrl+"/messageApi/getDriftBottleAudios/"+hashAudioName},
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
        await SendDriftBottles.findOneAndUpdate(query, update, options, (error, result) => {
            if (error) console.log("Failed to update audio file name and url. Error: " + error.stack);
        });
        
        res.json("AddDriftBottlesAudios SUCCESS")
        
    
    });

})


router.post ("/addTreeHoleThreadAudios", (req, res) => {
    const fullServerUrl = req.protocol + '://' + req.get('host');
    const form = new multiparty.Form();
    form.parse(req, async (err,fields, files) => {
        const audioFileName = fields.audioFileName[0];
        const userId = fields.userId[0];
        const treeHoleThreadId = fields.treeHoleThreadId[0];
        let hashAudioName = null;
        
        
        hashAudioName = getHashFileName(userId, audioFileName);
        //The file itself
        const uploadAudioFile = files.audioFile[0];
        const path_temp = uploadAudioFile.path;
        //Move uploaded file with unique name to server public/files folder
        await fs.rename(path_temp,`${__dirname}/public/TreeHoleAudios/${hashAudioName}`, (err) => {
            if (err) console.error(err);
        });
        
        const query = {_id: treeHoleThreadId},
        update = {audioFileName: hashAudioName, audioUrl: fullServerUrl+"/messageApi/getTreeHoleThreadAudios/"+hashAudioName},
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
        await TreeHoleThreads.findOneAndUpdate(query, update, options, (error, result) => {
            if (error) console.log("Failed to update tree hole audio file name and url. Error: " + error.stack);
        });
        
        res.json("addTreeHoleThreadAudios SUCCESS")
        
    
    });

})

router.put("/addSendDriftBottlesReplies", async(req,res) => {
    const query = {_id: req.body._id},
    update = {replies: req.body.replies},
    options = { upsert: true, new: true, setDefaultsOnInsert: true };
    await SendDriftBottles.findOneAndUpdate(query, update, options, (error, result) => {
        if (error) console.log("Failed to update send drift bottles replies. Error: " + error.stack);

    });
    
    
    res.json("ADD SEND BOTTLE REPLIES success");
    
})

router.put("/addTreeHoleThreadReplies", async(req,res) => {
    const query = {_id: req.body._id},
    update = {replies: req.body.replies},
    options = { upsert: true, new: true, setDefaultsOnInsert: true };
    await TreeHoleThreads.findOneAndUpdate(query, update, options, (error, result) => {
        if (error) console.log("Failed to update tree hole threads replies. Error: " + error.stack);

    });
    
    
    res.json("ADD TREE HOLE THREAD REPLIES success");
    
})

// Add individual send drift bottles.
router.post("/addSendDriftBottles", async (req, res) => {
	const sendDriftBottles = new SendDriftBottles({
		name: req.body.name,
		location: req.body.location,
        imageSrc: req.body.imageSrc,
        audioUrl: req.body.audioUrl,
        imageUrl: req.body.imageUrl,
        videoUrl: req.body.videoUrl,
        content:  req.body.content,
        replies:  req.body.replies,
        userId: req.body.userId,
        collectorUserId: null,
	})
	await sendDriftBottles.save();
	res.json({message:"ADD SEND BOTTLE success", bottleId: sendDriftBottles._id});
})

// Add individual tree hole thread
router.post("/addTreeHoleThread", async (req, res) => {
	const treeHoleThreads = new TreeHoleThreads({
		name: req.body.name,
        imageSrc: req.body.imageSrc,
        audioUrl: req.body.audioUrl,
        imageUrl: req.body.imageUrl,
        videoUrl: req.body.videoUrl,
        content:  req.body.content,
        replies:  req.body.replies,
        userId: req.body.userId,
	})
	await treeHoleThreads.save();
	res.json({message:"ADD TREE HOLE THREAD success", treeHoleThreadId: treeHoleThreads._id});
})

//SEND image file endpoint
router.get('/getDriftBottleImages/:imageName', function (req, res, next) {

    const options = {
        root: __dirname + '/public/driftBottleImages/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    const fileName = req.params.imageName;


    //Send request file name
    res.sendFile(fileName, options, (err) => {
        if (err) {
            next(err);
        } 
    })

});

router.get('/getTreeHoleThreadImages/:imageName', function (req, res, next) {

    const options = {
        root: __dirname + '/public/TreeHoleImages/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    const fileName = req.params.imageName;


    //Send request file name
    res.sendFile(fileName, options, (err) => {
        if (err) {
            next(err);
        } 
    })

});


router.get('/getDriftBottleVideos/:videoName', function (req, res, next) {

    const options = {
        root: __dirname + '/public/driftBottleVideos/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    const fileName = req.params.videoName;


       //Send request file name
    res.sendFile(fileName, options, (err) => {
        if (err) {
            next(err);
        }
    })

});

router.get('/getTreeHoleThreadVideos/:videoName', function (req, res, next) {

    const options = {
        root: __dirname + '/public/TreeHoleVideos/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    const fileName = req.params.videoName;


       //Send request file name
    res.sendFile(fileName, options, (err) => {
        if (err) {
            next(err);
        }
    })

});


router.get('/getDriftBottleAudios/:audioName', function (req, res, next) {

    const options = {
        root: __dirname + '/public/driftBottleAudios/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    const fileName = req.params.audioName;


       //Send request file name
    res.sendFile(fileName, options, (err) => {
        if (err) {
            next(err);
        } 
    })

});

router.get('/getTreeHoleThreadAudios/:audioName', function (req, res, next) {

    const options = {
        root: __dirname + '/public/TreeHoleAudios/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    const fileName = req.params.audioName;


       //Send request file name
    res.sendFile(fileName, options, (err) => {
        if (err) {
            next(err);
        }
    })

});




router.delete("/deleteCollectedDriftBottles/:id", async (req, res) => {
    const query = {_id: req.params.id},
    update = {collectorUserId: null},
    options = { upsert: true, new: true, setDefaultsOnInsert: true };
    await SendDriftBottles.findOneAndUpdate(query, update, options, (error, result) => {
        if (error) console.log("Failed to throw a collected bottle. Error: " + error.stack);
        else 
            res.json('DELETE COLLECTED BOTTLE success');

    });
    
    
    
    
})

router.delete("/deleteSendDriftBottles/:id", async (req, res) => {
	try {
        
        // Delete image if any
        const bottleToDeleteImage = await SendDriftBottles.find({_id:req.params.id}, 'imageFileName');
        
        if (bottleToDeleteImage && bottleToDeleteImage[0].imageFileName) {
           let filePath = `${__dirname}/public/driftBottleImages/${bottleToDeleteImage[0].imageFileName}`;
            await fs.unlink(filePath, (error) => {
                if(error) console.error(error);
            }) 
        }
        
        // Delete video if any
        const bottleToDeleteVideo = await SendDriftBottles.find({_id:req.params.id}, 'videoFileName');
        
        if (bottleToDeleteVideo && bottleToDeleteVideo[0].videoFileName) {
           let filePath = `${__dirname}/public/driftBottleVideos/${bottleToDeleteVideo[0].videoFileName}`;
            await fs.unlink(filePath, (error) => {
                if(error) console.error(error);
            }) 
        }
        
        // Delete audio if any
        const bottleToDeleteAudio = await SendDriftBottles.find({_id:req.params.id}, 'audioFileName');
        
        if (bottleToDeleteAudio && bottleToDeleteAudio[0].audioFileName) {
           let filePath = `${__dirname}/public/driftBottleAudios/${bottleToDeleteAudio[0].audioFileName}`;
            await fs.unlink(filePath, (error) => {
                if(error) console.error(error);
            }) 
        }
        
		await SendDriftBottles.deleteOne({ _id: req.params.id })
		res.json("DELETE SEND BOTTLE success");
	} catch {
		res.status(404)
		res.json("SEND DRIFT BOTTLE doesn't exist!" );
	}
})


router.delete("/deleteTreeHoleThreads/:id", async (req, res) => {
	try {
        
        // Delete image if any
        const treeHoleThreadImage = await TreeHoleThreads.find({_id:req.params.id}, 'imageFileName');
        
        if (treeHoleThreadImage && treeHoleThreadImage[0].imageFileName) {
           let filePath = `${__dirname}/public/TreeHoleImages/${treeHoleThreadImage[0].imageFileName}`;
            await fs.unlink(filePath, (error) => {
                if(error) console.error(error);
            }) 
        }
        
        // Delete video if any
        const treeHoleThreadVideo = await TreeHoleThreads.find({_id:req.params.id}, 'videoFileName');
        
        if (treeHoleThreadVideo && treeHoleThreadVideo[0].videoFileName) {
           let filePath = `${__dirname}/public/TreeHoleVideos/${treeHoleThreadVideo[0].videoFileName}`;
            await fs.unlink(filePath, (error) => {
                if(error) console.error(error);
            }) 
        }
        
        // Delete audio if any
        const treeHoleThreadAudio = await TreeHoleThreads.find({_id:req.params.id}, 'audioFileName');
        
        if (treeHoleThreadAudio && treeHoleThreadAudio[0].audioFileName) {
           let filePath = `${__dirname}/public/TreeHoleAudios/${treeHoleThreadAudio[0].audioFileName}`;
            await fs.unlink(filePath, (error) => {
                if(error) console.error(error);
            }) 
        }
        
		await TreeHoleThreads.deleteOne({ _id: req.params.id })
		res.json("DELETE TREE HOLE THREAD success");
	} catch {
		res.status(404)
		res.json("TREE HOLE THREAD doesn't exist!" );
	}
})

module.exports = router