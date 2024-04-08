import styles from "./VideoRecorder.module.css";
import ReplayIcon from "@mui/icons-material/Replay";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import PauseIcon from "@mui/icons-material/Pause";

const PostControls = (props) => {
  const [playing, setPlaying] = useState(false);
  const playHandler = () => {
    setPlaying(true);
    props.playHandler("play");
  };
  const pauseHandler = () => {
    setPlaying(false);
    props.playHandler("pause");
  };
  return (
    <div className={styles.controlsWrapper}>
    <div className={styles.controls}>
      <button
        className={styles.buttonsWhite}
        onClick={(e) => props.SetRecordingHandler("def")}
      >
        <ReplayIcon />
      </button>
      {!playing && (
        <button
          style={{ color: "white" }}
          className={styles.button}
          onClick={playHandler}
        >
          <PlayArrowIcon />
        </button>
      )}
      {playing && (
        <button
          style={{ color: "white" }}
          className={styles.button}
          onClick={pauseHandler}
        >
          <PauseIcon />
        </button>
      )}

      <button
        className={styles.buttonsWhite}
        onClick={(e) => props.submitHandler()}
      >
        <CheckIcon />
      </button>
    </div>
    
    </div>
  );
};
export default PostControls;
