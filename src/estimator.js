const covid19ImpactEstimator = (data) => {
  let impact = {};
  let severeImpact = {};

  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;

  //est no of infected by days
  impact.infectionsByRequestedTime = impact.currentlyInfected * Math.pow(2,10)
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * Math.pow(2,10)
};


export default covid19ImpactEstimator;
