const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  impact.currentlyInfected = Math.floor(data.reportedCases * 10);
  severeImpact.currentlyInfected = Math.floor(data.reportedCases * 50);

  if (data.periodType === ('days' || 'months')) {
    impact.infectionsByRequestedTime = Math.floor(impact.currentlyInfected * (2 ** (30 / 3)));
    severeImpact.infectionsByRequestedTime = Math
      .floor(severeImpact.currentlyInfected * (2 ** (30 / 3)));
  } else if (data.periodType === 'weeks') {
    impact.infectionsByRequestedTime = Math.floor(impact.currentlyInfected * (2 ** (30 / (7 * 3))));
    severeImpact.infectionsByRequestedTime = Math
      .floor(severeImpact.currentlyInfected * (2 ** (30 / 3)));
  }

  return {
    data,
    impact,
    severeImpact
  };
};


export default covid19ImpactEstimator;
