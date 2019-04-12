var util = require('util');
var constants = require('constants');

/**
 * A claimer continously pickup energy and transfer energy to your structures
 * body part need: [CARRY, MOVE, MOVE]
 */

var roleClaimer = {
    cost: function (structureSpawn) {
        return 650;
    },
    /** @param {Creep} creep */
    run: function (creep) {
        var target = Game.rooms['W4S37'].controller;
        if (target) {
            if (creep.reserveController(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        } else {
            creep.moveTo(49, 23);
        }

    },
    /** @param {StructureSpawn} structureSpawn **/
    spawnOne: function (structureSpawn) {
        var newName = 'Claimer' + Game.time;
        structureSpawn.spawnCreep([CLAIM, MOVE], newName,
            { memory: { role: 'claimer' } });

    },

}
module.exports = roleClaimer;