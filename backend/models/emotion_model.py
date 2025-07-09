import random
import re
from typing import Dict, List, Tuple

class EmotionAnalyzer:
    def __init__(self):
        # Emotion keywords and their associated emotions
        self.emotion_keywords = {
            'happy': ['happy', 'joy', 'excited', 'great', 'awesome', 'wonderful', 'amazing', 'fantastic', 'good', 'excellent', 'love', 'celebrate', 'cheerful'],
            'sad': ['sad', 'depressed', 'down', 'unhappy', 'disappointed', 'hurt', 'cry', 'tears', 'lonely', 'empty', 'grief', 'sorrow'],
            'angry': ['angry', 'mad', 'furious', 'rage', 'irritated', 'annoyed', 'frustrated', 'hate', 'disgusted', 'outraged'],
            'anxious': ['anxious', 'nervous', 'worried', 'stress', 'panic', 'fear', 'scared', 'overwhelmed', 'tense', 'uneasy'],
            'excited': ['excited', 'thrilled', 'pumped', 'enthusiastic', 'eager', 'anticipate', 'can\'t wait', 'looking forward'],
            'calm': ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil', 'quiet', 'still', 'composed', 'balanced'],
            'confused': ['confused', 'puzzled', 'lost', 'uncertain', 'unsure', 'don\'t know', 'unclear', 'mixed up'],
            'confident': ['confident', 'sure', 'certain', 'strong', 'capable', 'ready', 'prepared', 'determined'],
            'frustrated': ['frustrated', 'stuck', 'blocked', 'annoyed', 'irritated', 'fed up', 'tired of'],
            'peaceful': ['peaceful', 'content', 'satisfied', 'at ease', 'harmonious', 'balanced', 'centered']
        }
        
        # Intensity modifiers
        self.intensity_modifiers = {
            'very': 1.3,
            'extremely': 1.5,
            'really': 1.2,
            'quite': 1.1,
            'somewhat': 0.8,
            'slightly': 0.6,
            'a bit': 0.7,
            'super': 1.4,
            'incredibly': 1.5,
            'totally': 1.3
        }

    def clean_text(self, text: str) -> str:
        """Clean and normalize the input text"""
        # Convert to lowercase
        text = text.lower()
        # Remove special characters but keep spaces and basic punctuation
        text = re.sub(r'[^\w\s\'\-\.]', ' ', text)
        # Remove extra whitespaces
        text = ' '.join(text.split())
        return text

    def calculate_emotion_scores(self, text: str) -> Dict[str, float]:
        """Calculate emotion scores based on keyword matching"""
        cleaned_text = self.clean_text(text)
        words = cleaned_text.split()
        
        emotion_scores = {emotion: 0.0 for emotion in self.emotion_keywords.keys()}
        
        for emotion, keywords in self.emotion_keywords.items():
            for keyword in keywords:
                # Count occurrences of each keyword
                keyword_count = cleaned_text.count(keyword)
                if keyword_count > 0:
                    base_score = keyword_count * 0.3
                    
                    # Check for intensity modifiers
                    for word in words:
                        if word in self.intensity_modifiers:
                            # Find the position of the modifier
                            word_index = words.index(word)
                            # Check if the keyword appears near the modifier
                            if word_index < len(words) - 1:
                                next_words = ' '.join(words[word_index:word_index+3])
                                if keyword in next_words:
                                    base_score *= self.intensity_modifiers[word]
                    
                    emotion_scores[emotion] += base_score
        
        return emotion_scores

    def get_contextual_boost(self, text: str, emotion: str) -> float:
        """Add contextual understanding to improve accuracy"""
        text_lower = text.lower()
        
        # Context patterns that boost certain emotions
        context_patterns = {
            'anxious': ['job interview', 'presentation', 'exam', 'test', 'meeting', 'first day', 'new job'],
            'excited': ['vacation', 'trip', 'party', 'celebration', 'promotion', 'new opportunity'],
            'sad': ['loss', 'breakup', 'end', 'goodbye', 'miss', 'alone'],
            'angry': ['unfair', 'injustice', 'betrayed', 'lied', 'cheated'],
            'confident': ['ready', 'prepared', 'bring it on', 'can do', 'will succeed'],
            'frustrated': ['stuck', 'not working', 'trying', 'attempt', 'effort']
        }
        
        boost = 0.0
        if emotion in context_patterns:
            for pattern in context_patterns[emotion]:
                if pattern in text_lower:
                    boost += 0.2
        
        return boost

    def analyze_emotion(self, text: str) -> Tuple[str, float]:
        """
        Analyze the emotion in the given text
        Returns: (emotion, confidence_score)
        """
        if not text or len(text.strip()) < 3:
            return "neutral", 0.3
        
        # Calculate base emotion scores
        emotion_scores = self.calculate_emotion_scores(text)
        
        # Add contextual boosts
        for emotion in emotion_scores:
            emotion_scores[emotion] += self.get_contextual_boost(text, emotion)
        
        # Find the emotion with highest score
        dominant_emotion = max(emotion_scores, key=emotion_scores.get)
        max_score = emotion_scores[dominant_emotion]
        
        # If no strong emotion is detected, return neutral
        if max_score < 0.1:
            return "neutral", round(random.uniform(0.3, 0.6), 2)
        
        # Calculate confidence based on score and text length
        text_length_factor = min(len(text) / 100, 1.0)  # Normalize to 0-1
        confidence = min(max_score + text_length_factor * 0.2, 1.0)
        
        # Add some randomness to make it more realistic
        confidence += random.uniform(-0.05, 0.05)
        confidence = max(0.1, min(0.95, confidence))  # Clamp between 0.1 and 0.95
        
        return dominant_emotion, round(confidence, 2)

    def get_emotion_suggestions(self, emotion: str) -> List[str]:
        """Get suggestions based on detected emotion"""
        suggestions = {
            'anxious': [
                "Try deep breathing exercises",
                "Break down the task into smaller steps",
                "Remember past successes you've had"
            ],
            'sad': [
                "It's okay to feel this way",
                "Consider talking to someone you trust",
                "Focus on self-care activities"
            ],
            'angry': [
                "Take a moment to cool down",
                "Try to understand the other perspective",
                "Channel this energy into positive action"
            ],
            'happy': [
                "Enjoy this positive moment",
                "Share your happiness with others",
                "Remember this feeling for tough times"
            ],
            'excited': [
                "Channel this energy productively",
                "Plan your next steps carefully",
                "Share your excitement with others"
            ]
        }
        
        return suggestions.get(emotion, ["Take time to reflect on your feelings"])
