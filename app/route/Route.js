
//#region Constants

const UserProfile = require('../controller/UserProfileController');
const UserAuthentication = require('../controller/UserAuthenticationController');
//#endregion

//#region Function

module.exports = function(app) {
   UserProfile(app);
   UserAuthentication(app);
};

//#endregion
