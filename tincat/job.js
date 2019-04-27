var roleScout = require('./role.scout');
var constants = require('./constants');
var util = require('./util');
var system = require('./system');



module.exports = {
    exeTempJpb: function () {
        var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
        defenders.forEach(d => {
            d.memory.busy = true;
            d.moveTo(new RoomPosition(36, 3, 'E47N36'));
        });
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
        // system.removeColony('E48N38', ['5bbcafdc9099fc012e63b4ca', '5bbcafdc9099fc012e63b4c8']);
        // system.addBase('E48N38', ['5bbcafdc9099fc012e63b4ca', '5bbcafdc9099fc012e63b4c8']);
    }
};