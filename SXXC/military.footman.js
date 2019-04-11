
/**
 * A footman is the simplest military unit
 * body part need:           [TOUGH, ATTACK, MOVE]
 * energy cost:              140
 */

var militaryFootman = {
    cost: function (structureSpawn) {
        var totalSpawnEnergyCapacity = structureSpawn.memory['totalSpawnEnergyCapacity'];
        var cost = 140 * parseInt(totalSpawnEnergyCapacity / 140);
        return cost < 140 ? 140 : cost;
    },

    /** @param {StructureSpawn} structureSpawn **/
    spawnBiggestOne: function (structureSpawn) {
        var totalSpawnEnergyCapacity = structureSpawn.memory['totalSpawnEnergyCapacity'];
        var level = parseInt(totalSpawnEnergyCapacity / 140);
        level = level > 1 ? level : 1;
        var body = [];
        for (var i = 0; i < level; i++) {
            body.push(TOUGH);
            body.push(ATTACK);
            body.push(MOVE);
        }
        var newName = 'Footman_' + Game.time;
        structureSpawn.spawnCreep([TOUGH, ATTACK, MOVE], newName,
            { memory: { role: 'footman' } });
    },

    /** @param {StructureSpawn} structureSpawn **/
    spawnOne: function (structureSpawn) {
        var newName = 'Footman_' + Game.time;
        structureSpawn.spawnCreep([TOUGH, ATTACK, MOVE], newName,
            { memory: { role: 'footman' } });
    },

    /** @param {Creep} creep **/
    run: function (creep) {
        var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            if (creep.attack(closestHostile) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestHostile, { visualizePathStyle: { stroke: '#ffaaff' } });
            }
        }
    }
};

module.exports = militaryFootman;