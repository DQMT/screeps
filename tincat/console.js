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


tombstone:
{"room":{"name":"E48N38","energyAvailable":1800,"energyCapacityAvailable":1800,"visual":{"roomName":"E48N38"}},"pos":{"x":41,"y":48,"roomName":"E48N38"},"id":"5ccf7a4b389fcd24bc6eb33b","deathTime":6548995,"store":{"energy":332,"UH":11,"KO":17,"ZH":23,"GO":95},"ticksToDecay":52,"creep":{"room":{"name":"E48N38","energyAvailable":1800,"energyCapacityAvailable":1800,"visual":{"roomName":"E48N38"}},"pos":{"x":41,"y":48,"roomName":"E48N38"},"id":"5ccf7a3d54c244778aa71281","name":"invader_E48N38_764","spawning":false,"my":false,"body":[{"type":"tough","hits":0},{"type":"tough","hits":0},{"type":"tough","hits":0},{"type":"tough","hits":0},{"type":"tough","hits":0},{"type":"tough","hits":0},{"type":"tough","hits":0},{"type":"tough","hits":0},{"type":"tough","hits":0},{"type":"tough","hits":0},{"type":"tough","hits":0},{"type":"tough","hits":0},{"type":"tough","hits":0},{"type":"tough","hits":0},{"type":"tough","hits":0},{"type":"tough","hits":0},{"type":"move","hits":0},{"type":"move","hits":0},{"type":"move","hits":0},{"type":"move","hits":0},{"type":"move","hits":0},{"type":"move","hits":0},{"type":"move","hits":0},{"type":"move","hits":0},{"type":"move","hits":0},{"type":"move","hits":0},{"type":"move","hits":0},{"type":"move","hits":0},{"type":"move","hits":0},{"type":"move","hits":0},{"type":"move","hits":0},{"type":"move","hits":0},{"type":"move","hits":0},{"type":"move","hits":0},{"type":"move","hits":0},{"type":"move","hits":0},{"type":"move","hits":0},{"type":"move","hits":0},{"type":"move","hits":0},{"type":"move","hits":0},{"type":"ranged_attack","hits":0},{"type":"ranged_attack","hits":0},{"type":"ranged_attack","hits":0},{"type":"work","hits":0},{"type":"work","hits":0},{"type":"work","hits":0},{"type":"work","hits":0},{"type":"attack","hits":0},{"type":"attack","hits":0},{"type":"move","hits":0}],"owner":{"username":"Invader"},"ticksToLive":1496,"carryCapacity":0,"carry":{"energy":0},"fatigue":0,"hits":0,"hitsMax":5000,"saying":null}}

