import Tree from "../src/Tree.js";

function randomArray(size = 15) {
  let values = new Set();

  while (values.size < size) {
    values.add(Math.floor(Math.random() * 100));
  }

  return [...values];
}

test("BST can be balanced, unbalanced, and rebalanced", () => {
  let tree = new Tree(randomArray());

  expect(tree.isBalanced()).toBe(true);

  let levelOrder = [];
  let preOrder = [];
  let postOrder = [];
  let inorder = [];

  tree.levelOrderForEach((value) => levelOrder.push(value));
  tree.preOrderForEach((value) => preOrder.push(value));
  tree.postOrderForEach((value) => postOrder.push(value));
  tree.inorderForEach((value) => inorder.push(value));

  console.log("Before unbalancing:");
  console.log("Level order:", levelOrder);
  console.log("Preorder:", preOrder);
  console.log("Postorder:", postOrder);
  console.log("Inorder:", inorder);

  tree.insert(101);
  tree.insert(102);
  tree.insert(103);
  tree.insert(104);
  tree.insert(105);

  expect(tree.isBalanced()).toBe(false);

  tree.rebalance();

  expect(tree.isBalanced()).toBe(true);

  levelOrder = [];
  preOrder = [];
  postOrder = [];
  inorder = [];

  tree.levelOrderForEach((value) => levelOrder.push(value));
  tree.preOrderForEach((value) => preOrder.push(value));
  tree.postOrderForEach((value) => postOrder.push(value));
  tree.inorderForEach((value) => inorder.push(value));

  console.log("After rebalancing:");
  console.log("Level order:", levelOrder);
  console.log("Preorder:", preOrder);
  console.log("Postorder:", postOrder);
  console.log("Inorder:", inorder);
});
