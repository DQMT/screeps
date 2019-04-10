
/**
 * A footman is the simplest military unit
 * body part need:           [TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE]
 * energy cost:              280
 */

var militaryFootman = {
    cost: 280,

    /** @param {StructureSpawn} structureSpawn **/
    spawnOne: function (structureSpawn) {
        var newName = 'Footman_' + Game.time;
        structureSpawn.spawnCreep([TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE], newName,
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