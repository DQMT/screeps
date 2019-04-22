var roleScout = require('./role.scout');
var constants = require('./constants');
var util = require('./util');
var system = require('./system');



module.exports = {
    exeTempJpb: function () {


    },
    exeOnceOn: function () {
        Memory.job.once = true;
    },
    exeOnceOff: function () {
        Memory.job.once = false;
    },
    exeOnceJob: function () {
        if (Memory.job.once == true) {
            this.exeOnce();
        }
        this.exeOnceOff();
    },
    exeOnce() {
        system.removeColony('E48N38', ['5bbcafdc9099fc012e63b4ca', '5bbcafdc9099fc012e63b4c8']);
        system.addBase('E48N38', ['5bbcafdc9099fc012e63b4ca', '5bbcafdc9099fc012e63b4c8']);
    }
};