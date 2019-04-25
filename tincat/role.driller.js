var constants = require('./constants');
var util = require('./util');
var system = require('./system');

/**
 * A driller
 * body part need: [WORK,WORK,CARRY, MOVE]
 * memory: {"source":[sourceId]}
 */

var roleDriller = {
    level: function () {
        return 1;
    },
    cost: function () {
        return 200 * this.level() + 100;
    },
    body: function () {
        var body = [];
        var level = this.level();
        for (var i = 0; i < level; i++) {
            body.push(WORK);
            body.push(WORK);
        }
        body.push(CARRY);
        body.push(MOVE);
        return body;
    },
    newName: function () {
        return 'Driller@' + this.level() + '_' + Game.time;
    },

    run: function (creep) {
        if (creep.memory.drilling && creep.carry.energy == 0) {
            creep.memory.drilling = false;
            creep.say('harvest');
        }
        if (!creep.memory.drilling && creep.carry.energy == creep.carryCapacity) {
            creep.memory.drilling = true;
            creep.say('drill');
        }
        if (creep.memory.drilling) {
            var source = Game.getObjectById(creep.memory.source);
            var container = source.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_CONTAINER && s.store['energy'] < s.storeCapacity)
            });
            if (container) {
                if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                }
            } else {
                // util.walkAroundInRoom(creep);
                // util.moveToRoom(creep, system.baseRoomNames()[0]);
                // console.log(creep.name + 'cannot find a structure!');
            }
        } else {
            var source = Game.getObjectById(creep.memory.source);
            if (!source) {
                util.moveToAnotherRoom(creep);
                return;
            }
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: constants.STROKE_COLOR.HARVEST } });
            }
        }
    }

}

module.exports = roleDriller;