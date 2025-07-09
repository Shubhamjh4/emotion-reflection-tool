from flask import Blueprint, request, jsonify
from models.emotion_model import EmotionAnalyzer
import time

# Create blueprint
emotion_bp = Blueprint('emotion', __name__)

# Initialize the emotion analyzer
analyzer = EmotionAnalyzer()

@emotion_bp.route('/analyze', methods=['POST'])
def analyze_emotion():
    """
    Analyze emotion from text input
    Expected JSON: {"text": "I feel nervous about my first job interview"}
    Returns: {"emotion": "anxious", "confidence": 0.85}
    """
    try:
        # Get JSON data from request
        data = request.get_json()
        
        # Validate input
        if not data:
            return jsonify({
                "error": "No data provided",
                "message": "Please provide JSON data with 'text' field"
            }), 400
        
        if 'text' not in data:
            return jsonify({
                "error": "Missing text field",
                "message": "Please provide 'text' field in JSON data"
            }), 400
        
        text = data['text']
        
        # Validate text content
        if not isinstance(text, str):
            return jsonify({
                "error": "Invalid text format",
                "message": "Text must be a string"
            }), 400
        
        if len(text.strip()) < 3:
            return jsonify({
                "error": "Text too short",
                "message": "Please provide at least 3 characters"
            }), 400
        
        if len(text) > 1000:
            return jsonify({
                "error": "Text too long",
                "message": "Please limit text to 1000 characters"
            }), 400
        
        # Add realistic delay for processing
        time.sleep(1.5)
        
        # Analyze emotion
        emotion, confidence = analyzer.analyze_emotion(text)
        
        # Get suggestions (optional)
        suggestions = analyzer.get_emotion_suggestions(emotion)
        
        # Return analysis result
        response = {
            "emotion": emotion,
            "confidence": confidence,
            "suggestions": suggestions,
            "text_length": len(text),
            "processed_at": time.time()
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        print(f"Error in emotion analysis: {str(e)}")
        return jsonify({
            "error": "Internal server error",
            "message": "Failed to analyze emotion"
        }), 500

@emotion_bp.route('/emotions', methods=['GET'])
def get_available_emotions():
    """Get list of available emotions that can be detected"""
    emotions = list(analyzer.emotion_keywords.keys())
    return jsonify({
        "available_emotions": emotions,
        "total_count": len(emotions)
    })

@emotion_bp.route('/test', methods=['GET'])
def test_analyzer():
    """Test endpoint to verify analyzer is working"""
    test_texts = [
        "I feel nervous about my first job interview",
        "I am so excited about my vacation",
        "I feel sad and lonely today",
        "I am really angry about this situation"
    ]
    
    results = []
    for text in test_texts:
        emotion, confidence = analyzer.analyze_emotion(text)
        results.append({
            "text": text,
            "emotion": emotion,
            "confidence": confidence
        })
    
    return jsonify({
        "test_results": results,
        "analyzer_status": "working"
    })
