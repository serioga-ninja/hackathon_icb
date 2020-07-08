export const gameConfig: any = {
  width: window.innerWidth - 20,
  height: window.innerHeight - 20,
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

export const devices: any = [
  {
    blocks: [[5, 9]],
    key: 'light'
  },
  {
    blocks: [[5, 11]],
    key: 'light'
  },
  {
    blocks: [[11, 9]],
    key: 'light'
  },
  {
    blocks: [[11, 11]],
    key: 'light'
  },
  {
    blocks: [[11, 15]],
    key: 'light'
  },
  {
    blocks: [[1, 16], [1, 17], [1, 18]],
    key: 'tv'
  },
  {
    blocks: [[1, 15]],
    key: 'music'
  },
  {
    blocks: [[7, 13]],
    key: 'vacuum'
  },
  {
    blocks: [[5, 1]],
    key: 'fridge'
  },
  {
    blocks: [[1, 2]],
    key: 'teapot'
  },
  {
    blocks: [[7, 18], [7, 19]],
    key: 'bath'
  },
  {
    blocks: [[7, 1]],
    key: 'fan'
  },
  {
    blocks: [[1, 11]],
    key: 'fan'
  },
  {
    blocks: [[1, 1]],
    key: 'sink'
  },
  {
    blocks: [[7, 15]],
    key: 'sink'
  }
]

export const furnitures: any = [
  {
    blocks: [[7, 8], [7, 9]],
    key: 'table1'
  },
  {
    blocks: [[3, 6], [3, 7], [4, 6], [4, 7]],
    key: 'table2'
  },
  {
    blocks: [[8, 1], [8, 2]],
    key: 'bed'
  },
  {
    blocks: [[10, 1], [10, 2]],
    key: 'bed'
  },
  {
    blocks: [[5, 18], [5, 19]],
    key: 'couch'
  },
  {
    blocks: [[5, 15], [5, 16]],
    key: 'couch'
  },
  {
    blocks: [[5, 17]],
    key: 'flower'
  },
  {
    blocks: [[1, 9]],
    key: 'flower'
  },
  {
    blocks: [[11, 13]],
    key: 'flower'
  },
  {
    blocks: [[1, 19]],
    key: 'flower'
  },
  {
    blocks: [[9, 1]],
    key: 'flower'
  },
  {
    blocks: [[11, 19]],
    key: 'toilet'
  }
]
