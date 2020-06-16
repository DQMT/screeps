var upgrader = {
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

            // creep.say('upgrade');
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }

        } else {

            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            let res = creep.harvest(source)
            // creep.say('harvest:' + res);
            if (res == ERR_NOT_IN_RANGE) {
                let mres = creep.moveTo(source);
                console.log('upgrader mres=' + mres);
            } else if (res !== OK) {
                console.log('upgrader harvest result = ' + res);
            }
        }

    }
}


module.exports = upgrader;