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
            if (Game.spawns['Hospital1'].energy < 300 && Memory.creepCount < 8) {

                let res = creep.transfer(Game.spawns['Hospital1'], RESOURCE_ENERGY);
                creep.say('transfer:' + res);
                if (res == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns['Hospital1']);
                } else {
                    console.log('transfer result = ' + res);
                    //sss
                }
            } else {
                creep.say('upgrade');
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        } else {

            var sources = creep.room.find(FIND_SOURCES);
            let res = creep.harvest(sources[0])
            // creep.say('harvest:' + res);
            if (res == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            } else {
                console.log('harvest result = ' + res);
            }
        }

    }
}


module.exports = upgrader;