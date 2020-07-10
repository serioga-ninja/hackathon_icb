import { DeviceType } from '../actions/action-group.base';

export const gameConfig = {
  width: window.innerWidth - 15,
  maxWidth: 1600,
  height: window.innerHeight - 15,
  maxHeight: 1100,
  debug: false,
  playerWidth: 20,
  allowToKill: false,
  speedOfWaiting: 100,
  throwGarbageOncePerSec: 25,
  speed: {
    human: 3,
    vacuum: 2
  },
  moodDestroyers: {
    garbage: 0.05,
    lightsOff: 0.05,
    vacuumProblem: 0.05,
  },
  consumePerTick: {
    water: {
      bath: 0.05,
      sink: 0.05,
      toilet: 0.05,
    },
    electricity: {
      light: 0.05,
      tv: 0.05,
      fan: 0.05,
      vacuum: 0.05,
      teapot: 0.05,
      fridge: 0.05,
      music: 0.05,
      microwave: 0.05,
      oven: 0.05,
      computer: 0.05,
    }
  }
};

export const tileSize: number = gameConfig.height / 15;
export const startHuman: any = {
  x: 14,
  y: 12
};

export const houseMap: string =
  '888888888888888888888\n' +
  '011115111121115111110\n' +
  '144444444414444444441\n' +
  '144444444414444444441\n' +
  '544444444464444444445\n' +
  '144444444414444444441\n' +
  '144444444414444444441\n' +
  '211116111131612111112\n' +
  '144444444414441444441\n' +
  '144444444414441444441\n' +
  '544444444464446444441\n' +
  '144444444414441444441\n' +
  '144444444414441444441\n' +
  '011115111121612111110\n' +
  '777777777777777777777';

export const textures: any = [
  {
    key: 'floor',
    path: 'textures/house/floor.jpg'
  },
  {
    key: 'wall',
    path: 'textures/house/wall.jpg'
  },
  {
    key: 'wallG',
    path: 'textures/house/wallG.jpg'
  },
  {
    key: 'wallT',
    path: 'textures/house/wallT.jpg'
  },
  {
    key: 'wallX',
    path: 'textures/house/wallX.jpg'
  },
  {
    key: 'window',
    path: 'textures/house/window.jpg'
  },
  {
    key: 'door',
    path: 'textures/house/door.jpg'
  },
  {
    key: 'grass',
    path: 'textures/house/grass.jpg'
  },
  {
    key: 'doorCarpet',
    path: 'textures/house/carpet.png'
  },
  {
    key: 'human',
    path: 'textures/person/stand.png'
  },
  {
    key: 'human-go-1',
    path: 'textures/person/go-1.png'
  },
  {
    key: 'human-go-2',
    path: 'textures/person/go-2.png'
  },
  {
    key: 'light',
    path: 'textures/furniture/lamp.png'
  },
  {
    key: 'computer',
    path: 'textures/furniture/computer.png'
  },
  {
    key: 'table',
    path: 'textures/furniture/table.png'
  },
  {
    key: 'table2',
    path: 'textures/furniture/table2.png'
  },
  {
    key: 'bed',
    path: 'textures/furniture/bed.png'
  },
  {
    key: 'couch',
    path: 'textures/furniture/couch.png'
  },
  {
    key: 'bath',
    path: 'textures/furniture/bath.png'
  },
  {
    key: 'bathOn',
    path: 'textures/furniture/bath-on.png'
  },
  {
    key: 'fridge',
    path: 'textures/furniture/fridge.png'
  },
  {
    key: 'fridgeOn',
    path: 'textures/furniture/fridge-on.png'
  },
  {
    key: 'fridgeDoor',
    path: 'textures/furniture/fridge-door.png'
  },
  {
    key: 'teapot',
    path: 'textures/furniture/teapot.png'
  },
  {
    key: 'teapotOn',
    path: 'textures/furniture/teapot-on.png'
  },
  {
    key: 'tv',
    path: 'textures/furniture/tv.png'
  },
  {
    key: 'fan',
    path: 'textures/furniture/fan.png'
  },
  {
    key: 'fanOn',
    path: 'textures/furniture/fan-on.png'
  },
  {
    key: 'vacuum',
    path: 'textures/furniture/vacuum.png'
  },
  {
    key: 'vacuum-on1',
    path: 'textures/furniture/vacuum-on1.png'
  },
  {
    key: 'vacuum-on2',
    path: 'textures/furniture/vacuum-on2.png'
  },
  {
    key: 'flower',
    path: 'textures/furniture/flower.png'
  },
  {
    key: 'flowerTable',
    path: 'textures/furniture/flower2.png'
  },
  {
    key: 'flowerBig',
    path: 'textures/furniture/flower3.png'
  },
  {
    key: 'toilet',
    path: 'textures/furniture/toilet.png'
  },
  {
    key: 'toiletOn',
    path: 'textures/furniture/toilet-on.png'
  },
  {
    key: 'music',
    path: 'textures/furniture/music.png'
  },
  {
    key: 'musicOn',
    path: 'textures/furniture/music-on.png'
  },
  {
    key: 'sink',
    path: 'textures/furniture/sink.png'
  },
  {
    key: 'sinkOn',
    path: 'textures/furniture/sink-on.png'
  },
  {
    key: 'sinkBath',
    path: 'textures/furniture/sinkBath.png'
  },
  {
    key: 'sinkBathOn',
    path: 'textures/furniture/sinkBath-on.png'
  },
  {
    key: 'kitchen',
    path: 'textures/furniture/kitchen.png'
  },
  {
    key: 'microwave',
    path: 'textures/furniture/microwave.png'
  },
  {
    key: 'microwaveOn',
    path: 'textures/furniture/microwave-on.png'
  },
  {
    key: 'oven',
    path: 'textures/furniture/oven.png'
  },
  {
    key: 'ovenOn',
    path: 'textures/furniture/oven-on.png'
  },
  {
    key: 'chair',
    path: 'textures/furniture/chair.png'
  },
  {
    key: 'books',
    path: 'textures/furniture/books.png'
  },
  {
    key: 'apple',
    path: 'textures/garbage/apple.png'
  },
  {
    key: 'banana',
    path: 'textures/garbage/banana.png'
  },
  {
    key: 'bottle',
    path: 'textures/garbage/bottle.png'
  },
  {
    key: 'chips',
    path: 'textures/garbage/chips.png'
  },
  {
    key: 'paper',
    path: 'textures/garbage/paper.png'
  }
];

