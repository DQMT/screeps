var util = require('./util');
var constants = require('./constants');

function watchCreeps() {
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var mrhandys = _.filter(Game.creeps, (creep) => creep.memory.role == 'mrhandy');
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
    var footmen = _.filter(Game.creeps, (creep) => creep.memory.role == 'footman');


    Memory.watch = {};
    Memory.watch['workers'] = harvesters.length + upgraders.length + builders.length;
    Memory.watch['harvesters'] = harvesters.length;
    Memory.watch['upgraders'] = upgraders.length;
    Memory.watch['builders'] = builders.length;
    Memory.watch['repairers'] = repairers.length;
    Memory.watch['mrhandys'] = mrhandys.length;
    Memory.watch['claimers'] = claimers.length;
    Memory.watch['footmen'] = footmen.length;

    if (Game.time % 10 == 0) {
        console.log(JSON.stringify(Memory.watch));
        console.log('limits: ' + JSON.stringify(Memory.limits));
    }
}


var theWatchdog = {

    watchEverything: function () {
        watchCreeps();
    }
};

module.exports = theWatchdog;