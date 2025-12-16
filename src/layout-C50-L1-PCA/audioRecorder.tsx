"use client";

import { useState, useRef } from "react";

export default function AudioRecorder() {
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);
    };

    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  return (
    <div className="w-full flex justify-center items-center flex-col gap-5 p-5 bg-[#F8FCFA]">
      <h2 className="text-3xl font-bold text-black">Record Audio </h2>

      <div className="flex gap-4">
        <button
          onClick={startRecording}
          className="bg-green-600 cursor-pointer text-white px-5 py-2 rounded-lg"
        >
          Start Recording
        </button>

        <button
          onClick={stopRecording}
          className="bg-red-600 cursor-pointer text-white px-5 py-2 rounded-lg"
        >
          Stop Recording
        </button>
      </div>

      {audioURL && (
        <div className="mt-5 flex flex-col items-center gap-3">
          <audio controls src={audioURL} className="w-64"></audio>

          <a
            href={audioURL}
            download="recorded_audio.wav"
            className="bg-violet-900 cursor-pointer text-white px-4 py-2 rounded-lg"
          >
            Download Recording
          </a>
        </div>
      )}
    </div>
  );
}
