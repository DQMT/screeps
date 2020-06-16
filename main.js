var roleUpgrader = require('./upgrader');
var roleCharger = require('./charger');
var roleBuilder = require('./builder');
const myConsole = require('./console');
const builder = require('./builder');

module.exports.loop = function () {
    let upgraderCount = 0;
    let builderCount = 0;
    let chargerCount = 0;
    for (const i in Game.creeps) {
        if (i.startsWith("Upgrader") || i.startsWith("Worker")) {
            roleUpgrader.run(Game.creeps[i]);
            upgraderCount++;
        } else if (i.startsWith("Builder")) {
            roleBuilder.run(Game.creeps[i]);
            builderCount++;
        } else if (i.startsWith("Charger")) {
            roleCharger.run(Game.creeps[i]);
            chargerCount++;
        }
    }


    Memory.upgraderCount = upgraderCount;
    Memory.builderCount = builderCount;
    Memory.chargerCount = chargerCount;
    myConsole.clear();

    myConsole.append('we have ' + Memory.upgraderCount + ' upgraders ' + Memory.builderCount + ' builders ' + Memory.chargerCount + ' chargers!');
    //Builder 
    let sites = Game.spawns['Hospital1'].room.find(FIND_MY_CONSTRUCTION_SITES);
    if (sites && sites.length && builderCount < 3) {
        console.log('we have ' + sites.length + ' sites to build');
        myConsole.append('spawn builder=' + Game.spawns['Hospital1'].spawnCreep([WORK, CARRY, CARRY, MOVE], 'Builder' + Game.time));
        // console.log("building a builder!");
    } else {
        var structure = Game.spawns['Hospital1'].pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_EXTENSION
                || s.structureType == STRUCTURE_TOWER)
                && s.energy < s.energyCapacity
        });
        if (structure && chargerCount < 3) {
            //Charger
            myConsole.append('spawn charger=' + Game.spawns['Hospital1'].spawnCreep([WORK, CARRY, CARRY, MOVE], 'Charger' + Game.time));
        } else {
            if (upgraderCount < 8) {
                //Upgrader
                myConsole.append('spawn upgrader=' + Game.spawns['Hospital1'].spawnCreep([WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE], 'Upgrader' + Game.time));
            }
        }
    }
    myConsole.log();
    for (const i in Game.creeps) {
        if (i.startsWith("Upgrader") || i.startsWith("Worker")) {
            roleUpgrader.run(Game.creeps[i]);
        } else if (i.startsWith("Builder")) {
            roleBuilder.run(Game.creeps[i]);
        } else if (i.startsWith("Charger")) {
            roleCharger.run(Game.creeps[i]);
        }
    }

}