// import { EmotionResponse, EmotionRequest } from '../types/emotion'
// import { EmotionResponse, EmotionRequest } from '../types/emotion';
// import type { EmotionRequest, EmotionResponse } from '../types/emotion';
import type { EmotionResponse } from '../types/emotion.ts';
import type { EmotionRequest } from '../types/emotion.ts';





const API_BASE_URL = 'http://localhost:5000'

export const analyzeEmotion = async (text: string): Promise<EmotionResponse> => {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text } as EmotionRequest),
  })

  if (!response.ok) {
    throw new Error('Failed to analyze emotion')
  }

  return response.json()
}