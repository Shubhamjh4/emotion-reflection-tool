import { useState } from 'react'
import EmotionForm from './components/EmotionForm'
import EmotionResult from './components/EmotionResult'
import type { EmotionResponse } from './types/emotion'

function App() {
  const [emotionResult, setEmotionResult] = useState<EmotionResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAnalysisComplete = (result: EmotionResponse) => {
    setEmotionResult(result)
    setIsLoading(false)
  }

  const handleAnalysisStart = () => {
    setIsLoading(true)
    setEmotionResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
              Emotion Reflection Tool
            </h1>
            <p className="text-xl text-indigo-200 max-w-2xl mx-auto leading-relaxed">
              Discover the emotions behind your thoughts. Share your reflections and gain insights into your emotional landscape.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <EmotionForm 
                onAnalysisComplete={handleAnalysisComplete}
                onAnalysisStart={handleAnalysisStart}
                isLoading={isLoading}
              />
            </div>

            {/* Result Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <EmotionResult 
                result={emotionResult}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-indigo-300 text-sm">
              Built with React, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App