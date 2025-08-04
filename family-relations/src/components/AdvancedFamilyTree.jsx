import { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { relationData } from '../family-data';
import PersonDetail from './PersonDetail';

const AdvancedFamilyTree = () => {
  const chartRef = useRef(null);
  const containerRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Flatten the tree for search functionality
  const flattenTree = (node, result = []) => {
    result.push(node);
    if (node.children) {
      node.children.forEach(child => flattenTree(child, result));
    }
    return result;
  };
  
  const allPeople = flattenTree(relationData);
  
  // Filter people based on search term
  const filteredPeople = searchTerm
    ? allPeople.filter(person => person.name.includes(searchTerm))
    : [];
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    // Initialize chart
    const chart = echarts.init(chartRef.current);
    const isDarkMode = document.documentElement.classList.contains('dark') || 
                                window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Configure chart options
    const option = {
      title: {
        text: '',
        subtext: '',
        left: 'center',
        top: 10,
      },
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        formatter: (params) => {
          const { name, value } = params.data;
          return `<div style="font-weight: bold; font-size: 64px; height: 100px; line-height: 100px;">${name}</div>`;
        }
      },
      series: [
        {
          type: 'tree',
          data: [relationData],
          top: '15%',
          bottom: '15%',
          layout: 'orthogonal',
          orient: 'TB',
          symbol: 'emptyCircle',
          initialTreeDepth: 4,
          roam: true,
          lineStyle: {
            curveness: 0.5
          },
          itemStyle: {
            borderWidth: 2
          },
          symbolSize: 20,
          label: {
            position: 'top',
            rotate: 0,
            verticalAlign: 'middle',
            align: 'center',
            fontSize: 18,
            color: isDarkMode ? '#ffffff' : '#333'
          },
          leaves: {
            label: {
              position: 'bottom',
              rotate: 0,
              verticalAlign: 'middle',
              align: 'center',
              color: isDarkMode ? '#ffffff' : '#333'
            }
          },
          emphasis: {
            focus: 'descendant',
            itemStyle: {
              color: '#E06666'
            },
            lineStyle: {
              color: '#E06666',
              width: 2
            }
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750
        }
      ]
    };
    
    // Apply options to chart
    chart.setOption(option);
    
    // Handle resize
    const handleResize = () => {
      chart.resize();
    };
    window.addEventListener('resize', handleResize);
    
    // Handle zoom level changes
    chart.getZr().on('mousewheel', function(params) {
      const newZoom = Math.max(50, Math.min(200, zoomLevel + (params.wheelDelta > 0 ? 10 : -10)));
      setZoomLevel(newZoom);
    });
    
    // Handle click events
    chart.on('click', function(params) {
      if (params.data) {
        setSelectedPerson(params.data);
      }
    });
    
    // Clean up
    return () => {
      chart.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [zoomLevel]);
  
  // Focus on a person when selected from search
  const focusOnPerson = (person) => {
    setSelectedPerson(person);
    // This would ideally navigate to the person in the chart
    // For a complete implementation, we'd need to track node positions
  };
  
  // 处理全屏切换
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // 进入全屏模式
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) { /* Safari */
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) { /* IE11 */
        containerRef.current.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      // 退出全屏模式
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };
  
  // 监听全屏状态变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);
  
  return (
    <div ref={containerRef} className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden lg:min-w-[600px]">
      <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="搜索家族成员..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          {filteredPeople.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredPeople.map((person, index) => (
                <div 
                  key={index} 
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-150 ease-in-out dark:text-white"
                  onClick={() => focusOnPerson(person)}
                >
                  {person.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-3 self-end md:self-auto">
          <button 
            onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-150 ease-in-out text-gray-700 dark:text-white"
          >
            -
          </button>
          <span className="text-gray-700 dark:text-white font-medium">{zoomLevel}%</span>
          <button 
            onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-150 ease-in-out text-gray-700 dark:text-white"
          >
            +
          </button>
          <button 
            onClick={toggleFullscreen}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-150 ease-in-out text-gray-700 dark:text-white"
            title={isFullscreen ? '退出全屏' : '全屏预览'}
          >
            {isFullscreen ? '↙' : '↗'}
          </button>
        </div>
      </div>
      
      <div className="w-full overflow-hidden pt-4">
        <div 
          ref={chartRef} 
          className="w-full h-[700px] md:h-[800px] lg:h-[900px] transition-transform duration-300 ease-in-out"
          style={{ 
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center'
          }} 
        />
      </div>
      
      {selectedPerson && (
        <PersonDetail 
          person={selectedPerson} 
          onClose={() => setSelectedPerson(null)} 
        />
      )}
    </div>
  );
};

export default AdvancedFamilyTree;