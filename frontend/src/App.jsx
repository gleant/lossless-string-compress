import React, { useState } from "react";
import { useCompressApi, useDecompressApi } from "./fetchHooks";
import logo from "./logo.svg";
import "./app.css";

function App() {
  const [compressText, setCompressText] = useState("");
  const [decompressText, setDecompressText] = useState("");

  const [compressedData, setDataToCompress] = useCompressApi();

  const [decompressedData, setDataToDecompress] = useDecompressApi();

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-h1">Lossless string compression</h1>
      </div>
      <div className="App-content">
        <div className="App-compress">
          <h2 className="App-h2">Compress</h2>
          <div className="App-columns">
            <div className="App-left-column App-column">
              <label htmlFor="compressTextarea">
                Input text to compress. Please, one word per line.
                <textarea
                  id="compressTextarea"
                  onChange={e => setCompressText(e.target.value)}
                  defaultValue={compressText}
                  placeholder="Input text to compress"
                />
              </label>
              <div className="App-actions">
                <input
                  type="submit"
                  onClick={() => setDataToCompress(compressText)}
                  value="Compress"
                  className="App-submit"
                />
              </div>
            </div>
            <div className="App-right-column App-column">
              <h3 className="App-h3">Compression result</h3>
              <div className="App-result">{compressedData}</div>
            </div>
          </div>
        </div>
        <div className="App-decompress">
          <h2 className="App-h2">Decompress</h2>
          <div className="App-columns">
            <div className="App-left-column App-column">
              <label htmlFor="compressTextarea">
                Input text to decompress. Please, input only delta encoded
                string.
                <textarea
                  onChange={e => setDecompressText(e.target.value)}
                  defaultValue={decompressText}
                  placeholder="Input text to decompress"
                />
              </label>
              <div className="App-actions">
                <input
                  type="submit"
                  onClick={() => setDataToDecompress(decompressText)}
                  value="Decompress"
                  className="App-submit"
                />
              </div>
            </div>
            <div className="App-right-column App-column">
              <h3 className="App-h3">Decompression result</h3>
              <div className="App-result">{decompressedData}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
