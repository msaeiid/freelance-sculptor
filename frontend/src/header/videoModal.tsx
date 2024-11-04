import { useState } from "react";

interface VideoModal {
  props_video_src: string;
}

export function VideoModalComponent(props: VideoModal) {
  const { props_video_src } = props;
  const [videoSrc, setVideoSrc] = useState(props_video_src);

  return (
    <div
      onLoad={() => {
        setVideoSrc(props_video_src);
      }}
      className="modal fade"
      id="videoModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setVideoSrc("");
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            {/* 16:9 aspect ratio */}
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                className="embed-responsive-item"
                src={videoSrc}
                id="video"
                allow="autoplay"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
