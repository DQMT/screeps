var util = require('util');
var constants = require('constants');
var roleClaimer = require('role.claimer');
/**
 * The watchdog check system state and update report regularly.
 * 
 */
function watchColony(structureSpawn) {
    var colonies = ['W4S37', 'W5S38'];
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');

    if (!structureSpawn.spawning) {
        colonies.forEach(colony => {
            var need = false;
            var cla = _.filter(claimers, (creep) => creep.memory.roomName == colony);
            if (!cla || cla.length == 0) {
                need = true;
            } else {
                cla.sort((a, b) => b.ticksToLive - a.ticksToLive);
                if (cla[0].ticksToLive < 200) {
                    need = true;
                }
            }
            if (need) {
                var totalSpawnEnergy = structureSpawn.memory['totalSpawnEnergy'];
                // console.log('need more claimer!totalSpawnEnergy=' + totalSpawnEnergy);
                if (totalSpawnEnergy >= roleClaimer.cost()) {
                    console.log('spawn a new claimer');
                    roleClaimer.spawnOne(structureSpawn, colony);
                }
            }
        });
    }
}

function watchDefence(structureSpawn) {
    var targets = structureSpawn.room.find(FIND_HOSTILE_CREEPS);
    if (targets.length > 0 && Memory.peace) {
        Memory.peace = false;
        console.log('hostile targets found : ' + targets.length);
    } else {
        Memory.peace = true;
    }
    if (Game.time % 10 == 30) {
        if (!Memory.peace) {
            var log = Memory.log;
            log.push(new Date() + ' ' + Game.time + ' hostile targets found : ' + targets.length);
            Memory.log = log;
        }
    }
}

function watchCreeps() {
    var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
    var harvesters = _.filter(workers, (creep) => creep.memory.roleState == constants.WORKER_STATE.HARVEST);
    var upgraders = _.filter(workers, (creep) => creep.memory.roleState == constants.WORKER_STATE.UPGRADE);
    var builders = _.filter(workers, (creep) => creep.memory.roleState == constants.WORKER_STATE.BUILD);
    var footmen = _.filter(Game.creeps, (creep) => creep.memory.role == 'footman');
    var lorries = _.filter(Game.creeps, (creep) => creep.memory.role == 'lorry');
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');

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
    Memory.watch['claimers'] = claimers.length;

    if (Game.time % 10 == 0) {
        console.log(JSON.stringify(Memory.watch));
        console.log('limits: ' + JSON.stringify(Memory.limits));
        for (var s in Memory.spawns) {
            var spawn = Game.spawns[s];
            console.log(spawn.name + ' energyAvailable : ' + spawn.room.energyAvailable);
        }
        console.log('\n');
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