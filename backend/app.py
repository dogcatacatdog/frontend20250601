from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS
from pydub import AudioSegment
import os
import uuid

# ffmpeg 경로 강제 지정
AudioSegment.converter = r"C:\Program Files (x86)\ffmpeg\bin\ffmpeg.exe"

UPLOAD_FOLDER = 'uploads'
CONVERTED_FOLDER = 'converted'

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(CONVERTED_FOLDER, exist_ok=True)

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and file.filename.lower().endswith('.wav'):
        filename = f"{uuid.uuid4()}.wav"
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)

        # Convert to mp3
        try:
            audio = AudioSegment.from_wav(filepath)
            mp3_filename = filename.replace('.wav', '.mp3')
            mp3_filepath = os.path.join(CONVERTED_FOLDER, mp3_filename)
            audio.export(mp3_filepath, format="mp3")
        except Exception as e:
            return jsonify({'error': f'Conversion failed: {str(e)}'}), 500

        return jsonify({'mp3_file': mp3_filename}), 200
    else:
        return jsonify({'error': 'Invalid file type'}), 400

@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    return send_from_directory(CONVERTED_FOLDER, filename, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)