import React, { useEffect, useState } from "react";
import "./ResultBox.css";
import { ColorRing } from "react-loader-spinner";

import axios from "axios";
import ImageWithBoundingBoxes from "./ImageWithBoundingBox";

export default function ResultBox({ image,setInvestigate,setImage }) {
  const [Loading, setLoading] = useState(true);
  const [Result2, setResult2] = useState(false);
  const [Result3, setResult3] = useState(false);

  const makeAxiosCall = (url) => {
    return axios({
      method: "POST",
      url: url,
      params: {
        api_key: "0NcNgOec2BBRs5CCzCpJ",
      },
      data: image,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };

  useEffect(() => {
    if ( !Result2 && !Result3) {
      Promise.all([
        makeAxiosCall("https://detect.roboflow.com/exam-monitoring-system-v2/2"),
        makeAxiosCall("https://detect.roboflow.com/offline-exam-monitoring/8"),
      ])
        .then(function (responses) {
          setResult2(responses[0].data);
          setResult3(responses[1].data);
          setLoading(false);
        })
        .catch(function (error) {
          setLoading(false);
          console.log(error.message);
        });
    }
  }, [ Result2, Result3]);



  const dothis=()=>{
    setInvestigate(false)
    setImage()
  }
  return (
    <div id="ResultBoxId">
      {Loading && (
        <>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["white", "white", "white", "white", "white"]}
          />
          <h3>Investigating</h3>
          <h6>Test Completed 0 out of 2.</h6>
        </>
      )}

      {Result2 &&Result3 && (
        <>
        <h2 id="ResultHeader">Showing Result 2 out of 2.</h2>

<ImageWithBoundingBoxes
          imageUrl={image}
          imageWidth={Result2?.image?.width}
          imageHeight={Result2?.image?.height}
          predictions={Result2?.predictions}
        />

<ImageWithBoundingBoxes
          imageUrl={image}
          imageWidth={Result3?.image?.width}
          imageHeight={Result3?.image?.height}
          predictions={Result3?.predictions}
        />


        <button id="BackButtonInresult" onClick={()=>{dothis()}}>Back</button>
        </>

        
      )}
    </div>
  );
}
