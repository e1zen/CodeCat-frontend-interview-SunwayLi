function run() {
  // 保存原始的Object.prototype[Symbol.iterator]
  const originalIterator = Object.prototype[Symbol.iterator];
  
  // 临时修改Object.prototype，使其可迭代
  Object.prototype[Symbol.iterator] = function() {
    const keys = Object.keys(this);
    let index = 0;
    const self = this;
    
    return {
      next: function() {
        if (index < keys.length) {
          const key = keys[index++];
          return { value: self[key], done: false };
        } else {
          // 执行完后恢复原始的迭代器
          Object.prototype[Symbol.iterator] = originalIterator;
          return { done: true };
        }
      }
    };
  };
}

run();
const [a, b] = {a: 1, b: 2};
console.log(a, b); // 输出 1 2