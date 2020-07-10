import { DeviceType } from '../actions/action-group.base';

export const gameConfig: any = {
  width: window.innerWidth ,
  height: window.innerHeight,
  debug: false,
  playerWidth: 20,
  allowToKill: false
};

export const tileSize: number = gameConfig.height / 13;

export const houseMap: string =
  '12222@22222222@222221\n' +
  '1.........1.........1\n' +
  '1.........1.........1\n' +
  '@.........=.........@\n' +
  '1.........1.........1\n' +
  '1.........1.........1\n' +
  '12222=2222+2=22222221\n' +
  '1.........1...1.....1\n' +
  '1.........1...1.....1\n' +
  '@.........=...=.....1\n' +
  '1.........1...1.....1\n' +
  '1.........1...1.....1\n' +
  '12222@222222=22222221';

export const textures: any = [
  {
    key: 'floor',
    path: 'textures/house/floor.jpg'
  },
  {
    key: 'wallVert',
    path: 'textures/house/wallVert.jpg'
  },
  {
    key: 'wallHor',
    path: 'textures/house/wallHor.jpg'
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
    key: 'table1',
    path: 'textures/furniture/table1.png'
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
    key: 'fridge',
    path: 'textures/furniture/fridge.png'
  },
  {
    key: 'teapot',
    path: 'textures/furniture/teapot.png'
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
    key: 'vacuum',
    path: 'textures/furniture/vacuum.png'
  },
  {
    key: 'flower',
    path: 'textures/furniture/flower.png'
  },
  {
    key: 'toilet',
    path: 'textures/furniture/toilet.png'
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
];

export const devices: any = [
  {
    blocks: [[5, 9]],
    key: 'light',
    type: DeviceType.Light
  },
  {
    blocks: [[5, 11]],
    key: 'light',
    type: DeviceType.Light
  },
  {
    blocks: [[11, 9]],
    key: 'light',
    type: DeviceType.Light
  },
  {
    blocks: [[11, 11]],
    key: 'light',
    type: DeviceType.Light
  },
  {
    blocks: [[11, 15]],
    key: 'light',
    type: DeviceType.Light
  },
  {
    blocks: [[1, 16], [1, 17], [1, 18]],
    key: 'tv',
    type: DeviceType.TV
  },
  {
    blocks: [[1, 15]],
    key: 'music',
    type: DeviceType.Music
  },
  {
    blocks: [[7, 13]],
    key: 'vacuum',
    type: DeviceType.Vacuum
  },
  {
    blocks: [[5, 1]],
    key: 'fridge',
    type: DeviceType.Fridge
  },
  {
    blocks: [[1, 2]],
    key: 'teapot',
    type: DeviceType.Teapot
  },
  {
    blocks: [[7, 18], [7, 19]],
    key: 'bath',
    type: DeviceType.Bath
  },
  {
    blocks: [[7, 1], [7, 2]],
    key: 'fan',
    type: DeviceType.Fan
  },
  {
    blocks: [[1, 11], [1, 12]],
    key: 'fan',
    type: DeviceType.Fan
  },
  {
    blocks: [[1, 1]],
    key: 'sink',
    type: DeviceType.Sink
  },
  {
    blocks: [[7, 15]],
    key: 'sink',
    type: DeviceType.Sink
  }
]

export const furnitures: any = [
  {
    blocks: [[7, 8], [7, 9]],
    key: 'table1',
    type: DeviceType.Simple
  },
  {
    blocks: [[3, 6], [3, 7], [4, 6], [4, 7]],
    key: 'table2',
    type: DeviceType.Simple
  },
  {
    blocks: [[8, 1], [8, 2]],
    key: 'bed',
    type: DeviceType.Simple
  },
  {
    blocks: [[10, 1], [10, 2]],
    key: 'bed',
    type: DeviceType.Simple
  },
  {
    blocks: [[5, 18], [5, 19]],
    key: 'couch',
    type: DeviceType.Simple
  },
  {
    blocks: [[5, 15], [5, 16]],
    key: 'couch',
    type: DeviceType.Simple
  },
  {
    blocks: [[5, 17]],
    key: 'flower',
    type: DeviceType.Simple
  },
  {
    blocks: [[1, 9]],
    key: 'flower',
    type: DeviceType.Simple
  },
  {
    blocks: [[11, 13]],
    key: 'flower',
    type: DeviceType.Simple
  },
  {
    blocks: [[1, 19]],
    key: 'flower',
    type: DeviceType.Simple
  },
  {
    blocks: [[9, 1]],
    key: 'flower',
    type: DeviceType.Simple
  },
  {
    blocks: [[11, 19]],
    key: 'toilet',
    type: DeviceType.Simple
  }
]
