import {
  division,
  gap,
  offset,
  openL,
  tubeMinHeight,
  tubeSize,
  viewHeight,
  viewWidth,
} from "@/module/Common";
import Tube from "@/module/Tube";
class Tubes {
  tubes: Tube[] = []; // 障碍物数组，初始化为空数组

  constructor() {
    this.init(); // 在创建实例时，调用 init 方法初始化障碍物
  }

  public init() {
    this.tubes = []; // 初始化障碍物数组为空数组

    // 循环创建一定数量的障碍物，并将其加入障碍物数组
    for (let i = 0; i < tubeSize; i++) {
      this.tubes.push(
        new Tube(
          gap * i + offset, // 障碍物的横坐标位置
          0, // 障碍物距离画布顶部的距离
          viewWidth / division, // 障碍物的宽度
          Math.random() * (viewHeight - openL - tubeMinHeight) // 障碍物上下间隔的高度
        )
      );
    }
  }

  public update() {
    // 循环更新所有障碍物的状态
    this.tubes.forEach((tube, i) => {
      tube.update();
    });
  }

  public render(ctx: CanvasRenderingContext2D) {
    // 循环渲染所有障碍物
    this.tubes.forEach((tube) => {
      tube.render(ctx);
    });
  }
}

export default Tubes;
