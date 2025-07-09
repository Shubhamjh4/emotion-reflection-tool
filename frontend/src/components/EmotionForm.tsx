import { useState } from 'react'
import { analyzeEmotion } from '../utils/api'
import type { EmotionResponse } from '../types/emotion'  // Add 'type' here
import LoadingSpinner from './LoadingSpinner'

interface EmotionFormProps {
  onAnalysisComplete: (result: EmotionResponse) => void
  onAnalysisStart: () => void
  isLoading: boolean
}

const EmotionForm = ({ onAnalysisComplete, onAnalysisStart, isLoading }: EmotionFormProps) => {
  const [reflection, setReflection] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!reflection.trim()) {
      setError('Please enter your reflection')
      return
    }

    if (reflection.length < 10) {
      setError('Please write at least 10 characters')
      return
    }

    setError('')
    onAnalysisStart()

    try {
      const result = await analyzeEmotion(reflection)
      onAnalysisComplete(result)
    } catch (err) {
      setError('Failed to analyze emotion. Please try again.')
      console.error('Analysis error:', err)
    }
  }

  const handleClear = () => {
    setReflection('')
    setError('')
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">Share Your Thoughts</h2>
        <p className="text-indigo-200">
          Express what's on your mind and discover the emotions within
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="reflection" className="block text-sm font-semibold text-white mb-3">
            Your Reflection
          </label>
          <textarea
            id="reflection"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="I feel nervous about my first job interview..."
            className="w-full h-40 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 resize-none"
            disabled={isLoading}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-indigo-300">
              {reflection.length}/500 characters
            </span>
            {reflection.length > 0 && (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-indigo-300 hover:text-white transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-400/50 rounded-lg p-3">
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !reflection.trim()}
          className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <LoadingSpinner />
              <span>Analyzing Emotions...</span>
            </div>
          ) : (
            'Analyze Emotion'
          )}
        </button>
      </form>
    </div>
  )
}

export default EmotionForm