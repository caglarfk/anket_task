import { Schema, model } from 'mongoose';
const surveyDataSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  birthdate: {
    type: String,
    required: true
  }, 
  happy: {
    type: Number,
    required: true
  },

  team: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
   pollster
  : {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  createdAt: Date,
 
  
});
export default model('surveyData', surveyDataSchema);