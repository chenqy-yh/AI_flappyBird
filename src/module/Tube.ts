import {
  gap,
  openL,
  speed,
  tubeMinHeight,
  tubeSize,
  viewHeight,
} from "@/module/Common";

class Tube {
  x: number; // 障碍物的横坐标位置
  y: number; // 障碍物距离画布顶部的距离
  width: number; // 障碍物的宽度
  height: number; // 障碍物上下间隔的高度

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  public update() {
    // 更新障碍物的横坐标位置
    this.x -= speed;

    // 如果障碍物已经完全移出画布，则重新设置其位置和上下间隔的高度
    if (this.x < -this.width) {
      this.x += gap * tubeSize;
      this.height = Math.random() * (viewHeight - openL - tubeMinHeight);
    }
  }

  public render(ctx: CanvasRenderingContext2D) {
    // 渲染障碍物
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillRect(
      this.x,
      this.y + openL + this.height,
      this.width,
      viewHeight - this.height - openL
    );
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(
      this.x,
      this.y + openL + this.height,
      this.width,
      viewHeight - this.height - openL
    );
  }
}

export default Tube;
