var util = require('util');
var constants = require('constants');

/**
 * A harvester continously harvest energy and transfer energy to your structures
 * body part need: [WORK, CARRY, MOVE]
 */
var roleBuilder = {

	/** @param {Creep} creep **/
	run: function (creep) {

		if (creep.memory.building && creep.carry.energy == 0) {
			creep.memory.building = false;
			creep.say('harvest');
		}
		if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
			creep.memory.building = true;
			creep.say('build');
		}

		if (creep.memory.building) {

			var targets = creep.room.find(FIND_CONSTRUCTION_SITES)
			if (!target) {
				targets = Game.rooms['W5S38'].find(FIND_CONSTRUCTION_SITES);
			}

			if (targets.length) {
				var target = targets[0];
				// var target = util.getHashedTarget(creep,targets);
				util.resetFreeTicks(creep);
				if (creep.build(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target, { visualizePathStyle: { stroke: constants.STROKE_COLOR.BUILD } });
				}
			} else {
				targets = creep.room.find(FIND_STRUCTURES, {
					filter: object => (object.structureType != STRUCTURE_WALL && object.structureType != STRUCTURE_RAMPART && object.hits < object.hitsMax) || (object.structureType == STRUCTURE_WALL && object.hits < 10000)
						|| (object.structureType == STRUCTURE_RAMPART && object.hits < 10000)
				});
				targets.sort((a, b) => a.hits - b.hits);
				if (targets.length > 0) {
					util.resetFreeTicks(creep);
					if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
						creep.moveTo(targets[0], { visualizePathStyle: { stroke: constants.STROKE_COLOR.REPAIR } });
					}
				} else {
					console.log(creep.name + ' cannot find a structure to build or repair');
					util.increaseFreeTicks(creep);
					if (util.isFree(creep, 5)) {
						util.decreaseLimit('builders');
						if (Memory.fullUpgraders) {
							creep.say('I am dead now!');
							creep.suicide();
						} else {
							creep.say('I am upgrader now!');
							creep.memory.roleState = constants.WORKER_STATE.UPGRADE;
						}
					}
				}
			}
		}
		else {
			var source = util.getHashedTarget(creep, util.getEnergySources(creep));
			if (!source) {
				console.log(creep.name + ' cannot find a source');
				return;
			}
			util.resetFreeTicks(creep);
			if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source, { visualizePathStyle: { stroke: constants.STROKE_COLOR.HARVEST } });
			}
		}
	}
};

module.exports = roleBuilder;