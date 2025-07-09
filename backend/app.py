from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from routes.emotion_routes import emotion_bp
from models.emotion_model import EmotionAnalyzer

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app, origins=["http://localhost:5173", "http://localhost:3000"])

# Register blueprints
app.register_blueprint(emotion_bp)

# Initialize emotion analyzer
analyzer = EmotionAnalyzer()

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "message": "Emotion Reflection API is running",
        "version": "1.0.0"
    })

@app.route('/status', methods=['GET'])
def get_status():
    return jsonify({
        "api_status": "active",
        "endpoints": {
            "analyze": "/analyze",
            "health": "/",
            "status": "/status"
        }
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "error": "Not found",
        "message": "The requested endpoint does not exist"
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "error": "Internal server error",
        "message": "Something went wrong on our end"
    }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('DEBUG', 'True').lower() == 'true'
    
    print(f"🚀 Starting Emotion Reflection API on port {port}")
    print(f"🔧 Debug mode: {debug}")
    print(f"🌐 CORS enabled for: http://localhost:5173")
    
    app.run(host='0.0.0.0', port=port, debug=debug)

# File: requirements.txt
Flask==2.3
Flask-CORS==4.0
python-dotenv==1.0
Werkzeug==2.3
click==8.1
itsdangerous==2.1
Jinja2==3.1
MarkupSafe==2.1
blinker==1.6