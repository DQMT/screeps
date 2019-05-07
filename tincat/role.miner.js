var constants = require('./constants');
var util = require('./util');
var system = require('./system');

var roleMiner = {
    level: function () {
        return 1;
    },
    cost: function () {
        return 350 * this.level();
    },
    body: function () {
        var body = [];
        var level = this.level();
        for (var i = 0; i < level; i++) {
            body.push(WORK);
            body.push(WORK);
            body.push(CARRY);
            body.push(CARRY);
            body.push(MOVE);
        }
        return body;
    },
    newName: function () {
        return 'Miner@' + this.level() + '_' + Game.time;
    },

    run: function (creep) {
        if (creep.memory.transfering && !creep.carry.K) {
            creep.memory.transfering = false;
            creep.say('harvest');
        }
        if (!creep.memory.transfering && creep.carry.K == creep.carryCapacity) {
            creep.memory.transfering = true;
            creep.say('transfer');
        }
        if (creep.memory.transfering) {
            var container = creep.room.storage;
            for(var sourceType in creep.carry){
                if (creep.transfer(container, sourceType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                }
            }
        } else {
            var extractor = Game.getObjectById(creep.memory.extractor);
            if (creep.harvest(extractor) == ERR_NOT_IN_RANGE) {
                creep.moveTo(extractor, { visualizePathStyle: { stroke: constants.STROKE_COLOR.HARVEST } });
            }
        }
    }

}

module.exports = roleMiner;