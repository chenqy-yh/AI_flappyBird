import Neuralnetwork from "./Neuralnetwork";

import {
  birdX,
  birdR,
  viewHeight,
  viewWidth,
  openL,
  delta,
  max_bspeed,
  min_bspeed,
  visualScore,
  birdScore,
  nearestTubeNum,
  setNearestTube,
} from "@/module/Common";
import Tubes from "./Tubes";

class Bird {
  //定义一个类 "Bird"，包含小鸟对象的属性：x坐标、y坐标、半径、死亡状态、得分、速度、大脑、重力和适应度。
  x: number;
  y: number;
  r: number;
  isDead: boolean;
  score: number;
  bspeed: number;
  brain: Neuralnetwork | undefined = undefined;
  g: number;
  fit: number;
  // birdImg: HTMLImageElement = new Image();
  // birdStateIndex: number;
  //定义一个构造函数，用于创建小鸟实例时初始化其属性。
  //如果没有传入大脑参数，则创建一个新的具有 4 个输入、8 个隐藏和 2 个输出的神经网络作为小鸟对象的大脑。
  constructor(brain?: Neuralnetwork) {
    this.x = birdX;
    this.y = viewHeight / 2;
    this.r = birdR;
    this.isDead = false;
    this.score = 0;
    this.bspeed = 1;
    this.g = 30;
    this.fit = 0;
    if (this.brain == undefined) {
      this.brain = new Neuralnetwork(6, 8, 1);
    }
  }
  // 两只鸟之间进行繁殖，产生新的后代鸟
  static reproduction(a: Bird, b: Bird) {
    return new Bird(Neuralnetwork.crossOver(a.brain!, b.brain!));
  }

  /**
   * 
   * @param ctx 
   * @returns 
   * 定义一个公共方法 "render"，用于在画布上绘制小鸟对象。
    如果小鸟对象已死亡，则返回。
    绘制一个填充为红色的圆形和一个边框为黑色的圆形。
   */

  public render(ctx: CanvasRenderingContext2D) {
    if (this.isDead) return;
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.stroke();
  }

  /**
   * 
   * @param tubes 
   * @returns 
   * 定义一个公共方法 "update"，用于更新小鸟对象的状态。
      如果小鸟已死亡，则返回。
      获取最近的障碍物管道，并将其作为神经网络的输入。
      根据神经网络的输出调整小
   */
  public update(tubes: Tubes) {
    if (this.isDead) return;
    let tube = this.getNearestTube(tubes);
    let output = this.brain!.predict([
      tube.x / viewWidth, //管道在图中的位置 百分比
      tube.height / viewHeight,//上管道的下边界在图中的位置 百分比
      (viewHeight - tube.height - openL) / viewHeight, //下管道的上边界在图中的位置 百分比
      this.y / viewHeight, //小鸟的纵坐标在图中的位置 百分比
      (tube.height - this.y) / viewHeight, //上管道的高度 百分比
      (viewHeight - tube.height - openL - this.y) / viewHeight, //小鸟的位置距离下管道上边界的距离 百分比
    ]);
    if (output.data[0][0] > 0.5) {
      this.bspeed -= 11;
    }
    // this.g += output.data[1][0];
    this.bspeed += this.g * delta;

    if (this.bspeed > max_bspeed) {
      this.bspeed = max_bspeed;
    } else if (this.bspeed < min_bspeed) {
      this.bspeed = min_bspeed;
    }

    this.y += this.bspeed;

    for (let i = 0; i < tubes.tubes.length; i++) {
      let tube = tubes.tubes[i];
      if (
        (this.x + this.r > tube.x &&
          this.x - this.r < tube.x + tube.width &&
          !(
            this.y - this.r > tube.height &&
            this.y + this.r < tube.height + openL
          )) ||
        this.y + this.r > viewHeight ||
        this.y - this.r < 0
      ) {
        this.isDead = true;
        this.score = birdScore.value;
      }
    }
  }
  public getNearestTube(tubes: Tubes) {
    const tube = tubes.tubes[nearestTubeNum.value];
    if (this.x - this.r > tube.x + tube.width) {
      setNearestTube();
      visualScore.value++;
    }

    return tube;
  }
}

export default Bird;
