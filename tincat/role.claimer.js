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
        return 650 * this.level();
    },
    body: function () {
        var body = [];
        var level = this.level();
        for (var i = 0; i < level; i++) {
            body.push(CLAIM);
        }
        for (var i = 0; i < level; i++) {
            body.push(MOVE);
        }
        return body;
    },
    newName: function () {
        return 'Claimer@' + this.level() + '_' + Game.time;
    },

    /** @param {Creep} creep */
    run: function (creep) {
        if (Game.rooms[creep.memory.roomName]) {
            var target = Game.rooms[creep.memory.roomName].controller;
            if (!target.my) {
                if (target.owner) {
                    if (creep.attackController(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: constants.CLAIM } });
                    }
                } else {
                    if (creep.reserveController(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: constants.CLAIM } });
                    }
                }
            }
        } else {
            var exitPoint = creep.memory.exitPoint;
            if (exitPoint) {
                creep.moveTo(exitPoint.x, exitPoint.y);
            } else {
                util.moveToRoom(creep, creep.memory.roomName);
            }
        }

    }
}
module.exports = roleClaimer;