var util = require('util');
var constants = require('constants');
var roleClaimer = require('role.claimer');
/**
 * The watchdog check system state and update report regularly.
 * 
 */
function watchColony(structureSpawn) {
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
    var need = false;
    if (!structureSpawn.spawning) {
        if (!claimers || claimers.length == 0) {
            need = true;
        } else {
            if (claimers.length == 1 && claimers[0].ticksToLive < 200) {
                need = true;
            }
        }
        if (need) {
            var totalSpawnEnergyCapacity = structureSpawn.memory['totalSpawnEnergyCapacity'];
            if (totalSpawnEnergyCapacity >= roleClaimer.cost()) {
                console.log('spawn a new claimer: ');
                roleClaimer.spawnOne(structureSpawn);
            }
        }

    }
}

function watchDefence(structureSpawn) {
    var targets = structureSpawn.room.find(FIND_HOSTILE_CREEPS);
    if (targets.length > 0) {
        Memory.peace = false;
        console.log('hostile targets found : ' + targets.length);
    } else {
        Memory.peace = true;
    }
}

function watchCreeps() {
    var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
    var harvesters = _.filter(workers, (creep) => creep.memory.roleState == constants.WORKER_STATE.HARVEST);
    var upgraders = _.filter(workers, (creep) => creep.memory.roleState == constants.WORKER_STATE.UPGRADE);
    var builders = _.filter(workers, (creep) => creep.memory.roleState == constants.WORKER_STATE.BUILD);
    var footmen = _.filter(Game.creeps, (creep) => creep.memory.role == 'footman');
    var lorries = _.filter(Game.creeps, (creep) => creep.memory.role == 'lorry');

    if (upgraders.length > Memory.limits['upgraders'] * 2) {
        Memory.fullUpgraders = true;
    } else {
        Memory.fullUpgraders = false;
    }
    if (!Memory.watch) {
        Memory.watch = {};
    }
    Memory.watch['workers'] = workers.length;
    Memory.watch['harvesters'] = harvesters.length;
    Memory.watch['upgraders'] = upgraders.length;
    Memory.watch['builders'] = builders.length;
    Memory.watch['footmen'] = footmen.length;
    Memory.watch['lorries'] = lorries.length;

    if (Game.time % 10 == 0) {
        console.log('workers: ' + workers.length +
            ' harvesters: ' + harvesters.length +
            ' upgraders: ' + upgraders.length +
            ' builders: ' + builders.length +
            ' footmen: ' + footmen.length +
            ' lorries: ' + lorries.length);
        console.log('limits: ' + JSON.stringify(Memory.limits));
    }
}

function watchSpawning(structureSpawn) {
    var totalSpawnEnergy = structureSpawn.energy;
    var totalSpawnEnergyCapacity = structureSpawn.energyCapacity;
    var extensions = structureSpawn.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_EXTENSION;
        }
    })
    for (var i = 0; i < extensions.length; i++) {
        totalSpawnEnergy += extensions[i].energy;
        totalSpawnEnergyCapacity += extensions[i].energyCapacity;
    }
    structureSpawn.memory['totalSpawnEnergy'] = totalSpawnEnergy;
    structureSpawn.memory['totalSpawnEnergyCapacity'] = totalSpawnEnergyCapacity;
}

var theWatchdog = {

    watch: function (structureSpawn) {
        watchCreeps();
        if (structureSpawn) {
            watchColony(structureSpawn);
            watchDefence(structureSpawn);
            watchSpawning(structureSpawn);
        } else {
            _.filter(Game.spawns, (spawn) => {
                watchColony(spawn);
                watchDefence(spawn);
                watchSpawning(spawn);
            });
        }
    }
};

module.exports = theWatchdog;