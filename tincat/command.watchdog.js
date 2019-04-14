var util = require('./util');
var constants = require('./constants');

function watchCreeps() {
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var lorries = _.filter(Game.creeps, (creep) => creep.memory.role == 'lorry');
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
    var footmen = _.filter(Game.creeps, (creep) => creep.memory.role == 'footman');


    if (!Memory.watch) {
        Memory.watch = {};
    }
    Memory.watch['workers'] = harvesters.length + upgraders.length + builders.length;
    Memory.watch['harvesters'] = harvesters.length;
    Memory.watch['upgraders'] = upgraders.length;
    Memory.watch['builders'] = builders.length;
    Memory.watch['lorries'] = lorries.length;
    Memory.watch['claimers'] = claimers.length;
    Memory.watch['footmen'] = footmen.length;

    if (Game.time % 10 == 0) {
        console.log(JSON.stringify(Memory.watch));
        console.log('limits: ' + JSON.stringify(Memory.limits));
    }
}
var theWatchdog = {

    watch: function () {

    }
};

module.exports = theWatchdog;