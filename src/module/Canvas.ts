import { nextTick } from "vue";
import { viewHeight, viewWidth } from "./Common";
class Canvas {
  canvas: HTMLCanvasElement | null = null; // 画布对象
  ctx: CanvasRenderingContext2D | null = null; // 画布上下文对象
  constructor(containerSelector: string) {
    // 构造函数，接受一个参数表示要将画布添加到哪个DOM元素中
    this.canvas = document.createElement("canvas"); // 创建一个新的画布对象
    this.canvas.width = viewWidth; // 设置画布宽度为全局变量viewWidth的值
    this.canvas.height = viewHeight; // 设置画布高度为全局变量viewHeight的值
    document.querySelector(containerSelector)!.appendChild(this.canvas); // 将画布添加到指定的DOM元素中
    document.querySelector(containerSelector); // 获取指定的DOM元素
    this.ctx = this.canvas.getContext("2d")!; // 获取画布的上下文对象
  }
  public render() {
    // 公共方法，用于在画布上绘制背景色
    this.ctx!.beginPath(); // 开始一条路径
    this.ctx!.fillStyle = "#3498db"; // 设置绘制矩形的填充颜色为蓝色
    this.ctx!.fillRect(0, 0, viewWidth, viewHeight); // 绘制一个填充为蓝色的矩形
    this.ctx!.closePath(); // 关闭当前路径
  }
}

export default Canvas;
