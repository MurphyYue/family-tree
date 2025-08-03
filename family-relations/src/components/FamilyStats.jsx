import React, { useMemo } from 'react';
import { relationData } from '../family-data';

function FamilyStats() {
  // Calculate statistics using memoization to avoid recalculation on re-renders
  const stats = useMemo(() => {
    // Helper function to traverse the tree and collect data
    const traverseTree = (node, level = 1, result = { 
      totalMembers: 0,
      maxDepth: 0,
      generationCounts: {},
      mostChildren: { name: '', count: 0 }
    }) => {
      // Count this member
      result.totalMembers++;
      
      // Update max depth
      result.maxDepth = Math.max(result.maxDepth, level);
      
      // Count by generation
      result.generationCounts[level] = (result.generationCounts[level] || 0) + 1;
      
      // Check if this member has more children than current record holder
      const childrenCount = node.children ? node.children.length : 0;
      if (childrenCount > result.mostChildren.count) {
        result.mostChildren = { name: node.name, count: childrenCount };
      }
      
      // Recursively process children
      if (node.children && node.children.length > 0) {
        node.children.forEach(child => traverseTree(child, level + 1, result));
      }
      
      return result;
    };
    
    return traverseTree(relationData);
  }, []);
  
  // Prepare generation data for display
  const generationData = Object.entries(stats.generationCounts)
    .map(([generation, count]) => ({ generation, count }))
    .sort((a, b) => parseInt(a.generation) - parseInt(b.generation));

  return (
    <div className="w-full lg:w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 self-start">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">家族统计</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalMembers}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">家族成员总数</div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.maxDepth}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">家族代数</div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 truncate">{stats.mostChildren.name}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">子女最多 ({stats.mostChildren.count}人)</div>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">各代人数统计</h3>
        <div className="space-y-3">
          {generationData.map(gen => (
            <div className="flex items-center" key={gen.generation}>
              <div className="w-20 text-sm text-gray-600 dark:text-gray-400">第{gen.generation}代</div>
              <div className="relative flex-1 h-6 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="absolute h-full bg-blue-500 dark:bg-blue-600 rounded-full transition-all duration-500 ease-in-out flex items-center justify-end pr-2"
                  style={{ 
                    width: `${(gen.count / Math.max(...generationData.map(g => g.count))) * 100}%` 
                  }}
                >
                  <span className="text-xs font-medium text-white">{gen.count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FamilyStats