const request = require('request');

const fetchMyIP = function(callback) {
  request(`https://api.ipify.org?format=json`, function(error, response, body) {
    // if we get error run our callback
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code: ${response.statusCode} when fetching IP. Reponse: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, function(error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code: ${response.statusCode} when fetching IP. Reponse: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (body) {
      const data = JSON.parse(body);
      const coordinates = { "latitude": data.latitude,
                            "longitude": data.longitude};
      callback(null, coordinates);
      return;
    }

  });
};

const fetchISSFlyOverTimes = function(data, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${data.latitude}&lon=${data.longitude}`, function(error, response, body) {

    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code: ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    if (body) {
      response = JSON.parse(body).response;
      callback(null, response);
    }
  });
};

//  http://api.open-notify.org/iss/v1/?lat=40.027435&lon=-105.251945&alt=1650



module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };