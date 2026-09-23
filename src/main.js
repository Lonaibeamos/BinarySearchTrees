import Tree from "./Tree.js";

let tree = new Tree([5, 4, 10, 12]);
//[4,5,10,12] // pop 10
//[4,5] and [12]
//pop 5   and 12
console.log("Initial tree balanced:", tree.isBalanced());

console.log("Level order:");
tree.levelOrderForEach((value) => console.log(value));

console.log("Preorder:");
tree.preOrderForEach((value) => console.log(value));

console.log("Postorder:");
tree.postOrderForEach((value) => console.log(value));

console.log("Inorder:");
tree.inorderForEach((value) => console.log(value));

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

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

prettyPrint(tree.root);
