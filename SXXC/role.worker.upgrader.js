var util = require('util');
var constants = require('constants');

/**
 * A upgrader continously harvest energy and pump energy to your controller
 * body part need: [WORK, CARRY, MOVE]
 */

function getEnergySources(creep) {
	var room = Game.rooms['W5S38'];
	if (!room) {
		room = Game.rooms['W5S37'];
	}
	var targets = room.find(FIND_SOURCES, {
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

			if (creep.upgradeController(Game.rooms['W5S37'].controller) == ERR_NOT_IN_RANGE) {
				creep.moveTo(Game.rooms['W5S37'].controller, { visualizePathStyle: { stroke: constants.STROKE_COLOR.UPGRADE } });
			}
		}
		else {
			var sources = getEnergySources(creep);
			var source = util.getHashedTarget(creep, sources);
			if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source, { visualizePathStyle: { stroke: constants.STROKE_COLOR.HARVEST } });
			}
		}
	}
};

module.exports = roleUpgrader;