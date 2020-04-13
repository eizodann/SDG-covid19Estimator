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

const moneyLost = (infectedByRequestedTime, data) => {
  const income = data.region.avgDailyIncomeInUSD;
  const populationRatio = data.region.avgDailyIncomePopulation;
  let dollarsInFlight;
  let multiplier;
  if (data.periodType === 'days') {
    multiplier = infectedByRequestedTime * populationRatio * income;
    dollarsInFlight = multiplier / data.timeToElapse;
  } else if (data.periodType === 'weeks') {
    const time = data.timeToElapse * 7;
    multiplier = infectedByRequestedTime * populationRatio * income;
    dollarsInFlight = multiplier / time;
  } else if (data.periodType === 'months') {
    const duration = data.timeToElapse * 30;
    multiplier = infectedByRequestedTime * populationRatio * income;
    dollarsInFlight = multiplier / duration;
  }

  return Math.floor(dollarsInFlight);
};

const availableBedsByRequestedTime = (severeCasesByRequestedTime, data) => {
  let availableBeds;

  const estAvailableBeds = 0.35 * data.totalHospitalBeds;
  if (estAvailableBeds < severeCasesByRequestedTime) {
    availableBeds = estAvailableBeds - severeCasesByRequestedTime;
  } else {
    availableBeds = estAvailableBeds;
  }
  return Math.floor(availableBeds);
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

  // those that require hospitalization
  impact.severeCasesByRequestedTime = Math.floor(0.15 * impact.infectionsByRequestedTime);
  const svr1 = severeImpact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = Math.floor(0.15 * svr1);

  // 35% totalHospitalBeds are estimated to be available
  const svr2 = impact.severeCasesByRequestedTime;
  impact.hospitalBedsByRequestedTime = availableBedsByRequestedTime(svr2, data);
  const impact1 = severeImpact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = availableBedsByRequestedTime(impact1, data);
  // 5% infectionsByRequestedTime are ICU cases
  impact.casesForICUByRequestedTime = Math.floor(0.05 * impact.infectionsByRequestedTime);
  const impact2 = severeImpact.infectionsByRequestedTime;
  severeImpact.casesForICUByRequestedTime = Math.floor(0.05 * impact2);
  // 2% infectionsByRequestedTime require ventilators
  impact.casesForVentilatorsByRequestedTime = Math.floor(0.02 * impact.infectionsByRequestedTime);
  const infct = severeImpact.infectionsByRequestedTime;
  severeImpact.casesForVentilatorsByRequestedTime = Math.floor(0.02 * infct);
  // amount of income lost due to illness
  impact.dollarsInFlight = moneyLost(impact.infectionsByRequestedTime, data);
  severeImpact.dollarsInFlight = moneyLost(severeImpact.infectionsByRequestedTime, data);

  return {
    data,
    impact,
    severeImpact
  };
};


export default covid19ImpactEstimator;
