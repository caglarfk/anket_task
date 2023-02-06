import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import SurveyHappyStepper from "./components/SurveyHappyStepper";
import SurveyTeamStepper from "./components/SurveyTeamStepper";
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" caseSensitive={false} element={<Home />}/>
      <Route path="/happy" caseSensitive={true} element={<SurveyHappyStepper />}/>
      <Route path="/team" caseSensitive={true} element={<SurveyTeamStepper />}/>
    </Routes>
  </Router>

  );
}

export default App;
