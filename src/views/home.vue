<template>
  <div class="container"></div>
  <div class="GUI">
    <input id="slider" type="range" min="1" max="100" value="1" />
    <div>Generation:{{ generation }}</div>
    <div>bestScore:{{ bestScore }}</div>
  </div>
</template>

<script setup lang="ts">
import Canvas from "@/module/Canvas";
import { bestScore, generation, isAllDead, visualScore } from "@/module/Common";
import Tubes from "@/module/Tubes";
import Group from "@/module/group";
import { nextTick } from "vue";
nextTick(() => {
  // 创建画布实例
  const canvas = new Canvas(".container");

  // 获取滑动条元素并创建障碍物和游戏精灵群组实例
  const slider = document.querySelector("#slider") as HTMLInputElement;
  const tubes = new Tubes();
  const group = new Group();

  function animate() {
    // 渲染画布
    canvas.render();

    // 根据滑动条值更新多个游戏帧
    for (let i = 0; i < (slider.value as unknown as number); i++) {
      tubes.update(); // 更新障碍物
      group.update(tubes); // 更新精灵群组
    }

    // 渲染障碍物和精灵群组
    tubes.render(canvas.ctx!);
    group.render(canvas.ctx!);

    // 在画布上显示当前分数
    canvas.ctx!.font = "20px Arial";
    canvas.ctx!.fillStyle = "#fff";
    canvas.ctx!.fillText(`Score: ${visualScore.value}`, 10, 30);

    // 如果所有精灵都死亡，则停止动画
    if (!isAllDead.value) requestAnimationFrame(animate);
  }

  // 启动游戏动画
  animate();
});
</script>

<style lang="scss"></style>
