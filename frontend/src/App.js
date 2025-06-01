import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [convertedFile, setConvertedFile] = useState('');
  const [status, setStatus] = useState('');
  const [isConverting, setIsConverting] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setConvertedFile('');
    setStatus('');
  };

  const handleConvert = async () => {
    if (!file) {
      setStatus('파일을 선택하세요.');
      return;
    }
    setIsConverting(true);
    setStatus('변환 중...');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setConvertedFile(data.mp3_file);
        setStatus('변환이 완료되었습니다.');
      } else {
        setStatus(data.error || '변환 실패');
      }
    } catch (err) {
      setStatus('서버 오류');
    }
    setIsConverting(false);
  };

  const handleDownload = () => {
    window.open(`http://localhost:5000/download/${convertedFile}`, '_blank');
  };

  return (
    <div className="main-content" style={{ textAlign: 'center' }}>
      <h1>WAV to MP3 변환기</h1>
      <input
        type="file"
        accept=".wav"
        onChange={handleFileChange}
        disabled={isConverting}
      />
      <br /><br />
      <button onClick={handleConvert} disabled={!file || isConverting}>
        변환하기
      </button>
      <br /><br />
      {status && <div>{status}</div>}
      {convertedFile && (
        <button onClick={handleDownload} style={{ marginTop: 16 }}>
          다운로드하기
        </button>
      )}
      <img
        src={process.env.PUBLIC_URL + '/cat.png'}
        alt="cat"
        className="cat-image-fixed"
      />
    </div>
    
  );
}

export default App;