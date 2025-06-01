from pydub.generators import Sine
from pydub import AudioSegment
import os

AudioSegment.converter = r"C:\Program Files (x86)\ffmpeg\bin\ffmpeg.exe"  # ffmpeg.exe의 실제 경로로 수정

uploads_folder = "uploads"
converted_folder = "converted"
wav_filename = "test_10s.wav"
wav_path = os.path.join(uploads_folder, wav_filename)

if not os.path.exists(wav_path):
    print(f"{wav_path} 파일이 존재하지 않습니다.")
else:
    audio = AudioSegment.from_wav(wav_path)
    mp3_filename = wav_filename.replace('.wav', '_convert.mp3')
    mp3_path = os.path.join(converted_folder, mp3_filename)
    audio.export(mp3_path, format="mp3")
    print(f"{mp3_path} 파일로 변환 완료!")