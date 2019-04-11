var util = require('util');
var constants = require('constants');
/**
 * The watchdog check system state and update report regularly.
 * 
 */

function watchCreeps() {
    var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
    var harvesters = _.filter(workers, (creep) => creep.memory.roleState == constants.WORKER_STATE.HARVEST);
    var upgraders = _.filter(workers, (creep) => creep.memory.roleState == constants.WORKER_STATE.UPGRADE);
    var builders = _.filter(workers, (creep) => creep.memory.roleState == constants.WORKER_STATE.BUILD);
    var footmen = _.filter(Game.creeps, (creep) => creep.memory.role == 'footman');

    if (upgraders.length > Memory.limits['upgraders'] + 2) {
        Memory.fullUpgraders = true;
    } else {
        Memory.fullUpgraders = false;
    }

    Memory.watch['workers'] = workers;
    Memory.watch['harvesters'] = harvesters;
    Memory.watch['upgraders'] = upgraders;
    Memory.watch['builders'] = builders;
    Memory.watch['footmen'] = footmen;

    if (Game.time % 10 == 0) {
        console.log('workers: ' + workers.length +
            ' harvesters: ' + harvesters.length +
            ' upgraders: ' + upgraders.length +
            ' builders: ' + builders.length +
            ' footmen: ' + footmen.length);
        console.log('limits: ' + JSON.stringify(Memory.limits));
    }
}

function watchSpawning(structureSpawn) {
    var totalSpawnEnergy = structureSpawn.engrgy;
    var totalSpawnEnergyCapacity = structureSpawn.energyCapacity;
    var extensions = structureSpawn.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_EXTENSION;
        }
    })
    extensions.array.forEach(element => {
        totalSpawnEnergy += element.energy;
        totalSpawnEnergyCapacity += element.energyCapacity;
    });
    structureSpawn.memory[keys.TOTAL_SPAWN_ENERGY] = totalSpawnEnergy;
    structureSpawn.memory[keys.TOTAL_SPAWN_ENERGY_CAPACITY] = totalSpawnEnergyCapacity;
}

var theWatchdog = {
    keys: {
        TOTAL_SPAWN_ENERGY: 'totalSpawnEnergy',
        TOTAL_SPAWN_ENERGY_CAPACITY: 'totalSpawnEnergyCapacity'
    },

    watch: function (structureSpawn) {
        watchCreeps();
        watchSpawning(structureSpawn);

    }
};

module.exports = theWatchdog;