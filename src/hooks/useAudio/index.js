import { useRef, useState, useEffect } from 'react';

const useAudio = () => {
  const audioRef = useRef(new Audio());
  const [playing, setPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  const updateSource = (src, id) => {
    setCurrentTrack(id);
    audioRef.current.src = src;
    audioRef.current.load();
    audioRef.current.addEventListener('canplay', () => {
      setPlaying(true);
      audioRef?.current?.play();
    });
  };

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audioRef?.current?.play() : audioRef?.current?.pause();
  }, [playing]);

  useEffect(() => {
    const currentAudio = audioRef.current;
    currentAudio.addEventListener('ended', () => setPlaying(false));
    return () => {
      currentAudio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return { playing, toggle, updateSource, currentTrack };
};

export default useAudio;
