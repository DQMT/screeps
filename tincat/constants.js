var WORKER_STATE = {
    HARVEST: 'harvest',
    UPGRADE: 'upgrade',
    BUILD: 'build',
}

var STROKE_COLOR = {
    HARVEST: '#FFFFFF',
    TRANSFER: '#CDCD00',
    BUILD: '#1874CD',
    REPAIR: '#1874CD',
    UPGRADE: '#4B0082',
    ATTACK: '#CD0000',
    LORRY: '#000000',
    CLAIM:'#AAAAAA'
}
var MY_ROOM_NAMES = ['E47N38','E48N38'];
var MY_SPAWN_NAMES = ['shaxianxiaochi','jueweihuajia'];
var SIGN_WORDS = "Leave me alone, please."
module.exports = {
    SIGN_WORDS: SIGN_WORDS,
    WORKER_STATE: WORKER_STATE,
    STROKE_COLOR: STROKE_COLOR,
    MY_ROOM_NAMES: MY_ROOM_NAMES,
    MY_SPAWN_NAMES: MY_SPAWN_NAMES
};