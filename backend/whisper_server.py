from flask import Flask, request, jsonify
from flask_cors import CORS
import whisper
import tempfile
import os

# Initialize Flask app and Whisper model
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
model = whisper.load_model("base")

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    try:
        # Check if file was uploaded
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        audio_file = request.files['file']
        
        if audio_file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
             
        # Create a temporary file to save the uploaded audio
        with tempfile.NamedTemporaryFile(delete=False, suffix='.webm') as temp_audio:
            audio_file.save(temp_audio.name)
            temp_path = temp_audio.name
        
        try:
            # Transcribe the audio using Whisper
            result = model.transcribe(temp_path)
            return jsonify({'transcription': result['text']})
            
        finally:
            # Clean up the temporary file
            os.unlink(temp_path)
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)