export const audio: any = [
  {
    key: 'gameAudio',
    path: 'sounds/game.ogg'
  }
]

export const devices: any = [
  {
    blocks: [[6, 9]],
    key: 'light',
    type: DeviceType.Light
  },
  {
    blocks: [[6, 11]],
    key: 'light',
    type: DeviceType.Light
  },
  {
    blocks: [[12, 9]],
    key: 'light',
    type: DeviceType.Light
  },
  {
    blocks: [[12, 11]],
    key: 'light',
    type: DeviceType.Light
  },
  {
    blocks: [[12, 15]],
    key: 'light',
    type: DeviceType.Light
  },
  {
    blocks: [[2, 16], [2, 17], [2, 18]],
    key: 'tv',
    type: DeviceType.TV
  },
  {
    blocks: [[2, 15]],
    key: 'music',
    type: DeviceType.Music
  },
  {
    blocks: [[8, 13]],
    key: 'vacuum',
    type: DeviceType.Vacuum
  },
  {
    blocks: [[6, 3]],
    key: 'fridge',
    type: DeviceType.Fridge
  },
  {
    blocks: [[6, 2]],
    key: 'teapot',
    type: DeviceType.Teapot
  },
  {
    blocks: [[8, 18], [8, 19]],
    key: 'bath',
    type: DeviceType.Bath
  },
  {
    blocks: [[8, 1], [8, 2]],
    key: 'fan',
    type: DeviceType.Fan
  },
  {
    blocks: [[2, 11], [2, 12]],
    key: 'fan',
    type: DeviceType.Fan
  },
  {
    blocks: [[2, 3]],
    key: 'sink',
    type: DeviceType.Sink
  },
  {
    blocks: [[8, 15]],
    key: 'sinkBath',
    type: DeviceType.Sink
  },
  {
    blocks: [[2, 2]],
    key: 'microwave',
    type: DeviceType.Microwave
  },
  {
    blocks: [[2, 4]],
    key: 'oven',
    type: DeviceType.Oven
  },
  {
    blocks: [[12, 4], [12, 5], [12, 6]],
    key: 'computer',
    type: DeviceType.Computer
  },
  {
    blocks: [[12, 19]],
    key: 'toilet',
    type: DeviceType.Toilet
  }
]

export const furnitures: any = [
  {
    blocks: [[3, 6], [3, 7], [4, 6], [4, 7], [5, 6], [5, 7]],
    key: 'table',
    type: DeviceType.Simple
  },
  {
    blocks: [[4, 17]],
    key: 'table2',
    type: DeviceType.Simple
  },
  {
    blocks: [[9, 1], [9, 2]],
    key: 'bed',
    type: DeviceType.Simple
  },
  {
    blocks: [[11, 1], [11, 2]],
    key: 'bed',
    type: DeviceType.Simple
  },
  {
    blocks: [[6, 18], [6, 19]],
    key: 'couch',
    type: DeviceType.Simple
  },
  {
    blocks: [[6, 15], [6, 16]],
    key: 'couch',
    type: DeviceType.Simple
  },
  {
    blocks: [[6, 17]],
    key: 'flower',
    type: DeviceType.Simple
  },
  {
    blocks: [[2, 9]],
    key: 'flowerTable',
    type: DeviceType.Simple
  },
  {
    blocks: [[12, 13]],
    key: 'flower',
    type: DeviceType.Simple
  },
  {
    blocks: [[2, 19]],
    key: 'flower',
    type: DeviceType.Simple
  },
  {
    blocks: [[10, 1]],
    key: 'flower',
    type: DeviceType.Simple
  },
  {
    blocks: [[10, 19]],
    key: 'flower',
    type: DeviceType.Simple
  },
  {
    blocks: [[8, 8], [8, 9], [9, 8], [9, 9]],
    key: 'flowerBig',
    type: DeviceType.Simple
  },
  {
    blocks: [[2, 1], [3, 1], [4, 1], [5, 1], [6, 1]],
    key: 'kitchen',
    type: DeviceType.Simple
  },
  {
    blocks: [[11, 6]],
    key: 'chair',
    type: DeviceType.Simple
  },
  {
    blocks: [[12, 18]],
    key: 'books',
    type: DeviceType.Simple
  },
  /*{
    blocks: [[14, 12]],
    key: 'doorCarpet',
    type: DeviceType.Simple
  },
  {
    blocks: [[14, 11]],
    key: 'flower',
    type: DeviceType.Simple
  },
  {
    blocks: [[14, 13]],
    key: 'flower',
    type: DeviceType.Simple
  },*/
]
