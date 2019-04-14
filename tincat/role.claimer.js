var util = require('util');
var constants = require('constants');

/**
 * A claimer 
 * body part need: [CLAIM, MOVE]
 */

var roleClaimer = {
    level: function () {
        return 1;
    },
    cost: function () {
        return 650;
    },
    body: function () {
        return [CLAIM, MOVE];
    },
    newName: function () {
        return 'Claimer@' + this.level() + '_' + Game.time;
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
        }

    }
}
module.exports = roleClaimer;