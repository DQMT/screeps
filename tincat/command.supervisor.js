var system = require('./system');
var roleHarvester = require('./role.harvester');
var roleUpgrader = require('./role.upgrader');
var roleBuilder = require('./role.builder');
var roleClaimer = require('./role.claimer');
var roleMrhandy = require('./role.mrhandy');
var roleRepairer = require('./role.repairer');
var roleLorry = require('./role.lorry');
var roleDriller = require('./role.driller');
var roleDefender = require('./role.defender');
var roleScout = require('./role.scout');
var roleMiner = require('./role.miner');

var rolePlayer = {
    'harvester': roleHarvester,
    'upgrader': roleUpgrader,
    'builder': roleBuilder,
    'claimer': roleClaimer,
    'mrhandy': roleMrhandy,
    'repairer': roleRepairer,
    'driller': roleDriller,
    'lorry': roleLorry,
    'scout': roleScout,
    'defender': roleDefender,
    'miner': roleMiner
}

/**
 * The supervisor make sure every creep work correctly.
 */
var theSupervisor = {
    keepSpawning: function (spawnHarvesters) {
        var availableSources = system.availableSources();
        var availableSpawns = system.availableStructureSpawns();

        if (availableSpawns.length > 0) {
            if (availableSources.length > 0) {
                var structureSpawns;
                if (spawnHarvesters) {
                    /** keep spawning harvester */
                    if (Memory.watch['harvesters'] < Memory.limits.harvesters) {
                        structureSpawns = system.availableStructureSpawns(roleHarvester.cost());
                        if (structureSpawns.length > 0) {
                            if (OK == structureSpawns[0].spawnCreep(
                                roleHarvester.body(),
                                roleHarvester.newName(),
                                { memory: { role: 'harvester', source: availableSources[0], bindSource: availableSources[0] } }
                            )) {
                                console.log('spawn a new harvester to source: ' + availableSources[0] +
                                    ' from ' + structureSpawns[0]['id']);
                                system.bindSource(availableSources[0]);
                                return;
                            };
                        }
                    }
                }

            }

            /**keep spawning builder */
            if (roleHarvester.enough() && Memory.peace && Memory.watch['builders'] < Memory.limits.builders) {
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

            if (!spawnHarvesters) {
                /**keep building driller */
                var sids = system.allSourceIds();
                for (var i = 0; i < sids.length; i++) {
                    if (system.needDrill(sids[i])) {
                        var structureSpawns = system.availableStructureSpawns(roleDriller.cost());
                        if (structureSpawns.length > 0) {
                            var source = Game.getObjectById(sids[i]);
                            var closestContainer = source.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                                filter: (s) => (s.structureType == STRUCTURE_CONTAINER)
                            });
                            if (!closestContainer) {
                                if (Memory.watch['drillers'] < sids.length) {
                                    closestContainer = source.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                                        filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                            || s.structureType == STRUCTURE_EXTENSION
                                            || s.structureType == STRUCTURE_TOWER)
                                            && s.energy < s.energyCapacity
                                    });
                                }
                            }
                            if (closestContainer && OK == structureSpawns[0].spawnCreep(
                                roleDriller.body(),
                                roleDriller.newName(),
                                { memory: { role: 'driller', source: sids[i], container: closestContainer.id } }
                            )) {
                                console.log('spawn a new driller to source: ' + sids[i] +
                                    ' from ' + structureSpawns[0]['id']);
                                system.bindDriller(sids[i]);
                                return;
                            };
                        }
                    }
                }

                /**keep building lorry */
                var sids = system.allSourceIds();
                for (var i = 0; i < sids.length; i++) {
                    if (system.needLorry(sids[i])) {
                        var structureSpawns = system.availableStructureSpawns(roleLorry.cost());
                        if (structureSpawns.length > 0) {
                            var source = Game.getObjectById(sids[i]);
                            var closestContainer = source.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                                filter: (s) => (s.structureType == STRUCTURE_CONTAINER)
                            });
                            if (closestContainer && OK == structureSpawns[0].spawnCreep(
                                roleLorry.body(),
                                roleLorry.newName(),
                                { memory: { role: 'lorry', source: sids[i], container: closestContainer.id } }
                            )) {
                                console.log('spawn a new lorry to source: ' + sids[i] +
                                    ' from ' + structureSpawns[0]['id']);
                                system.bindLorry(sids[i]);
                                return;
                            };
                        }
                    }
                }
            }

            /**keep spawning upgrader */
            if (roleHarvester.enough() && Memory.peace && Memory.watch['upgraders'] < Memory.limits.upgraders) {
                structureSpawns = system.availableStructureSpawns(roleUpgrader.cost());
                if (structureSpawns.length > 0) {
                    var thisSource = structureSpawns[0].room.controller.pos.findClosestByPath(FIND_SOURCES);
                    if (thisSource
                        //  && util.findIndexInArray(availableSources, thisSource) != -1
                    ) {
                        if (OK == structureSpawns[0].spawnCreep(
                            roleUpgrader.body(),
                            roleUpgrader.newName(),
                            { memory: { role: 'upgrader', source: thisSource.id, bindSource: thisSource.id } }
                        )) {
                            console.log('spawn a new upgrader to source: ' + thisSource.id +
                                ' from ' + structureSpawns[0]['id']);
                            system.bindSource(thisSource.id);
                            return;
                        };
                    }
                }
            }

            /**keep spawning repairer */
            if (roleHarvester.enough() && Memory.peace && Memory.watch['repairers'] < Memory.limits.repairers) {
                structureSpawns = system.availableStructureSpawns(roleRepairer.cost());
                if (structureSpawns.length > 0) {
                    if (OK == structureSpawns[0].spawnCreep(
                        roleRepairer.body(),
                        roleRepairer.newName(),
                        { memory: { role: 'repairer' } }
                    )) {
                        console.log('spawn a new repairer from ' + structureSpawns[0]['id']);
                        // system.bindSource(availableSources[0]);
                        return;
                    };
                }
            }


            /** keep spawning claimer*/
            structureSpawns = system.availableStructureSpawns(roleClaimer.cost());
            if (structureSpawns.length > 0) {
                var colonies = [];
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
                            { memory: { role: 'claimer', roomName: colony, exitPoint: { x: 49, y: 17 } } }
                        )) {
                            console.log('spawn a new claimer to room: ' + colony +
                                ' from ' + structureSpawns[0]['id']);
                            return;
                        };
                    }
                });
            }

            /** keep spawning mrhandy */
            if (Memory.watch['mrhandys'] < Memory.limits.mrhandys) {
                structureSpawns = system.availableStructureSpawns(roleMrhandy.cost());
                if (structureSpawns.length > 0) {
                    if (OK == structureSpawns[0].spawnCreep(
                        roleMrhandy.body(),
                        roleMrhandy.newName(),
                        { memory: { role: 'mrhandy' } }
                    )) {
                        console.log('spawn a new mrhandy from ' + structureSpawns[0]['id']);
                        return;
                    };
                }
            }

            // keep spawning miners
            if (Memory.watch['miners'] < Memory.limits.miners) {
                structureSpawns = system.availableStructureSpawns(roleMiner.cost());
                if (structureSpawns.length > 0) {
                    if (OK == structureSpawns[0].spawnCreep(
                        roleMiner.body(),
                        roleMiner.newName(),
                        { memory: { role: 'miner', extractor: '5bbcb695d867df5e542079c8', } }
                    )) {
                        console.log('spawn a new miner from ' + structureSpawns[0]['id']);
                        return;
                    };
                }
            }
        }
    },
    urge: function () {
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.memory.busy) {
                // console.log('creep ' + creep.id + ' is busy');
                continue;
            }
            if (rolePlayer[creep.memory.role]) {
                rolePlayer[creep.memory.role].run(creep);
            } else {
                console.log(creep.name + JSON.stringify(creep)+' role=' + creep.memory.role + ' does not have a player!');
            }

        }
    },
    keepTower: function () {
        var bases = system.baseRoomNames();
        bases.forEach(b => {
            var towers = Game.rooms[b].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_TOWER
                    );
                }
            });
            if (towers.length) {
                for (var i = 0; i < towers.length; i++) {
                    var tower = towers[i];
                    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                    if (closestHostile) {
                        tower.attack(closestHostile);
                        continue;
                    }
                    // var damagedStructures = tower.room.find(FIND_STRUCTURES, {
                    //     filter: object => (object.hits < object.hitsMax)
                    // });
                    if (tower.energy < tower.energyCapacity * 0.5) {
                        continue;
                    }
                    var damagedStructures = tower.room.find(FIND_STRUCTURES, {
                        filter: object => (object.structureType != STRUCTURE_WALL && object.hits < object.hitsMax)
                            || (object.structureType == STRUCTURE_WALL && object.hits < 10000000)

                    });
                    damagedStructures.sort((a, b) => a.hits - b.hits);
                    if (damagedStructures.length > 0) {
                        tower.repair(damagedStructures[0]);
                    }
                }
            }
        });
    },

    keepDefence: function () {
        var bases = system.baseRoomNames();
        bases.forEach(b => {
            var sps = Game.rooms[b].find(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN)
            });
            sps.forEach(structureSpawn => {
                if (structureSpawn.hits < structureSpawn.hitsMax * 0.8) {
                    structureSpawn.room.controller.activateSafeMode();
                }
                if (Memory.peace == false && structureSpawn.room.energyAvailable >= roleDefender.cost()) {
                    if (OK == structureSpawn.spawnCreep(
                        roleDefender.body(),
                        roleDefender.newName(),
                        { memory: { role: 'defender' } }
                    )) {
                        console.log('spawn a new defender from ' + structureSpawn['id']);
                        return;
                    };
                }
            });
        })
    }

};


module.exports = theSupervisor;