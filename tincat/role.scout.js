var util = require('./util');
var constants = require('./constants');
var system = require('./system');

/**
 * A sout 
 * body part need: [ MOVE,ATTACK]
 */

var roleScout = {
    level: function () {
        return 1;
    },
    cost: function () {
        return 130;
    },
    body: function () {
        return [ATTACK, MOVE];
    },
    newName: function () {
        return 'Scout@' + this.level() + '_' + Game.time;
    },

    /** @param {Creep} creep */
    run: function (creep) {
        var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            if (creep.attack(closestHostile) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestHostile, { visualizePathStyle: { stroke: constants.STROKE_COLOR.ATTACK } });
            }
        } else {
            var roomName = creep.memory.roomName;
            creep.moveTo(roomName);
        }
    }
}
module.exports = roleScout;