import React, { useRef, useState } from 'react'
import { IoAddCircle } from "react-icons/io5";

export default function UploadBox({setInvestigate, image , setImage}) {



  const imageInputRef = useRef(null)

  const handleImages = (e) => {
    console.log(e)
    let img = e.target.files[0];
    if (img.length = 1) {
        if(
          img.type !== "image/jpeg" &&  
          img.type !== "image/png" &&
          img.type !== "image/webp" && 
          img.type !== "image/gif"
          ){
          console.log("Image Format not supported")
          // files = files.filter((item) => item.name !== img.name);
          return;
        }else if(img.size > 1024 * 1024 * 5){
          console.log("Too large. Files should be smaller then 5mb.");
          // files = files.filter((item) => item.name !== img.name);
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload=(readerEvent)=>{
          setImage(readerEvent.target.result)
        };
    
    }else{
       console.log("Please choose ")
       setImage();
    }
      
    } 

  return (
    <div id='UploadBox'>
      

      {
        !image &&
        <>
        <IoAddCircle onClick={()=>{imageInputRef.current.click()}}  id='Plusicons'>
        </IoAddCircle>
        <input type="file" accept="image/jpeg,image/png,image/webp,image/gif"  hidden  ref={imageInputRef} onChange={handleImages}/>
        <h2>Upload a photo for analysis</h2>
        </>
      }

      {
        image &&
        <>
        <img id='SelectedfILE' src={image} alt="" />
        <div>
        <button id='ClearButton'  onClick={()=>{setImage()}}>Clear</button>
        <button id='SendButton' onClick={()=>{setInvestigate(true)}}>Investigate</button>
        </div>
        </>
      }
      <h4>NoCheat Demo Beta v0.01</h4>
    </div>
  )
}
