import { useRef, useState, useEffect } from "react";

const useAudio = () => {
  const audioRef = useRef(new Audio());
  const [playing, setPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  const updateSource = (src, id) => {
    setCurrentTrack(id);
    audioRef.current.src = src;
    audioRef.current.volume = 0.5;
    audioRef.current.load();
    audioRef.current.addEventListener("canplay", () => {
      setPlaying(true);
      audioRef?.current?.play();
    });
  };

  const resetAudio = () => {
    setPlaying(false);
    setCurrentTrack(null);
    audioRef.current.src = "";
    audioRef?.current.load();
  };

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audioRef?.current?.play() : audioRef?.current?.pause();
  }, [playing]);

  useEffect(() => {
    const currentAudio = audioRef.current;
    currentAudio.addEventListener("ended", () => setPlaying(false));
    return () => {
      currentAudio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return {
    playing,
    setPlaying,
    toggle,
    updateSource,
    resetAudio,
    currentTrack,
  };
};

export default useAudio;
