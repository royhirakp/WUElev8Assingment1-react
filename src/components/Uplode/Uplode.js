import React, { useEffect, useState } from 'react'
import './Uplode.css'
// import S3FileUpload from 'react-s3';
import reactS3 from 'react-s3';
import VideoShow from '../VideoShow/VideoShow';
//Optional Import
// import { uploadFile } from 'react-s3';
// import axios from 'axios'
 
const config = {
    bucketName: 'video-uplode-bucket',
    dirName: 'photos', /* optional */
    region: 'us-east-1',
    accessKeyId: 'AKIA6LO5UIQRLWMRMN4D',
    secretAccessKey: '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',
}

const Uplode = () => {
  const [dragState, setDragState] = useState(false)
  useEffect(()=>{
   
  },[])
  function uplode(e){
    console.log(e.target.files[0])
    reactS3
    .uploadFile(e.target.files[0], config)
    .then(data => console.log(data))
    .catch(err => console.error(err))
    // axios.put('https://c02r0fdsca.execute-api.ap-southeast-2.amazonaws.com/stageone/test-three-te/file.jpeg')
    // .then(res=>console.log(res))

  }
  function onDrag(e){
    e.preventDefault()
    setDragState(true)
    console.log('on drag')
  }
  function onDrop(e){
    e.preventDefault()
    setDragState(false)
    console.log('ondrop',e.dataTransfer.files[0])

    reactS3
    .uploadFile(e.dataTransfer.files[0], config)
    .then(data => console.log(data))
    .catch(err => console.error(err))
  }

  return (
    <div  
    className='dropContainer'
    // id='styleforDrag'
    onDragOver={onDrag}
    // onDragOver={()=>console.log('on draaggg')}
    // // onDragExit={()=>console.log("darag out")}
    // onDragEnd={()=>console.log("darag out")}
    onDragLeave={()=>setDragState(false)}
    onDrop={onDrop}
    >
        <div className='dropdown'
          id={dragState ? "styleforDrag":""}
        >
        {dragState ? <>
          <h4 style={{color:"#ffff"}}>Drop Here</h4>
        </>:<>
        <h2>You Can uplode video </h2>
        <p>CLICK ON THE BUTTON OR DRAG AND DROP FILES HERE</p>
        </>}
        <label htmlFor="inputuserfile">select file</label>
      <input
      type="file"
      id='inputuserfile'
      hidden
      onChange={uplode} />
      </div>

      <VideoShow/>
    </div>
  )
}

export default Uplode;
