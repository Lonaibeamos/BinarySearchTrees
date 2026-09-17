import Node from "./Node.js";

class Tree {
  constructor(arr) {
    if (!Array.isArray(arr)) throw new Error("Type Error: Enter an array");

    let arr1 = arr
      .filter((item, index) => arr.indexOf(item) === index)
      .sort((x, y) => x - y);

    this.root = this.buildTree(arr1);
  }

  buildTree(arr) {
    if (arr.length == 0) return null;

    let middleIndex = Math.floor(arr.length / 2);
    let middleValue = arr[middleIndex];

    let node = new Node(middleValue);

    node.left = this.buildTree(arr.slice(0, middleIndex));
    node.right = this.buildTree(arr.slice(middleIndex + 1));

    return node;
  }

  includes(value) {
    let current = this.root;

    while (current !== null) {
      if (current.data === value) {
        return true;
      } else if (current.data > value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return false;
  }

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    let current = this.root;

    while (current !== null) {
      if (current.data < value && current.right == null) {
        current.right = new Node(value);
        return;
      }

      if (current.data > value && current.left == null) {
        current.left = new Node(value);
        return;
      }

      if (current.data == value) return;

      if (current.data > value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
  }

  deleteItem(value) {
    let current = this.root;
    let parent = null;

    while (current !== null && current !== undefined) {
      if (current.data === value) {
        // Root node case
        if (parent === null) {
          // Root is a leaf
          if (current.left === null && current.right === null) {
            this.root = null;
            return;
          }

          // Root has only right child
          if (current.left === null) {
            this.root = current.right;
            return;
          }

          // Root has only left child
          if (current.right === null) {
            this.root = current.left;
            return;
          }

          // If root has two children,
          // continue into the successor case below
        }

        // Leaf node case
        if (current.left === null && current.right === null) {
          if (parent.left === current) {
            parent.left = null;
          } else {
            parent.right = null;
          }

          return;
        }

        // Only right child
        if (current.right !== null && current.left === null) {
          if (parent.right === current) {
            parent.right = current.right;
          } else {
            parent.left = current.right;
          }

          return;
        }

        // Only left child
        if (current.left !== null && current.right === null) {
          if (parent.left === current) {
            parent.left = current.left;
          } else {
            parent.right = current.left;
          }

          return;
        }

        // Two children
        if (current.left !== null && current.right !== null) {
          let sucessorParent = current;
          let sucessor = current.right;

          while (sucessor.left !== null) {
            sucessorParent = sucessor;
            sucessor = sucessor.left;
          }

          current.data = sucessor.data;

          if (sucessorParent.left === sucessor) {
            sucessorParent.left = sucessor.right;
          } else {
            sucessorParent.right = sucessor.right;
          }

          return;
        }
      }

      parent = current;

      if (current.data < value) {
        current = current.right;
      } else {
        current = current.left;
      }
    }
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("callback required");
    }

    if (this.root === null) return;

    let queue = [this.root];

    while (queue.length > 0) {
      let current = queue.shift();

      callback(current.data);

      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
  }

  inorderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("callback required");
    }

    let stack = [];
    let current = this.root;

    while (current !== null || stack.length > 0) {
      while (current !== null) {
        stack.push(current);
        current = current.left;
      }

      current = stack.pop();

      callback(current.data);

      current = current.right;
    }
  }

  preOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("callback required");
    }

    if (this.root === null) return;

    let stack = [this.root];

    while (stack.length > 0) {
      let current = stack.pop();

      callback(current.data);

      if (current.right) stack.push(current.right);
      if (current.left) stack.push(current.left);
    }
  }

  postOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("callback required");
    }

    function traverse(node) {
      if (node === null) return;

      traverse(node.left);
      traverse(node.right);

      callback(node.data);
    }

    traverse(this.root);
  }

  height(value) {
    let travel = this.root;
    let targetNode = null;

    while (travel !== null) {
      if (travel.data === value) {
        targetNode = travel;
        break;
      }

      if (travel.data > value) {
        travel = travel.left;
      } else {
        travel = travel.right;
      }
    }

    if (targetNode === null) return undefined;

    function getHeight(node = targetNode) {
      if (node === null) {
        return -1;
      }

      let left = getHeight(node.left);
      let right = getHeight(node.right);

      let height = 1 + Math.max(left, right);

      return height;
    }

    return getHeight(targetNode);
  }

  depth(value) {
    let depth = 0;
    let travel = this.root;
    let targetNode = null;

    while (travel !== null) {
      if (travel.data === value) {
        targetNode = travel;
        break;
      }

      if (travel.data < value) {
        travel = travel.right;
        depth++;
      } else {
        travel = travel.left;
        depth++;
      }
    }

    if (targetNode === null) return undefined;

    return depth;
  }

  isBalanced() {
    function getHeight(node) {
      if (node === null) return -1;

      let left = getHeight(node.left);
      let right = getHeight(node.right);

      return 1 + Math.max(left, right);
    }

    function checkNode(node) {
      if (node === null) return true;

      let left = getHeight(node.left);
      let right = getHeight(node.right);

      if (Math.abs(left - right) > 1) {
        return false;
      }

      return checkNode(node.left) && checkNode(node.right);
    }

    return checkNode(this.root);
  }

  rebalance() {
    let arr = [];

    this.inorderForEach((x) => arr.push(x));

    this.root = this.buildTree(arr);
  }
}

export default Tree;
