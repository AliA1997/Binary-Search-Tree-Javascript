class BinaryTree {
  constructor(){
    //Root Node.
    //Root of binary tree.
    this.root = null;
  }

  //Functions
  //Insert another node
  insert(node){
    /*
      ** Upon the insertion of the element
      ** Initialize new node instance.
      ** if the root is null, insert element to the root.
      ** The insertNewNode helper function
      *** else if the root node is less than the node to be inserted, set  the left element.
      *** else if the root node is greater than the node to be inserted, set the right element.
    */
    const newNode = new Node(node);
    if(!this.root) return this.root = newNode;
    //Use insertNewNode helper function to find current position in the binary and insert new node.
    else this.insertNewNode(this.root, newNode);
  }

  //Remove's node
  //Data to remove
  remove(data){
    //Root is reinitialized the root at modified binary tree.
    this.root = this.removeNode(this.root, data);
  }

  //Update a node
  update(){

  }

  //Helper Functions
  /*
    ** Method to insert a new node into binary tree.
    ** It find the position of the tree to insert new node with given data. 
  */
  insertNewNode(root, node){
    /*
      ** [6, 53, 5, 3, 50]
      ** -> root = 6. -> insertNewNode(6, 53) -> { 
            root: { 
              data: 6, 
              left: null, 
              right: { 
                data: 53, 
                left: null, 
                right: null 
              } 
            }
          } (1st Iteration)
      ** -> root = 6 -> insertNewNode(6, 5) -> {
            root: {
              data: 6,
              left: {
                data: 5,
                left: null,
                right: null
              },
              right: { 
                data: 53, 
                left: null, 
                right: null 
              } 
            }
          } (2nd Iteration)
      ** -> root = 6 -> insertNewNode(6, 3) -> duplicate left node -> insertNewNode(5, 3) -> {
            root: {
              data: 6,
              left: { 
                data: 5, 
                left: { 
                  data: 5, 
                  left: { data: 3, left: null, right: null }, 
                  right: null  
                }
              },
              right:{
                data: 53,
                left: null,
                right: null
              }
            }
          } (3rd Iteration)
      ** -> root = 6, insertNewNode(6, 50) -> duplicate right node -> 
        insertNewNode(53, 50) -> insert into left position since 50 is less than of the root at the current level. -> {
          root: {
            data: 6,
            left: {
              data: 5,
              left: {
                data: 3,
                left: null, 
                right: null
              }
              right:null
            },
            right: {
              data: 53,
              left: {
                data: 50,
                left: null,
                right: null
              },
              right: null
            } 
          }
        }\(4th iteration)
     */
    if(node.data < root.data) {
      if(!root.left) return root.left = node;
      return this.insertNewNode(root.left, node);
    }

    if(root.data < node.data) {
      if(!root.right) return root.right = node;
      return this.insertNewNode(root.right, node);
    }
  }

  //Removes node from binary tree
  //It will use the key to recur the binary tree that starts at the root node.
  /*
    ** Three scenarios that can happen
    ** Removing a leaf node -> The node has no children, therefore the node get's removed, therefore parent node returns null.
    ** Deleting a node with one child -> If the parent node has a left pointer or right pointer -> point it to deleted node.
    ** Deleting a node with two children -> Found minimum value of the right subtree and replace with minimum valued node, and remove that minimum valued node from tree.
   */
  removeNode(node, key){
    if(!node) {
      return null;
    }
    //If the node.data is less than the key, the recursivaly call the removeNode function, and pass the right node and key.
    else if(node.data < key) {
      node.right = this.removeNode(node.right, key);
      return node;
    }
    //If the node.data is greater than the key, recursivaly call the removeNode function, and pass the left node and key.
    else if(node.data > key) {
      node.left = this.removeNode(node.left, key);
      return node;
    }
    //If the data is similar to the root node. Then delete the node.
    else {
      //deleting node with no children
      if(node.left === null || node.right === null) {
        node = null;
        return node;
      }
      //delete node with one children
      //Assign node with right node(make it root), when left node is null
      //Assign node with left node(make it root), when right node is null
      else if(node.left === null) {
        node = node.right;
        return node;
      } 
      else if(node.right === null) {
        node = node.left;
        return node;
      }

      //Delete a node with two children
      //Minimum node of the right subtree.
      //Is stored in aux
      var aux = this.findMinNode(node.right);
      node.data = aux.data;
      node.right = this.removeNode(node.right, aux.data);
      return node;
    }
  }

  //Tree Traversal Methods
  //traverse left subtree
  //go to root
  //traverse right subtree
  //perform inorder traversal on subtree.
  inorder(node){
    if(node !== null){
      this.inorder(node.left);
      console.log(node.data);
      this.inorder(node.right);
    }
  }

  //traverse left subtree
  //traverse right subtree
  //perform preorder traversal on subtree
  preorder(node){
    if(node !== null) {
      console.log(node.data);
      this.preorder(node.left);
      this.preorder(node.right);
    }
  }

  //traverse left subtree
  //traverse right subtree
  //perform postorder traversal on subtree
  postorder(node){
    if(node !== null) {
      this.postorder(node.left);
      this.postorder(node.right);
      console.log(node.data);
    }
  }

  //Helper Methods
  //Starts on a given node.
  findMinNode(node){
    //Search based on the left node.
    if(node.left == null) return node;
    else return this.findMinNode(node.left);
  }

  //Returns root node of the tree.
  getRootNode(){
    return this.root;
  }

  //Searches through node and data in binary tree.
  search(node, data){
    if(node === null) return null;
    //If the node data is less than the data passed.
    if(node.data < data) return this.search(node.left, data);
    //If the node data is greater than the data passed.
    if(node.data > data) return this.search(node.right, data);

    //If node data is equal to data passed, return the node.
    return node;
  }
}

class Node {
  constructor(data){
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// create an object for the BinarySearchTree 
var BST = new BinaryTree(); 
  
// Inserting nodes to the BinarySearchTree 
BST.insert(15); 
BST.insert(25); 
BST.insert(10); 
BST.insert(7); 
BST.insert(22); 
BST.insert(17); 
BST.insert(13); 
BST.insert(5); 
BST.insert(9); 
BST.insert(27); 

var root = BST.getRootNode(); 

BST.inorder(root); 

BST.remove(5); 

var root = BST.getRootNode(); 

BST.inorder(root); 

BST.remove(15); 

var root = BST.getRootNode(); 
console.log("inorder traversal"); 
  
// prints 9 10 13 17 22 25 27 
BST.inorder(root); 
              
console.log("postorder traversal"); 
BST.postorder(root); 
console.log("preorder traversal"); 
BST.preorder(root); 