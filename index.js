const { fetchMyIP , fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss')

fetchMyIP((error, ip) => {
  if (error) {
    console.log('It didn\'t work', error);
    return;
  }
  console.log('it worked!', ip);
  return;
})

const ipCallback = function(error, data) {
  if (error) {
    console.log(`Seems like there is an issue with your coords! `, error);
    return;
  }
  console.log(`Have some coords: `, data);
};

const fetchCallback = function(error, data) {
  if (error) {
    console.log(`spooky error!`, error);
    return;
  }
  console.log(`heres a list of some times the ISS will fly over your location:`, data);
};


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  return fetchMyIP
  
});

// fetchCoordsByIP('174.119.18.185', ipCallback);
// fetchISSFlyOverTimes({ latitude: 42.7779, longitude: -81.1769 }, fetchCallback);