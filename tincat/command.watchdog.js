var util = require('./util');
var constants = require('./constants');
var system = require('./system');

function watchCreeps() {
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var mrhandys = _.filter(Game.creeps, (creep) => creep.memory.role == 'mrhandy');
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
    var footmen = _.filter(Game.creeps, (creep) => creep.memory.role == 'footman');
    var drillers = _.filter(Game.creeps, (creep) => creep.memory.role == 'driller');
    var lorries = _.filter(Game.creeps, (creep) => creep.memory.role == 'lorry');

    Memory.watch = {};
    // Memory.watch['workers'] = harvesters.length + upgraders.length + builders.length;
    Memory.watch['harvesters'] = harvesters.length;
    Memory.watch['upgraders'] = upgraders.length;
    Memory.watch['builders'] = builders.length;
    Memory.watch['repairers'] = repairers.length;
    Memory.watch['mrhandys'] = mrhandys.length;
    Memory.watch['claimers'] = claimers.length;
    Memory.watch['footmen'] = footmen.length;
    Memory.watch['drillers'] = drillers.length;
    Memory.watch['lorries'] = lorries.length;
    if (Game.time % 10 == 0) {
        console.log(JSON.stringify(Memory.watch));
        console.log('limits: ' + JSON.stringify(Memory.limits));
    }
}

function watchDefence() {
    var baseRoomNames = system.baseRoomNames();

    if (Game.time % 20 == 0) {
        baseRoomNames.forEach(element => {
            if (Game.rooms[element]) {
                var targets = Game.rooms[element].find(FIND_HOSTILE_CREEPS);
                if (targets.length > 0) {
                    Memory.peace = false;
                    console.log('hostile targets found : ' + targets.length);
                } else {
                    Memory.peace = true;
                }
                if (!Memory.peace) {
                    var log = Memory.log;
                    log.push(new Date() + ' ' + Game.time + ' hostile targets found : ' + targets.length);
                    Memory.log = log;
                }
            }
        });

    }
}

function correction() {
    for (var name in Memory.creeps) {
        if (Game.creeps[name]) {

        }
    }
}

var theWatchdog = {

    watchEverything: function () {
        watchCreeps();
        watchDefence();
    }
};

module.exports = theWatchdog;