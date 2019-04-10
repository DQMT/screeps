var roleWorker = require('role.worker');

/**
 * The supervisor make sure every creep work correctly.
 */
var theSupervisor = {
    spawn:function(structureSpawn,role){
        console.log('spwan a new '+role+' from '+structureSpawn);
        if(role=='worker'){
            roleWorker.spawnOne(structureSpawn);
        }
    },
   
    /** @param {Creep} creep **/
    urge: function(creep) {
        if(creep.memory.role == 'worker') {
            roleWorker.run(creep);
        }
    }

    
};


module.exports = theSupervisor;