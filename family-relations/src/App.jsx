import { useState } from 'react'
import './App.css'
import AdvancedFamilyTree from './components/AdvancedFamilyTree'
import FamilyStats from './components/FamilyStats'
import TailwindTest from './TailwindTest'

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 md:px-8 lg:px-12">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white">岳氏家族关系图</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">家族关系可视化</p>
      </header>
      
      {/* Tailwind CSS 测试组件 */}
      {/* <TailwindTest /> */}
      
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 lg:gap-8">
          <AdvancedFamilyTree />
          <FamilyStats />
        </div>
      </main>
      
      <footer className="bg-white dark:bg-gray-800 py-4 px-6 text-center text-gray-600 dark:text-gray-300 shadow-inner">
        <p>© 2023 家族关系图 - 使用 React, ECharts 构建</p>
      </footer>
    </div>
  )
}

export default App
