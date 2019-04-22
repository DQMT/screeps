var roleScout = require('./role.scout');
var constants = require('./constants');
var util = require('./util');
var system = require('./system');

module.exports = {
    exeTempJpb: function () {
        
        system.removeColony('E48N38',['5bbcafdc9099fc012e63b4ca','5bbcafdc9099fc012e63b4c8']);
        system.addBase('E48N38',['5bbcafdc9099fc012e63b4ca','5bbcafdc9099fc012e63b4c8']);
    }
};