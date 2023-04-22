<template>
  <div class="container"></div>
</template>

<script setup lang="ts">
import Canvas from "@/module/Canvas";
import {
  bestScore,
  generation,
  isAllDead,
  viewHeight,
  viewWidth,
  visualScore,
} from "@/module/Common";
import Tubes from "@/module/Tubes";
import Group from "@/module/group";
import { nextTick } from "vue";
nextTick(() => {
  // 创建画布实例
  const canvas = new Canvas(".container");
  const ctx = canvas.ctx!;
  // 加载小鸟飞行的图片
  const birdImg = new Image();
  birdImg.src = "/bird.png";
  // 定义当前小鸟状态的索引
  let birdStateIndex = 0;
  function animate() {
    // 清除之前绘制的小鸟状态
    ctx.clearRect(0, 0, viewWidth, viewHeight);

    // 获取当前小鸟状态的源坐标
    const sourceY = birdStateIndex * 24;

    // 在Canvas上绘制小鸟
    ctx.drawImage(birdImg, 0, sourceY, 34, 24, 0, 0, 34, 24);

    // 更新小鸟状态索引并确保循环使用
    birdStateIndex = (birdStateIndex + 1) % 4;

    requestAnimationFrame(animate);
  }
  animate();
  //   birdImg.onload = function () {
  //     setInterval(function () {}, 1000 / 60);
  //   };
});
</script>

<style lang="scss"></style>
