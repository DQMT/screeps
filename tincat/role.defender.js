var util = require('./util');
var constants = require('./constants');
var system = require('./system');

/**
 * A defender 
 * body part need: [TOUCH, MOVE, MOVE, MOVE, ATTACK, ATTACK]
 */

var roleDefender = {
    level: function () {
        return 1;
    },
    cost: function () {
        return 320;
    },
    body: function () {
        return [TOUCH, MOVE, MOVE, MOVE, ATTACK, ATTACK];
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
        }else{
            if(system.singleRoom()){
                util.walkAroundInRoom(creep);
            }else{
                util.moveToAnotherRoom(creep);
            }
        }
    }
}
module.exports = roleDefender;