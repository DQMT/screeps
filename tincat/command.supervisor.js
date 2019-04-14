var system = require('./system');
var roleHarvester = require('./role.harvester');
var roleUpgrader = require('./role.upgrader');
var roleBuilder = require('./role.builder');
var roleClaimer = require('./role.claimer');


var rolePlayer = {
    'harvester': roleHarvester
}

/**
 * The supervisor make sure every creep work correctly.
 */
var theSupervisor = {
    keep: function () {
        var bases = system.bases();
        var availableSources = system.availableSources();
        var availableSpawns = system.availableStructureSpawns();

        if (availableSpawns.length > 0 && availableSources.length > 0) {
            var structureSpawns;
            /**keep spawning upgrader */
            if (Memory.watch['harvester'] > 4 && Memory.peace && Memory.watch['upgraders'] < Memory.limits.upgraders) {
                structureSpawns = system.availableStructureSpawns(roleUpgrader.cost());
                if (structureSpawns.length > 0) {
                    if (OK == structureSpawns[0].spawnCreep(
                        roleUpgrader.body(),
                        roleUpgrader.newName(),
                        { memory: { role: 'upgrader', source: availableSources[0] } }
                    )) {
                        console.log('spawn a new upgrader to source: ' + availableSources[0] +
                            'from ' + structureSpawns[0]['id']);
                        system.bindSource(availableSources[0]);
                        return;
                    };
                }
            }

            /**keep spawning builder */
            if (Memory.watch['harvester'] > 4 && Memory.peace && Memory.watch['builders'] < Memory.limits.builders) {
                structureSpawns = system.availableStructureSpawns(roleBuilder.cost());
                if (structureSpawns.length > 0) {
                    if (OK == structureSpawns[0].spawnCreep(
                        roleBuilder.body(),
                        roleBuilder.newName(),
                        { memory: { role: 'builder' } }
                    )) {
                        console.log('spawn a new builder from ' + structureSpawns[0]['id']);
                        // system.bindSource(availableSources[0]);
                        return;
                    };
                }
            }

            /** keep spawning harvester */
            structureSpawns = system.availableStructureSpawns(roleHarvester.cost());
            if (structureSpawns.length > 0) {
                if (OK == structureSpawns[0].spawnCreep(
                    roleHarvester.body(),
                    roleHarvester.newName(),
                    { memory: { role: 'harvester', source: availableSources[0] } }
                )) {
                    console.log('spawn a new harvester to source: ' + availableSources[0] +
                        'from ' + structureSpawns[0]['id']);
                    system.bindSource(availableSources[0]);
                    return;
                };
            }

            /** keep spawning claimer*/
            structureSpawns = system.availableStructureSpawns(roleClaimer.cost());
            if (structureSpawns.length > 0) {
                var colonies = system.colonyRoomNames();
                var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
                colonies.forEach(colony => {
                    var need = false;
                    var cla = _.filter(claimers, (creep) => creep.memory.roomName == colony);
                    if (!cla || cla.length == 0) {
                        need = true;
                    } else {
                        cla.sort((a, b) => b.ticksToLive - a.ticksToLive);
                        if (cla[0].ticksToLive < 200) {
                            need = true;
                        }
                    }
                    if (need) {
                        if (OK == structureSpawns[0].spawnCreep(
                            roleClaimer.body(),
                            roleClaimer.newName(),
                            { memory: { role: 'claimer', roomName: colony } }
                        )) {
                            console.log('spawn a new claimer to room: ' + colony +
                                'from ' + structureSpawns[0]['id']);
                            return;
                        };
                    }
                });
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