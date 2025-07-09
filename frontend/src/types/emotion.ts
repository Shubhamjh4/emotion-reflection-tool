// src/types/emotion.ts
export interface EmotionResponse {
  emotion: string;
  confidence: number;
}

export interface EmotionRequest {
  text: string;
}
