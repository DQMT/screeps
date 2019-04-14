var util = require('util');
var constants = require('constants');

/**
 * A lorry continously pickup energy and transfer energy to your structures
 * body part need: [CARRY, MOVE, MOVE]
 */

var roleLorry = {
    cost: function (structureSpawn) {
        return 150;
    },
    /** @param {Creep} creep */
    run: function (creep) {
        
    }

}
module.exports = roleLorry;