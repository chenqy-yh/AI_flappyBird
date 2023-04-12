import {
  bestScore,
  generation,
  incBirdScore,
  population,
  setBestScore,
  setGeneration,
  truncateNearestTube,
  truncateVisualScore,
  visualScore,
} from "@/module/Common";
import Tubes from "@/module/Tubes";
import Bird from "./Bird";

class Group {
  birds: Bird[]; // 小鸟集合
  constructor() {
    this.birds = []; // 初始化小鸟数组

    // 从localStorage中获取历史最佳分数和代数，如果历史成绩更好则加载之前的小鸟集合，否则重新初始化小鸟集合
    const history = JSON.parse(localStorage.getItem("history")!);
    if (history != undefined && history.bestScore > bestScore.value) {
      bestScore.value = history.bestScore;
      generation.value = history.Generation;
      this.birds = history.birds;
    } else {
      this.init();
    }
  }

  public init() {
    // 初始化小鸟集合
    this.birds = new Array(population).fill(0).map(() => new Bird());
  }

  public render(ctx: CanvasRenderingContext2D) {
    // 在画布上渲染小鸟
    this.birds.forEach((bird) => {
      bird.render(ctx);
    });
  }

  public update(tubes: Tubes) {
    // 更新小鸟状态
    if (this.isAllDead()) {
      // 如果所有小鸟都死亡
      if (visualScore.value > bestScore.value) {
        // 如果当前得分高于历史最高得分，则更新历史最高得分并保存到localStorage中
        setBestScore();
        localStorage.setItem(
          "history",
          JSON.stringify({
            bestScore: bestScore.value,
            Generation: generation.value,
            birds: this.birds,
          })
        );
      }
      setGeneration(); // 增加代数计数器
      truncateNearestTube(); // 重置最近管道编号
      truncateVisualScore(); // 重置当前得分
      const chooseBirs = this.choose(0.01); // 根据适应度选择一定比例的小鸟作为后代的父母
      console.log("leave " + chooseBirs.length);
      const tS = this.getTotalScore(chooseBirs); // 计算总适应度
      for (let i = 0; i < chooseBirs.length; i++) {
        // 计算每只被选择的小鸟的相对适应度
        chooseBirs[i].fit = chooseBirs[i].score / tS;
      }
      const newBirds = [];
      for (let i = 0; i < population; i++) {
        // 用选中的小鸟进行繁殖，生成新一代小鸟集合
        const mom = this.pick(chooseBirs);
        const dad = this.pick(chooseBirs);
        newBirds.push(Bird.reproduction(mom!, dad!));
      }
      this.birds = newBirds; // 更新小鸟集合
      tubes.init(); // 重新初始化障碍物的状态
    } else {
      incBirdScore(); // 小鸟得分增加
    }
    this.birds.forEach((bird) => {
      bird.update(tubes); // 更新小鸟状态
    });
  }

  public choose(selectRate: number) {
    // 选择一定比例的小鸟作为后代的父母
    this.birds.sort((a, b) => {
      return b.score - a.score;
    });
    return this.birds.slice(0, selectRate * population); // 返回适应度排名前selectRate比例的小鸟集合
  }

  public pick(birds: Bird[]) {
    // 根据相对适应度选取一个小鸟
    let r = Math.random();
    let sum = 0;
    for (let i = 0; i < birds.length; i++) {
      sum += birds[i].fit;
      if (sum > r) {
        return birds[i];
      }
    }
  }

  public isAllDead() {
    // 判断是否所有小鸟都死亡
    return this.birds.every((bird) => bird.isDead);
  }

  public getTotalScore(birds: Bird[]) {
    // 计算总适应度
    let totalScore = 0;
    birds.forEach((bird) => {
      totalScore += bird.score;
    });
    return totalScore;
  }
}

export default Group;
