var util = require('./util');
var constants = require('./constants');
var system = require('./system');

/**
 * A defender 
 * body part need: [TOUGH, MOVE, MOVE, MOVE, ATTACK, ATTACK]
 */

var roleDefender = {
    level: function () {
        return 1;
    },
    cost: function () {
        return 270;
    },
    body: function () {
        return [TOUGH, MOVE, MOVE, ATTACK, ATTACK];
    },
    newName: function () {
        return 'Defender@' + this.level() + '_' + Game.time;
    },

    /** @param {Creep} creep */
    run: function (creep) {
        var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            if (creep.attack(closestHostile) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestHostile, { visualizePathStyle: { stroke: constants.STROKE_COLOR.ATTACK } });
            }
        } else {
            var target = creep.pos.findClosestByRange(FIND_HOSTILE_SPAWNS);
            if (target) {
                if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: constants.STROKE_COLOR.ATTACK } });
                }
            } else {
                if (system.singleRoom()) {
                    util.walkAroundInRoom(creep);
                } else {
                    util.moveToAnotherRoom(creep);
                }
            }
        }
    },
    sign: function (creep) {
        creep.signController(creep.room.controller, util.signWords);
    }
}
module.exports = roleDefender;