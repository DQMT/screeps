var util = require('./util');
/*
 *  system config
 */

module.exports = {
    clear: function () {
        Memory.system = undefined;
    },
    /**
     * 
     * @param {*} rooms 
     * @param {*} colonies 
     */
    init: function (bases, colonies) {
        if (!Memory.system) {

            var system = {};
            system['bases'] = bases;
            system['colonies'] = [];
            var limits = {
                harvesters: 5,
                upgraders: 2,
                builders: 2,
                repairers: 2,
                mrhandys: 1
            }
            system['limits'] = limits;
            system['sources'] = [];
            if (colonies) {
                system['colonies'] = colonies;
            }
            Memory.system = system;
            var sources = [];
            //init source
            Memory.system['bases'].forEach(base => {
                var ss = Game.rooms[base].find(FIND_SOURCES);
                for (var i = 0; i < ss.length; i++) {
                    var resource = {
                        'room': base,
                        'id': ss[i]['id'],
                        'maxBinds': 3,
                        'binds': 0,
                        'maxDrillers': 0,
                        'drillers': 0
                    };
                    sources.push(resource);
                }
            })
            Memory.system['colonies'].forEach(colony => {
                var ss = Game.rooms[colony].find(FIND_SOURCES);
                for (var i = 0; i < ss.length; i++) {
                    var resource = {
                        'room': colony,
                        'id': ss[i]['id'],
                        'maxBinds': 3,
                        'binds': 0,
                        'maxDrillers': 0,
                        'drillers': 0
                    };
                    sources.push(resource);
                }
            })
            Memory.system['sources'] = sources;
        }
        if (!Memory.peace) {
            Memory.peace = true;
        }
    },
    addBase: function (roomName, sourceIds) {
        var bases = Memory.system['bases'];
        if (util.findIndexInArray(bases, roomName) != -1) {
            return;
        }
        bases.push(roomName);
        Memory.system['bases'] = bases;
        var sources = Memory.system['sources'];
        sourceIds.forEach(s => {
            var resource = {
                'room': roomName,
                'id': s,
                'maxBinds': 3,
                'binds': 0,
                'maxDrillers': 0,
                'drillers': 0
            };
            sources.push(resource);
        })
        Memory.system['sources'] = sources;
    },
    removeBase: function (roomName, sourceIds) {
        var bases = Memory.system['bases'];
        if (util.findIndexInArray(bases, roomName) == -1) {
            return;
        }
        bases = util.removeInArray(bases, roomName);
        console.log('bases = ' + JSON.stringify(bases));
        Memory.system['bases'] = bases;
        var sources = Memory.system['sources'];
        var n = [];
        sources.forEach(e => {
            if (util.findIndexInArray(sourceIds, e.id) == -1) {
                n.push(e);
            }
        })
        console.log('n=' + JSON.stringify(n));
        Memory.system['sources'] = n;
    },
    addColony: function (roomName, sourceIds) {
        var colonies = Memory.system['colonies'];
        if (util.findIndexInArray(colonies, roomName) != -1) {
            return;
        }
        colonies.push(roomName);
        Memory.system['colonies'] = colonies;
        var sources = Memory.system['sources'];
        sourceIds.forEach(s => {
            var resource = {
                'room': roomName,
                'id': s,
                'maxBinds': 3,
                'binds': 0,
                'maxDrillers': 0,
                'drillers': 0
            };
            sources.push(resource);
        })
        Memory.system['sources'] = sources;
    },
    removeColony: function (roomName, sourceIds) {
        var colonies = Memory.system['colonies'];
        if (util.findIndexInArray(colonies, roomName) == -1) {
            return;
        }
        colonies = util.removeInArray(colonies, roomName);
        console.log('colonies = ' + JSON.stringify(colonies));
        Memory.system['colonies'] = colonies;
        var sources = Memory.system['sources'];
        var n = [];
        sources.forEach(e => {
            if (util.findIndexInArray(sourceIds, e.id) == -1) {
                n.push(e);
            }
        })
        console.log('n=' + JSON.stringify(n));
        Memory.system['sources'] = n;
    },
    clearBinds: function () {
        var sources = Memory.system.sources;
        sources.forEach(s => {
            s['binds'] = 0;
        })
        Memory.system.sources = sources;
    },
    setMaxDrillsAndLorries: function (id, maxDrillers, maxLorries) {
        var sources = Memory.system.sources;
        sources.forEach(s => {
            if (s['id'] == id) {
                s['maxDrillers'] = maxDrillers;
                s['maxLorries'] = maxLorries;
            }
        })
        Memory.system.sources = sources;
    },
    setDrillsAndLorries: function (id, maxDrillers, drillers, maxLorries, lorries) {
        var sources = Memory.system.sources;
        sources.forEach(s => {
            if (s['id'] == id) {
                s['maxDrillers'] = maxDrillers;
                s['drillers'] = drillers;
                s['maxLorries'] = maxLorries;
                s['lorries'] = lorries;
            }
        })
        Memory.system.sources = sources;
    },
    setMaxBinds: function (id, maxBinds) {
        var sources = Memory.system.sources;
        sources.forEach(s => {
            if (s['id'] == id) {
                s['maxBinds'] = maxBinds;
            }
        })
        Memory.system.sources = sources;
    },
    bindDriller: function (id) {
        var sources = Memory.system.sources;
        sources.forEach(s => {
            if (s['id'] == id) {
                s['drillers'] = s['drillers'] + 1;
            }
        })
        Memory.system.sources = sources;
    },
    bindLorry: function (id) {
        var sources = Memory.system.sources;
        sources.forEach(s => {
            if (s['id'] == id) {
                s['lorries'] = s['lorries'] + 1;
            }
        })
        Memory.system.sources = sources;
    },
    needDrill: function (id) {
        var flag = false;
        var sources = Memory.system.sources;
        sources.forEach(s => {
            if (s['id'] == id && s['maxDrillers'] > s['drillers']) {
                flag = true;
            }
        })
        return flag;
    },
    needLorry: function (id) {
        var flag = false;
        var sources = Memory.system.sources;
        sources.forEach(s => {
            if (s['id'] == id && s['maxLorries'] > s['lorries']) {
                flag = true;
            }
        })
        return flag;
    },
    setLimits: function (limits) {
        Memory.limits = limits;
    },
    setLimit: function (item, limit) {
        console.log('setLimit : ' + item + ' = ' + limit);
        Memory.limits[item] = limit;
    },
    bases: function () {
        var bases = [];
        Memory.system['bases'].forEach(b => bases.push(Game.rooms[b]));
        return bases;
    },
    baseRoomNames: function () {
        return Memory.system['bases'] ? Memory.system['bases'] : [];
    },
    colonyRoomNames: function () {
        return Memory.system['colonies'] ? Memory.system['colonies'] : [];
    },
    availableStructureSpawns(needEnergy) {
        var need = needEnergy ? needEnergy : 0;
        var spawns = [];
        for (const i in Game.spawns) {
            var s = Game.spawns[i];
            if (!s.spawning && s.room.energyAvailable >= need) {
                spawns.push(s);
            }
        }
        return spawns;
    },
    allSourceIds: function () {
        var sources = [];
        Memory.system.sources.forEach(s => {
            sources.push(s['id']);
        })
        return sources;
    },
    availableSources: function () {
        var sources = [];
        Memory.system.sources.forEach(s => {
            if (s['binds'] < s['maxBinds']) {
                sources.push(s['id']);
            }
        })
        return sources;
    },
    bindSource: function (sourceId) {
        var sources = Memory.system['sources'];
        sources.forEach(s => {
            if (s['id'] == sourceId) {
                s['binds'] = s['binds'] + 1 > s['maxBinds'] ? s['maxBinds'] : s['binds'] + 1;
            }
        });
        Memory.system['sources'] = sources;
        console.log('add bind ' + sourceId);
        console.log('add bind ' + JSON.stringify(Memory.system['sources']));
    },
    unbindSource: function (sourceId) {
        var sources = Memory.system['sources'];
        sources.forEach(s => {
            if (s['id'] == sourceId) {
                s['binds'] = s['binds'] - 1 < 0 ? 0 : s['binds'] - 1;
            }
        });
        Memory.system['sources'] = sources;
        console.log('remove bind ' + sourceId);
        console.log('remove bind ' + JSON.stringify(Memory.system['sources']));
    },
    cleanMemory: function () {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                if (Memory.creeps[name].bindSource) {
                    this.unbindSource(Memory.creeps[name].bindSource);
                }
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    },
    singleRoom: function () {
        var baseRoomNames = this.baseRoomNames();
        var colonyRoomNames = this.colonyRoomNames();
        return baseRoomNames.length == 1 && colonyRoomNames.length == 0
    },
    canUpgrade: function (creep) {
        return this.singleRoom() || util.findIndexInArray(this.baseRoomNames(), creep.room.name) != -1;
    },
    clearLog: function () {
        Memory.system.log = [];
    },
    getControllerIdNeedUpgrader: function () {
        var bases = this.baseRoomNames();
        bases.forEach(b => {
            var controllerId = Game.rooms[b].controller.id;
            var upgraders = _.filter(Game.creeps, (creep) => (creep.memory.role == 'upgrader' && creep.memory.controller == controllerId));
            if (upgraders.length == 0) {
                return controllerId;
            }
        })
        return null;
    }
};