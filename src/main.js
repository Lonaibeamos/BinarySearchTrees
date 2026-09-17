import Tree from "./Tree.js";

function randomArray(size = 15) {
  let values = new Set();

  while (values.size < size) {
    values.add(Math.floor(Math.random() * 100));
  }

  return [...values];
}

let tree = new Tree(randomArray());

console.log("Initial tree balanced:", tree.isBalanced());

console.log("Level order:");
tree.levelOrderForEach((value) => console.log(value));

console.log("Preorder:");
tree.preOrderForEach((value) => console.log(value));

console.log("Postorder:");
tree.postOrderForEach((value) => console.log(value));

console.log("Inorder:");
tree.inorderForEach((value) => console.log(value));

tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.insert(104);
tree.insert(105);

console.log("After adding values > 100:");
console.log("Tree balanced:", tree.isBalanced());

tree.rebalance();

console.log("After rebalancing:");
console.log("Tree balanced:", tree.isBalanced());

console.log("Level order:");
tree.levelOrderForEach((value) => console.log(value));

console.log("Preorder:");
tree.preOrderForEach((value) => console.log(value));

console.log("Postorder:");
tree.postOrderForEach((value) => console.log(value));

console.log("Inorder:");
tree.inorderForEach((value) => console.log(value));
