const covid19ImpactEstimator = (data) => {
  let impact = {};
  let severeImpact = {};

  impact.currentlyInfected = Math.floor(data.reportedCases * 10);
  severeImpact.currentlyInfected = Math.floor(data.reportedCases * 50);

  //est no of infected by days
  impact.infectionsByRequestedTime = Math.floor(impact.currentlyInfected * Math.pow(2,10))
  severeImpact.infectionsByRequestedTime = Math.floor(severeImpact.currentlyInfected * Math.pow(2,10))

  return {
    data,
    impact,
    severeImpact
  };
};


export default covid19ImpactEstimator;
