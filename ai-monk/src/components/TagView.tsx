
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export interface TreeNode {
  name: string;
  children?: TreeNode[];
  data?: string;
  collapsed?: boolean;
}

export const TagView: React.FC<{
  node: TreeNode;
  onUpdate: (updatedNode: TreeNode) => void;
}> = ({ node, onUpdate }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(node.name);

  const toggleCollapse = () => {
    onUpdate({ ...node, collapsed: !node.collapsed });
  };

  const handleDataChange = (newData: string) => {
    onUpdate({ ...node, data: newData });
  };

  const handleAddChild = () => {
    const newChild: TreeNode = {
      name: 'New Child',
      data: 'Data'
    };

    if (node.data !== undefined) {
      const { data, ...rest } = node;
      onUpdate({ ...rest, children: [newChild] });
    } else {
      onUpdate({
        ...node,
        children: [...(node.children || []), newChild]
      });
    }
  };

  const handleChildUpdate = (index: number, updatedChild: TreeNode) => {
    if (node.children) {
      const newChildren = [...node.children];
      newChildren[index] = updatedChild;
      onUpdate({ ...node, children: newChildren });
    }
  };

  const handleNameSubmit = () => {
      onUpdate({ ...node, name: tempName });
      setIsEditingName(false);
    
  };

  const handleNameClick = () => {
    setTempName(node.name);
    setIsEditingName(true);
  };

  return (
    <div className="border border-[#6cacef] rounded-lg overflow-hidden mb-2 w-full">
      <div className="bg-[#6cacef] text-black p-2 flex items-center gap-2 w-full">
        <button
          onClick={toggleCollapse}
          className="bg-[#e4e4e3]! border border-gray-300! hover:bg-[#6cacef] focus:outline-0 outline-0 rounded p-1"
        >
          {node.collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </button>
        
        {isEditingName ? (
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
                      onBlur={() => {
                          setIsEditingName(false);
                          handleNameSubmit();
                      }}
            autoFocus
            className="bg-[#e4e4e3]! border border-gray-300! text-black px-2 py-2 rounded flex-1 outline-none"
          />
        ) : (
          <span
            onClick={handleNameClick}
            className="flex-1 cursor-pointer hover:bg-[#6cacef] px-2 py-1 rounded"
          >
            {node.name}
          </span>
        )}

        <button
          onClick={handleAddChild}
          className="bg-[#e4e4e3]! border border-gray-300! px-3 py-1 rounded flex items-center gap-1 text-sm"
        >
          Add Child
        </button>
      </div>

      {!node.collapsed && (
        <div className="p-3 bg-[#e4e4e3]!">
          {node.data !== undefined ? (
            <div className='text-black flex items-center gap-2 font-medium text-lg'>
                          Data
            <input
              type="text"
              value={node.data}
              onChange={(e) => handleDataChange(e.target.value)}
              className="w-[40%] bg-white border border-gray-300! text-black  rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6cacef]"
              placeholder="Enter data"
            />
            </div>
          ) : (
            <div className="space-y-2 pl-2 ">
              {node.children?.map((child, index) => (
                <TagView
                  key={index}
                  node={child}
                  onUpdate={(updatedChild) =>
                    handleChildUpdate(index, updatedChild)
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};