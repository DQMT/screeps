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
    var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');
    var drillers = _.filter(Game.creeps, (creep) => creep.memory.role == 'driller');
    var lorries = _.filter(Game.creeps, (creep) => creep.memory.role == 'lorry');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');

    Memory.watch = {};
    // Memory.watch['workers'] = harvesters.length + upgraders.length + builders.length;
    Memory.watch['harvesters'] = harvesters.length;
    Memory.watch['upgraders'] = upgraders.length;
    Memory.watch['builders'] = builders.length;
    Memory.watch['repairers'] = repairers.length;
    Memory.watch['mrhandys'] = mrhandys.length;
    Memory.watch['claimers'] = claimers.length;
    Memory.watch['scouts'] = scouts.length;
    Memory.watch['drillers'] = drillers.length;
    Memory.watch['lorries'] = lorries.length;
    Memory.watch['miners'] = miners.length;
    
    if (Game.time % 10 == 0) {
        console.log(JSON.stringify(Memory.watch));
        console.log('limits: ' + JSON.stringify(Memory.limits));
    }
}

function watchDefence() {
    var baseRoomNames = system.baseRoomNames();
    var pstate = Memory.peace;
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
                if (pstate && !Memory.peace) {
                    var log = Memory.log;
                    log.push(new Date() + ' ' + Game.time + ' hostile targets found : ' + targets.length);
                    Memory.log = log;
                }
                if (!pstate && Memory.peace) {
                    var log = Memory.log;
                    log.push(new Date() + ' ' + Game.time + ' return to peace ');
                    Memory.log = log;
                }
            }
        });

    }
}

function correction() {
    var sources = Memory.system.sources;
    var c = {};
    for (var name in Memory.creeps) {
        if (Game.creeps[name]) {
            var s = Game.creeps[name].memory.source;
            if (s) {
                if (c[s]) {
                    c[s] = c[s] + 1;
                } else {
                    c[s] = 1;
                }
            }
        }
    }
    sources.forEach(source=>{
        if(c[source.id]){
            source.binds = c[source.id];
        }else{
            source.binds = 0;
        }
    });
    // console.log('sources'+JSON.stringify(sources));
    Memory.system.sources = sources;
}

var theWatchdog = {

    watchEverything: function () {
        correction();
        watchCreeps();
        watchDefence();
    }
};

module.exports = theWatchdog;