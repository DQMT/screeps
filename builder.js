var constants = require('./constants');

var builder = {
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
            var structure = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
            if (structure) {
                if (creep.build(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure, { visualizePathStyle: { stroke: constants.STROKE_COLOR.BUILD } });
                }
            }
        }
        if (!creep.memory.building) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            let res = creep.harvest(source)
            if (res == ERR_NOT_IN_RANGE) {
               let mres =  creep.moveTo(source);
               console.log('builder mres='+mres);
            } else if (res !== OK) {
                console.log('builder harvest result = ' + res);
                console.log(source);
            }
        }

    }
}


module.exports = builder;