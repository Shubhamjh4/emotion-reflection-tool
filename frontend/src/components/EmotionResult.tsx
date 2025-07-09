import type { EmotionResponse } from '../types/emotion'
import LoadingSpinner from './LoadingSpinner'

interface EmotionResultProps {
  result: EmotionResponse | null
  isLoading: boolean
}

const EmotionResult = ({ result, isLoading }: EmotionResultProps) => {
  const getEmotionColor = (emotion: string) => {
    const colors: { [key: string]: string } = {
      happy: 'text-yellow-400',
      sad: 'text-blue-400',
      angry: 'text-red-400',
      anxious: 'text-orange-400',
      excited: 'text-green-400',
      calm: 'text-teal-400',
      confused: 'text-purple-400',
      confident: 'text-indigo-400',
      frustrated: 'text-pink-400',
      peaceful: 'text-emerald-400'
    }
    return colors[emotion.toLowerCase()] || 'text-gray-400'
  }

  const getEmotionIcon = (emotion: string) => {
    const icons: { [key: string]: string } = {
      happy: '😊',
      sad: '😢',
      angry: '😠',
      anxious: '😰',
      excited: '🤩',
      calm: '😌',
      confused: '😕',
      confident: '😎',
      frustrated: '😤',
      peaceful: '😇'
    }
    return icons[emotion.toLowerCase()] || '🙂'
  }

  const getConfidenceBar = (confidence: number) => {
    const percentage = Math.round(confidence * 100)
    let colorClass = 'bg-green-500'
    
    if (percentage < 50) colorClass = 'bg-red-500'
    else if (percentage < 75) colorClass = 'bg-yellow-500'
    
    return { percentage, colorClass }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] space-y-4">
        <LoadingSpinner size="large" />
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Analyzing Your Emotions</h3>
          <p className="text-indigo-200">Please wait while we process your reflection...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] space-y-6">
        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-4xl">🧠</span>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Ready to Analyze</h3>
          <p className="text-indigo-200">
            Enter your thoughts in the form to discover your emotional state
          </p>
        </div>
      </div>
    )
  }

  const { percentage, colorClass } = getConfidenceBar(result.confidence)

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">Your Emotional Analysis</h2>
        <p className="text-indigo-200">
          Here's what we discovered about your emotional state
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">
            {getEmotionIcon(result.emotion)}
          </div>
          <h3 className={`text-3xl font-bold mb-2 ${getEmotionColor(result.emotion)}`}>
            {result.emotion}
          </h3>
          <p className="text-indigo-200">Primary Emotion Detected</p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-white">Confidence Level</span>
              <span className="text-sm text-indigo-200">{percentage}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-1000 ${colorClass}`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">{percentage}%</div>
              <div className="text-xs text-indigo-200">Accuracy</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {result.emotion.length}
              </div>
              <div className="text-xs text-indigo-200">Characters</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
        <h4 className="text-lg font-semibold text-white mb-3">Analysis Summary</h4>
        <p className="text-indigo-200 text-sm leading-relaxed">
          Based on your reflection, our AI detected a primary emotion of <strong>{result.emotion}</strong> with 
          {percentage}% confidence. This analysis helps you understand your current emotional state and 
          can be useful for emotional self-awareness and growth.
        </p>
      </div>
    </div>
  )
}

export default EmotionResult