
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';

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
      // Replace data with children
      const { data, ...rest } = node;
      onUpdate({ ...rest, children: [newChild] });
    } else {
      // Add to existing children
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

  const handleNameSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onUpdate({ ...node, name: tempName });
      setIsEditingName(false);
    }
  };

  const handleNameClick = () => {
    setTempName(node.name);
    setIsEditingName(true);
  };

  return (
    <div className="border-2 border-blue-500 rounded-lg overflow-hidden mb-2">
      {/* Header */}
      <div className="bg-blue-500 text-white p-2 flex items-center gap-2">
        <button
          onClick={toggleCollapse}
          className="hover:bg-blue-600 rounded p-1"
        >
          {node.collapsed ? (
            <ChevronRight size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>
        
        {isEditingName ? (
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onKeyDown={handleNameSubmit}
            onBlur={() => setIsEditingName(false)}
            autoFocus
            className="bg-white text-black px-2 py-1 rounded flex-1 outline-none"
          />
        ) : (
          <span
            onClick={handleNameClick}
            className="flex-1 cursor-pointer hover:bg-blue-600 px-2 py-1 rounded"
          >
            {node.name}
          </span>
        )}

        <button
          onClick={handleAddChild}
          className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded flex items-center gap-1 text-sm"
        >
          <Plus size={14} />
          Add Child
        </button>
      </div>

      {/* Content */}
      {!node.collapsed && (
        <div className="p-3 bg-white">
          {node.data !== undefined ? (
            <input
              type="text"
              value={node.data}
              onChange={(e) => handleDataChange(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter data"
            />
          ) : (
            <div className="space-y-2 pl-4">
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