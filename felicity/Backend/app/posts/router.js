var post = require("./post_model");
var router = require("express").Router();

function getPosts(req, res) {
    // const data = req.body
    // console.log(req.body);
    var symptomIds = [];
    post.findPosts((err, result) => {
        if (err) {
            console.log(err);
            res.json({ errMsg: "Error: Failed on getting posts." })
        }
        else {
            for (i in result) {
                symptomIds.push(result[i].sid);
            }

            post.findSymptoms(symptomIds, (error, symptoms) => {
                if (error) {
                    console.log(error);
                    res.json({ errMsg: "Error: Failed on reading symptom list." })
                }
                else {
                    for (i in symptoms) {
                        result[i]["symptoms"] = symptoms[i];
                    }
                    res.json(result);
                }
            })
        }
    });
}

function postPost(req, res) {
    // console.log(req.body);
    const postData = req.body;
    const MHTData = req.body.MHT;
    const checkList = MHTData.checklist;
    // console.log(MHTData);
    post.insertSymptom(MHTData, (error, result) => {
        if (error) {
            console.log(error);
            res.json({ errMsg: "Error: Failed on creating symptom" })
        }
        else {
            // console.log(result)
            symptomId = result.insertId
            post.insertSymptomList(symptomId, checkList, (error, result) => {
                if (error) {
                    console.log(error);
                    res.json({ errMsg: "Error: Failed on creating symptom list" });
                }
            })
            post.insertPost(symptomId, postData, (error, result) => {
                if (error) {
                    console.log(error);
                    res.json({ errMsg: "Error: Failed on creating post" });
                }
            })
        }
    })
    // res.json("received")
}

router.get("/post", getPosts);
router.post("/post", postPost);

module.exports = router;