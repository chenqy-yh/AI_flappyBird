import Matrix from "@/module/Matrix";

// sigmoid激活函数
function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}

class Neuralnetwork {
  numInput: number; // 输入层节点数
  numHidden: number; // 隐藏层节点数
  numOutput: number; // 输出层节点数
  wightIH: Matrix; // 输入层到隐藏层的权重矩阵
  wightOH: Matrix; // 隐藏层到输出层的权重矩阵
  bisaH: Matrix; // 隐藏层的偏置向量
  bisaO: Matrix; // 输出层的偏置向量
  static mutateRate: number = 0.1; // 变异率（静态属性）

  constructor(numInput: number, numHidden: number, numOutput: number) {
    this.numInput = numInput;
    this.numHidden = numHidden;
    this.numOutput = numOutput;
    this.wightIH = new Matrix(numHidden, numInput);
    this.wightIH.random(); // 随机初始化输入层到隐藏层的权重矩阵
    this.wightOH = new Matrix(numOutput, numHidden);
    this.wightOH.random(); // 随机初始化隐藏层到输出层的权重矩阵
    this.bisaH = new Matrix(numHidden, 1);
    this.bisaH.random(); // 随机初始化隐藏层的偏置向量
    this.bisaO = new Matrix(numOutput, 1);
    this.bisaO.random(); // 随机初始化输出层的偏置向量
  }

  // 前向传播
  public predict(input: number[]) {
    const inputMatrix = Matrix.ArrayToMatrix(input); // 将输入数组转换为列向量形式的矩阵
    const hidden = Matrix.multiply(this.wightIH, inputMatrix); // 输入层到隐藏层的计算
    hidden.add(this.bisaH); // 加上隐藏层的偏置
    hidden.transform(sigmoid); // 对隐藏层进行激活函数变换
    const output = Matrix.multiply(this.wightOH, hidden); // 隐藏层到输出层的计算
    output.add(this.bisaO); // 加上输出层的偏置
    output.transform(sigmoid); // 对输出层进行激活函数变换
    return output; // 返回输出层的结果
  }

  // 遗传算法中的交叉操作，生成新的神经网络
  static crossOver(a: Neuralnetwork, b: Neuralnetwork) {
    let son = {} as Neuralnetwork;
    if (Math.random() > 0.5) {
      son = Object.assign(son, a);
    } else {
      son = Object.assign({}, b);
    }
    son.wightIH = Matrix.cross(a.wightIH, b.wightIH).mutate(
      Neuralnetwork.mutateRate
    ); // 输入层到隐藏层的权重矩阵交叉并变异
    son.wightOH = Matrix.cross(a.wightOH, b.wightOH).mutate(
      Neuralnetwork.mutateRate
    ); // 隐藏层到输出层的权重矩阵交叉并变异
    return son;
  }
}

export default Neuralnetwork;
