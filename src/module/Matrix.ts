// export function ArrayToMatrix(arr: number[]) {
//   const matrix = new Matrix(arr.length, 1);
//   for (let i = 0; i < arr.length; i++) {
//     matrix.data[i][0] = arr[i];
//   }
// }

class Matrix {
  row: number; // 矩阵行数
  col: number; // 矩阵列数
  data: number[][]; // 矩阵数据
  constructor(row: number, col: number) {
    // 构造函数，初始化矩阵
    this.row = row;
    this.col = col;
    this.data = new Array(row).fill(0).map(() => {
      return new Array(col).fill(0);
    });
  }

  // static方法

  // 将数组转换为列向量形式的矩阵
  static ArrayToMatrix(arr: number[]) {
    const matrix = new Matrix(arr.length, 1);
    for (let i = 0; i < arr.length; i++) {
      matrix.data[i][0] = arr[i];
    }
    return matrix;
  }

  // 矩阵乘法
  static multiply(a: Matrix, b: Matrix) {
    if (a.col != b.row) throw console.error("col of a must equal row of b");
    const result = new Matrix(a.row, b.col);
    for (let i = 0; i < a.row; i++) {
      for (let j = 0; j < b.col; j++) {
        for (let k = 0; k < a.col; k++) {
          result.data[i][j] += a.data[i][k] * b.data[k][j];
        }
      }
    }
    return result;
  }

  // 矩阵交叉（用于遗传算法中的交叉操作）
  static cross(x: Matrix, y: Matrix) {
    if (x.col != y.col || x.row != y.row) {
      throw console.error("col and row of x must equal col and row of y");
    }

    const son = new Matrix(x.row, y.col);
    for (let i = 0; i < x.row; i++) {
      for (let j = 0; j < x.col; j++) {
        if (Math.random() > 0.5) {
          son.data[i][j] = x.data[i][j];
        } else {
          son.data[i][j] = y.data[i][j];
        }
      }
    }
    return son;
  }

  // instance方法

  // 随机初始化矩阵
  public random() {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.data[i][j] = Math.random() * 2 - 1;
      }
    }
  }

  // 对矩阵中的每个元素进行函数变换（用于神经网络中的激活函数）
  public transform(activeFn: Function) {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.data[i][j] = activeFn(this.data[i][j]);
      }
    }
  }

  // 将另一个矩阵加到当前矩阵上
  public add(x: Matrix) {
    if (x.col != this.col || x.row != this.row)
      throw console.error("col and row of x must equal col and row of this");
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.data[i][j] += x.data[i][j];
      }
    }
  }

  // 对矩阵中的每个元素进行变异（用于遗传算法中的变异操作）
  public mutate(rate: number) {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        if (Math.random() < rate) {
          this.data[i][j] = Math.random() * 2 - 1;
        }
      }
    }
    return this;
  }
}

export default Matrix;
