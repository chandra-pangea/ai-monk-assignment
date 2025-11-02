import { useState } from 'react'
import './App.css'
import { TagView, type TreeNode } from './components/TagView';

function App() {
  const [tree, setTree] = useState<TreeNode>({
    name: 'root',
    children: [
      {
        name: 'child1',
        children: [
          { name: 'child1-child1', data: 'c1-c1 Hello' },
          { name: 'child1-child2', data: 'c1-c2 JS' }
        ]
      },
      { name: 'child2', data: 'c2 World' }
    ]
  });
  const [exportString, setExportString] = useState("");

  const cleanTreeForExport = (node: TreeNode): any => {
    const result: any = { name: node.name };
    
    if (node.children) {
      result.children = node.children.map((child:any) => cleanTreeForExport(child));
    } else if (node.data !== undefined) {
      result.data = node.data;
    }
    
    return result;
  };


  const handleExport = () => {
    const cleanedTree = cleanTreeForExport(tree);
    const jsonString = JSON.stringify(cleanedTree, null, 2);
    setExportString(jsonString);
  };

  const handleExportClose = () => {
    setExportString('');
  }

  return (
       <div className="min-h-screen bg-gray-50 p-8 w-screen">
          <TagView node={tree} onUpdate={setTree} />
        <div>
        {!exportString ? <button
          onClick={handleExport}
          className="bg-[#e0e0df]! border border-gray-300! text-black px-6 py-2 rounded-lg font-semibold"
        >
          Export
        </button> :<div><button
          onClick={handleExportClose}
          className="bg-[#e0e0df]! border border-gray-300! text-black px-6 py-2  font-semibold"
        >
          Export Close
        </button> 
          <p className='text-black'>{exportString}</p></div>}
      </div>
    </div>
  )
}

export default App
