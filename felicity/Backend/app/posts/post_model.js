const config = require("../config");
var post = module.exports;

const readPostQry =
    "SELECT post.id, symptom.id AS sid, symptom.category, post.title, post.content, " +
    "date_format((symptom.created_time), '%Y/%m/%d %l:%i %p') AS date, " +
    "post.is_replied AS state, post.comment FROM post " +
    "JOIN symptom ON post.symptom_id = symptom.id";

const readSymptomList =
    "SELECT * FROM symptom_list WHERE symptom_list.symptom_id IN (?)";

const insertPostQry =
    "INSERT INTO felicity.post " +
    "(`symptom_id`, `patient_id`, `title`, `content`, `is_replied`) " +
    "VALUES (?, ?, ?, ?, ?)"

const insertSymptomQry =
    "INSERT INTO felicity.symptom " +
    "(`patient_id`, `wounded_area`, `preferred_department`, `injured_time`, `severity`, `reason`) " +
    "VALUES (?, ?, ?, ?, ?, ?)"

const insertSymptomListQry =
    "INSERT INTO felicity.symptom_list (`symptom_id`, `cough`, `vomit`, `fever`, " +
    "`sore_throat`, `phlegm`, `runny_nose`, `nauseous`, `out_of_breath`, `stomachache`, " +
    "`chills`, `muscle_sickness`, `other`)" +
    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"


post.findPosts = function findPosts(callback) {
    config.db.query(readPostQry, (err, result) => {
        if (err) callback(err, null);

        callback(null, result);
    })
}

post.findSymptoms = function findSymptoms(symptomIds, callback) {
    var idString = symptomIds.join(', ');
    config.db.query(readSymptomList, idString, (err, result) => {
        if (err) callback(err, null);

        callback(null, result)
    })
}

post.insertPost = function insertPost(sid, data, callback) {
    const postList = [sid, data.MHT.patientId, data.title, data.context, 0];
    config.db.query(insertPostQry, postList, (err, result) => {
        if (err) callback(err, null);

        callback(null, result);
    })
}

post.insertSymptom = function insertSymptom(data, callback) {
    // console.log(data)
    const symptomList = [data.patientId, data.hurt, data.department, data.time, data.level, data.why]
    // console.log(symptomList)
    config.db.query(insertSymptomQry, symptomList, (err, result) => {
        if (err) callback(err, null);

        callback(null, result);
    })
}

post.insertSymptomList = function insertSymptomList(sid, data, callback) {
    const symptomList = [sid, data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9], data[10], data[12]];
    // console.log()
    config.db.query(insertSymptomListQry, symptomList, (err, result) => {
        if (err) callback(err, null);

        callback(null, result);
    })
}