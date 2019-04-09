var roleHarvester = require('../role/harvester');
var roleUpgrader = require('../role/upgrader');
var roleBuilder = require('../role/builder');

/**
 * The supervisor make sure every creep work correctly.
 */
var theSupervisor = {

    /** @param {Creep} creep **/
    urge: function(creep) {
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
};


module.exports = theSupervisor;