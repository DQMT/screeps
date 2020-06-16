var charger = {
    run: function (creep) {
        if (creep.memory.charging && creep.carry.energy == 0) {
            creep.memory.charging = false;
            creep.say('harvest');
        }
        if (!creep.memory.charging && creep.carry.energy == creep.carryCapacity) {
            creep.memory.charging = true;
            creep.say('charge');
        }
        if (creep.memory.charging) {
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                    || s.structureType == STRUCTURE_EXTENSION
                    || s.structureType == STRUCTURE_TOWER)
                    && s.energy < s.energyCapacity
            });
            if (structure) {
                var res = creep.transfer(structure, RESOURCE_ENERGY);
                if (res == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                } else if (res !== OK) {
                    console.log('charger transfer result = ' + res);
                }
            } else {
                // creep.say('upgrade');
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        } else {

            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            let res = creep.harvest(source)
            // creep.say('harvest:' + res);
            if (res == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            } else if (res !== OK) {
                console.log('charger harvest result = ' + res);
            }
        }

    }
}

module.exports = charger;