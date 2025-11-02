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
    
    // Create a modal or alert to show the exported JSON
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-auto">
        <h2 class="text-xl font-bold mb-4">Exported JSON</h2>
        <pre class="bg-gray-100 p-4 rounded overflow-auto text-sm">${jsonString}</pre>
        <button class="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    `;
    
    modal.querySelector('button')?.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
    
    document.body.appendChild(modal);
  };

  return (
       <div className="min-h-screen bg-gray-50 p-8 w-screen">
          <TagView node={tree} onUpdate={setTree} />
          <div>
            <button
            onClick={handleExport}
            className="bg-[#e0e0df]! border border-gray-300! text-black px-6 py-2 rounded-lg font-semibold"
          >
            Export
          </button></div>
    </div>
  )
}

export default App
