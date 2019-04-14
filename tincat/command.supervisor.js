var system = require('./system');
var roleHarvester = require('./role.harvester');


var rolePlayer = {
    'harvester': roleHarvester
}

/**
 * The supervisor make sure every creep work correctly.
 */
var theSupervisor = {
    keep: function () {
        var bases = system.bases();

        /** keep harvesting */
        var availableSources = system.availableSources();
        if (availableSources.length > 0) {
            var structureSpawns = system.availableStructureSpawns(roleHarvester.cost());
            if (structureSpawns.length > 0) {
                if (OK == structureSpawns[0].spawnCreep(
                    roleHarvester.body(),
                    roleHarvester.newName(),
                    { memory: { role: 'harvester', source: availableSources[0] } }
                )) {
                    console.log('spawn a new harvester to ' + availableSources[0] +
                        'from ' + structureSpawns[0]['id']);
                    system.bindSource(availableSources[0]);
                };
            }
        }
    },
    urge: function () {
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            rolePlayer[creep.memory.role].run(creep);
        }
    }

};


module.exports = theSupervisor;