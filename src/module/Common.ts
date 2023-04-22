import { ref } from "vue";
export {
  viewHeight,
  viewWidth,
  division,
  speed,
  openL,
  fps,
  gap,
  offset,
  tubeSize,
  tubeMinHeight,
  generation,
  bestScore,
  birdR,
  birdX,
  delta,
  max_bspeed,
  min_bspeed,
  visualScore,
  population,
  isAllDead,
  birdScore,
  nearestTubeNum,
  select_Strength,
  retention_ratio,
};

// 定义全局常量
const viewWidth = 1000; // 视图宽度
const viewHeight = 400; // 视图高度
const division = 10; // 分区数目
const speed = 1.5; // 障碍物移动速度
const openL = 100; // 管道开口的长度
const fps = 60; // 游戏帧率
const offset = viewWidth / 7; // 初始管道的偏移值
const gap = offset + viewWidth / division; // 管道之间的距离
const tubeSize = Math.ceil(viewWidth / gap) + 1; // 缓存的管道数目
const tubeMinHeight = 50; // 管道最小高度
const birdX = viewWidth / 5; // 小鸟的初始水平位置
const birdR = 10; // 小鸟的半径
const delta = 0.016; // 时间增量
const max_bspeed = 5; // 最大下落速度
const min_bspeed = -8; // 最大上升速度
const population = 200; // 种群数量
const select_Strength = 1.2; // 遗传选择强度
const retention_ratio = 2 / population;

// 定义响应式变量
const isAllDead = ref(false); // 是否所有小鸟都死亡
const generation = ref(0); // 当前遗传代数
const bestScore = ref(0); // 最高得分

const visualScore = ref(0); // 当前得分
const birdScore = ref(0); // 小鸟的得分
const nearestTubeNum = ref(0); // 最近的管道编号

// 定义一系列响应式函数，用于修改响应式变量的值
export function setBestScore() {
  bestScore.value = visualScore.value;
}

export function setNearestTube() {
  nearestTubeNum.value++;
  nearestTubeNum.value %= tubeSize;
}

export function truncateNearestTube() {
  nearestTubeNum.value = 0;
}

export function setGeneration() {
  generation.value++;
}

export function truncateVisualScore() {
  visualScore.value = 0;
}

export function incBirdScore() {
  birdScore.value++;
}
