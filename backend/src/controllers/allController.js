import surveyData from "../models/surveyData";
import httpStatus from "http-status";


  export const save = async (req, res, next) => {
    try {
      console.log(req.body, "teamSurvey");
      req.body.createdAt = new Date();
      let data = req.body;
      data.status = true;
      const surveyRegister = new surveyData(data);
      surveyRegister.save((err, item) => {
        if (err) {
          next(err);
        } else {
          res.send(item, httpStatus.CREATED);
        }
      })
  
    } catch (error) {
      return next(error.reason);
    }
  }

  export const list = async (req, res, next) => {
    try {
  
      await surveyData.find({}).exec((err, list) => {
        if (err) {
          next(err);
        } else {
          res.send(list);
        }
      });
    } catch (error) {
      return next(error.reason);
    }
  }

export const del = async (req, res, next) => {
    try {
        let query = {
            name: req.params.name,
           
        };
        console.log((query))
        let data = await surveyData.findOne(query).exec();
    
        data.remove(query).exec((err, item) => {
                if (err) {
                    next(err);
                } else {
                    res.send(item, httpStatus.OK);
                }
            });
       
    } catch (err) {
        next(err.reason);
    }
}


export const update = async (req, res, next) => {
    try {
        console.log("========================================================")
      console.log(req.params._id, req.body);
      let query = {
        _id: req.params._id
      };
  
      await surveyData.updateMany(query, { $set: req.body }).exec((err, surveyData) => {
        if (err) {
          next(err);
        } else {
          res.send(surveyData);
        }
      })
    } catch (err) {
      next(err.reason);
    }
  }
  