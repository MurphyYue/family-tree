import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { relationData } from '../family-data';

const FamilyTree = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Initialize chart
    const chart = echarts.init(chartRef.current);

    // Configure chart options
    const option = {
      title: {
        text: '家族关系图',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      series: [
        {
          type: 'tree',
          data: [relationData],
          top: '10%',
          bottom: '10%',
          layout: 'orthogonal',
          orient: 'TB',
          symbol: 'emptyCircle',
          symbolSize: 7,
          initialTreeDepth: 3,
          lineStyle: {
            curveness: 0.5
          },
          label: {
            position: 'top',
            rotate: 0,
            verticalAlign: 'middle',
            align: 'center',
            fontSize: 12
          },
          leaves: {
            label: {
              position: 'bottom',
              rotate: 0,
              verticalAlign: 'middle',
              align: 'center'
            }
          },
          emphasis: {
            focus: 'descendant'
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

    // Clean up
    return () => {
      chart.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="family-tree-container">
      <div ref={chartRef} style={{ width: '100%', height: '800px' }} />
    </div>
  );
};

export default FamilyTree;