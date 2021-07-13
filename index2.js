const { nextISSTimesForMyLocation } = require("./iss_promised")

const printPassTimes = function(flyOver) {
  for (const fly of flyOver) {
    const dateOfFlight = new Date(0);
    dateOfFlight.setUTCSeconds(fly.risetime);
    const duration = fly.duration;
    console.log(`Next pass at ${dateOfFlight} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("error: ", error.message)
  })