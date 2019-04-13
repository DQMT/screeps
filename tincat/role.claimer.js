var util = require('util');
var constants = require('constants');

/**
 * A claimer 
 * body part need: [CARRY, MOVE]
 */

var roleClaimer = {
    cost: function (structureSpawn) {
        return 650;
    },
    /** @param {Creep} creep */
    run: function (creep) {
        if (Game.rooms[creep.memory.roomName]) {
            var target = Game.rooms[creep.memory.roomName].controller;
            if (creep.reserveController(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        } else {
            var exit = creep.room.findExitTo(creep.memory.roomName);
            creep.moveTo(creep.pos.findClosestByRange(exit));
            // if(creep.memory.roomName=='W4S37'){
            //     creep.moveTo(49, 23);
            // }
            // if(creep.memory.roomName=='W5S38'){
            //     creep.moveTo(25, 49);
            // }
        }

    },
    /** @param {StructureSpawn} structureSpawn **/
    spawnOne: function (structureSpawn, roomName) {
        var newName = 'Claimer' + Game.time;
        structureSpawn.spawnCreep([CLAIM, MOVE], newName,
            { memory: { role: 'claimer', roomName: roomName } });

    },

}
module.exports = roleClaimer;