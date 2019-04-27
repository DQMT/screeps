var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
defenders.forEach(d => {
    d.memory.busy=true;
    d.moveTo(new RoomPosition(43, 46, 'E48N38'));
});