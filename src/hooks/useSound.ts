import { useEffect, useRef } from "react";
import { Howl } from "howler";

export const useSound = (soundUrl: string, loop = false) => {
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [soundUrl],
      loop: loop,
      volume: 0.4,
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, [loop, soundUrl]);

  const playSound = () => {
    if (soundRef.current) {
      soundRef.current.play();
    }
  };

  const stopSound = () => {
    if (soundRef.current) {
      soundRef.current.stop();
    }
  };

  return { playSound, stopSound };
};
