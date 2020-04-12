const caseBaseOnTime = (currentlyInfected, data) => {
  let cases;
  const duration = data.timeToElapse;
  if (data.periodType === 'days') {
    cases = currentlyInfected * (2 ** Math.floor(duration / 3));
  } else if (data.periodType === 'weeks') {
    const time = duration * 7;
    cases = currentlyInfected * (2 ** Math.floor(time / 3));
  } else if (data.periodType === 'months') {
    cases = currentlyInfected * (2 ** (duration * 10));
  }
  return Math.floor(cases);
};

const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  impact.currentlyInfected = Math.floor(data.reportedCases * 10);
  severeImpact.currentlyInfected = Math.floor(data.reportedCases * 50);

  // impact.infectionsByRequestedTime = Math.floor(impact.currentlyInfected * (2 ** (30 / 3)));
  // severeImpact.infectionsByRequestedTime = Math
  //   .floor(severeImpact.currentlyInfected * (2 ** (30 / 3)));

  impact.infectionsByRequestedTime = caseBaseOnTime(impact.currentlyInfected, data);
  severeImpact.infectionsByRequestedTime = caseBaseOnTime(severeImpact.currentlyInfected, data);

  return {
    data,
    impact,
    severeImpact
  };
};


export default covid19ImpactEstimator;
