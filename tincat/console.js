Game.spawns['shaxianxiaochi'].spawnCreep([WORK, CARRY, MOVE], 'Builder1', { memory: { role: 'builder' } });


Game.spawns['shaxianxiaochi'].spawnCreep([WORK, CARRY, MOVE], 'Harvester1', { memory: { role: 'harvester' } });


Game.spawns['shaxianxiaochi'].spawnCreep([WORK, CARRY, MOVE], 'Upgrader1', { memory: { role: 'upgrader' } });

if (creep.name == 'Worker_5841201') {
    if (creep.signController(creep.room.controller, "Fools die… as you well know.") == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
        return;
    }
}


Game.spawns['shaxianxiaochi'].spawnCreep([ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE], 'dadi', { memory: { role: 'attacker' } });

var creep = Game.creeps['dadi'];
var hos = creep.room.find(FIND_HOSTILE_SPAWNS);
var closestHostile = hos[0];
console.log(closestHostile);
if (creep.attack(closestHostile) == ERR_NOT_IN_RANGE) {
    creep.moveTo(closestHostile, { visualizePathStyle: { stroke: '#ffaaff' } });
}

Game.spawns['shaxianxiaochi'].spawnCreep([ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE], 'dadi', { memory: { role: 'attacker' } });
var creep = Game.creeps['cla'];
var target = creep.room.controller;
if (creep.reserveController(target) == ERR_NOT_IN_RANGE) {
    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
}

