var util = require('util');
/**
 * A upgrader continously harvest energy and pump energy to your controller
 * body part need: [WORK, CARRY, MOVE]
 */

function getEnergySources(creep) {
    var targets = creep.room.find(FIND_SOURCES, {
        filter: (source) => {
            return source.energy > 0;
        }
    });
    return targets;
}

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.upgrading && creep.carry.energy == 0) {
			creep.memory.upgrading = false;
			creep.say('harvest');
		}
		if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
			creep.memory.upgrading = true;
			creep.say('upgrade');
		}

		if (creep.memory.upgrading) {
			if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
		}
		else {
			var sources = getEnergySources(creep);
			var source = util.getHashedTarget(creep, sources);
			if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
			}
        }
    }
};

module.exports = roleUpgrader;