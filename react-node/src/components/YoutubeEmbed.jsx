import React from "react";
import PropTypes from "prop-types";
import "./YoutubeEmbed.css";

const YoutubeEmbed = ({ embedId }) => {
  YoutubeEmbed.propTypes = { embedId: PropTypes.string.isRequired };
  return (
    <div className="video-responsive">
      <iframe
        width="1470"
        height="630"
        src={`https://www.youtube.com/embed/${embedId}`}
        title="Queen of Tears | Official Trailer | Netflix [ENG SUB]"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default YoutubeEmbed;
