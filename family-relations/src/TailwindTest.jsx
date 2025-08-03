import React from 'react';

function TailwindTest() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">Tailwind CSS 测试</h1>
      <p className="text-gray-700 mb-2">这是一个测试 Tailwind CSS 是否正常工作的组件。</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        测试按钮
      </button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-red-100 p-4 rounded">红色卡片</div>
        <div className="bg-green-100 p-4 rounded">绿色卡片</div>
        <div className="bg-blue-100 p-4 rounded">蓝色卡片</div>
      </div>
    </div>
  );
}

export default TailwindTest;