import { gameConfig } from '../core/game.config';
import { EGroupTypes } from '../core/group.base';
import { Point } from '../core/point';
import { SpriteEntity } from '../core/sprite.entity';
import { RoomGroup } from '../groups/room.group';
import STATIC_BODY = Phaser.Physics.Arcade.STATIC_BODY;

export interface IFlatBlockOptions {
  width: number;
  height: number;
  blockType: EHouseParticles;
  matrix: { x: number; y: number; };
}

export enum EHouseParticles {
  WallVertical,
  WallHorizontal,
  WallX,
  FreeSpace,
  Window,
  Door,
}

const pathAvailableBlockTypes: EHouseParticles[] = [
  EHouseParticles.FreeSpace, EHouseParticles.Door
];

export class FlatBlockEntity extends SpriteEntity {

  private readonly _position: Point;
  private _waveValue: number;
  private _debugText: Phaser.GameObjects.Text;

  public readonly blockType: EHouseParticles;
  public relatedMovableBlocks: FlatBlockEntity[];
  public relatedNotMovableBlocks: FlatBlockEntity[];


  public readonly isDoor: boolean;
  public isMovable: boolean;
  public humanCanPath: boolean;
  public matrix: { x: number; y: number; };
  public relatedEntranceBlocks: FlatBlockEntity[];

  get waveValue() {
    return this._waveValue;
  }

  set waveValue(value) {
    this._waveValue = value;

    if (this._debugText) {
      this._debugText.destroy();
    }

    if (typeof value === 'number' && gameConfig.debug) {
      this._debugText = this.scene.add.text(this.position.x, this.position.y, value.toString(), {
        font: '10px Arial Bold',
        fill: '#de0025'
      });
    }
  }

  get position() {
    return this._position;
  }

  constructor(scene: Phaser.Scene, x: number, y: number, key: string, options: IFlatBlockOptions) {
    super(scene, x, y, key);

    this._position = new Point(x, y);
    this.blockType = options.blockType;
    this.setDisplaySize(options.width, options.height);
    this.scene.physics.world.enableBody(this, STATIC_BODY);
    this.isMovable = pathAvailableBlockTypes.indexOf(options.blockType) !== -1;
    this.humanCanPath = this.isMovable;
    this.isDoor = options.blockType === EHouseParticles.Door;
    this.matrix = options.matrix;
    this.relatedEntranceBlocks = [];


    if (gameConfig.debug) {
      this.scene.add.text(this.position.x - 10, this.position.y - 10, `${this.matrix.x}-${this.matrix.y}`, {
        font: '10px Arial Bold',
        fill: '#000000'
      });
      if (this.isMovable) {
        this.setTint(0xc8fdba);
      } else {
        this.setTint(0xfddfba);
      }
    }
  }

  getEntranceFromRoom(room: RoomGroup): FlatBlockEntity {
    return this.relatedEntranceBlocks
      .find((block) => block.getGroup(EGroupTypes.room).groupId === room.groupId);
  }

  makeImovable() {
    this.isMovable = false;
    if (gameConfig.debug) {
      this.setTint(0xfddfba);
    }

    for (const relatedBlock of this.relatedMovableBlocks) {
      relatedBlock.relatedMovableBlocks = relatedBlock
        .relatedMovableBlocks
        .filter((block) => block.objID !== this.objID);
    }
  }
}
