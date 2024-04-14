import React from 'react';

const ImageWithBoundingBoxes = ({ imageUrl, imageWidth, imageHeight, predictions }) => {
  console.log(imageHeight)
  const renderBoundingBoxes = () => {
    return predictions.map((prediction, index) => {
      const { x, y, width, height, class: className, confidence } = prediction;
      return (
        <div
          key={index}
          style={{position:"absolute",height:`${height}px`,width:`${width}px`, left:`${x-width/2}px`, top:`${y-height/2 + 20}px`,border: "1px solid white"}}
        >
          <span style={{ position: 'absolute', top: '-15px', left: '0', backgroundColor: 'green', color: 'white', padding: '2px 5px', fontSize: '12px', borderRadius: '3px' }}>
            {`${className}: ${confidence.toFixed(2)}`}
          </span>
        </div>
      );
    });
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img id='ImageOfResult' style={{height:`${imageHeight}px`,width:`${imageWidth}px`}} src={imageUrl} alt="Detection Result"  />
      {renderBoundingBoxes()}
    </div>
  );
};

export default ImageWithBoundingBoxes;
