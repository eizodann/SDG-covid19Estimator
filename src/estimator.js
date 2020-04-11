const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  impact.currentlyInfected = Math.floor(data.reportedCases * 10);
  severeImpact.currentlyInfected = Math.floor(data.reportedCases * 50);

//   est no of infected by days
  impact.infectionsByRequestedTime = Math.floor(impact.currentlyInfected * (2**10));
  severeImpact.infectionsByRequestedTime = Math.floor(severeImpact.currentlyInfected * (2**10));

  return {
    data,
    impact,
    severeImpact
  };
};


export default covid19ImpactEstimator;
