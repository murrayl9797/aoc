const fs = require('fs');

class Tree {
  constructor(val) {
    this.root = val;
    this.children = [];
  }

  addChild(val) {
    var child = new Tree(val);
    this.children.push(child);
    return child;
  }

  flattenTree() {
    console.log(this.root)

    const rec = (children, i) => {
      for(var child of children) {
        console.log(`Level ${i}, child is ${child.root}`)
        rec(child.children, i+1);
      }
    }
    rec(this.children, 1);
  }

  changeToNums() {
    var newTree = new Tree(1);

    const rec = (oldChildren, parent) => {
      for (var oldChild of oldChildren) {
        //.root.replace(/[a-z]g/, '')
        var c = parent.addChild(Number(oldChild.root.match(/\d+/)));
        rec(oldChild.children, c);
      }
    }
    rec(this.children, newTree);
    return newTree;
  }

  answer() {

    const findBagsInHere = (bag) => {
      let bagsInChildren = 0;

      for (var child of bag.children) {
        bagsInChildren += findBagsInHere(child)
      }

      return bag.root + bag.root*bagsInChildren;
    }
    let sum = 0;
    for (var child of this.children) {
      sum += findBagsInHere(child);
    }
    return sum;
  }

}


const run = (path) => {

  const groups = fs.readFileSync(path, 'utf-8').split('\n').map(a => {
    return a.split('contain')
  }).map(a => {
    a[1] = a[1].replace(/bag(s\.|s|\.|)/g, '')
    a[0] = a[0].replace(/bag(s\.|s|\.|)/g, '')
    a[0] = a[0].replace(/ /g, '')
    a[1] = a[1].replace(/ /g, '')
    //a[1] = a[1].replace(/[0-9]/g, '')
    a[1] = a[1].replace(/noother/g, '')
    a[1] = a[1].split(',');
    //console.log('Line: ',a);
    return a;
  });

  // PART 1
  // let finalCount = 0;
  // let shinyParent = {};
  // let i = 0;
  // for (; i < groups.length;) {
  //   var parent = groups[i][0];
  //   var children = groups[i][1];
  //   //console.log(i, parent, children);

  //   var reset = false;
  //   for (var child of children) {
  //     if (!shinyParent[parent] && child === 'shinygold') {
  //       shinyParent[parent] = parent;
  //       finalCount++;
  //       reset = true;
  //       break;
  //     }

  //     for (var p in shinyParent) {
  //       //console.log('BigBOY:', shinyParent)
  //       //console.log('Child:', child, 'Parent:', p);
  //       if (!shinyParent[parent] && child == p) {
  //         shinyParent[parent] = parent;
  //         finalCount++;
  //         reset = true;
  //         break;
  //       }
  //     }
  //   }
  //   if (reset) {
  //     i = 0;
  //   } else {
  //     i++;
  //   }
  // }

  // PART 2:
  var tree = new Tree('shinygold');
  var firstChildren = [];

  // Find root children
  for (var group of groups) {
    if (group[0] === 'shinygold') {
      firstChildren = group[1];
      break;
    }
  }

  // helper to find children
  const findThem = (searchStr) => {
    //console.log(`Looking for`, searchStr.replace(/[0-9]*/g, ''))
    for (var group of groups) {
      if (group[0] === searchStr.replace(/[0-9]*/g, '')) {
        return group[1];
      }
    }
  }

  var recHelper = (children, parent) => {
    for (var child of children) {
      var c = parent.addChild(child);

      // find child's children
      var chz = findThem(child) || [];

      // recurse
      recHelper(chz, c);
    }

  };
  recHelper(firstChildren, tree);

  //tree.flattenTree();

  return tree;
}

//console.log(`Answer:`, run('input.txt'));
var testTree = run('input.txt');

//var tree = new Tree('shiny');

testTree.changeToNums().flattenTree();
console.log(`Answer`, testTree.changeToNums().answer());