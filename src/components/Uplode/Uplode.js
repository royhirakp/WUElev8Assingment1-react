import React, {  useState } from 'react'
import axios from 'axios'
// import S3FileUpload from 'react-s3';
// import reactS3 from 'react-s3';
import './Uplode.css'
// import VideoShow from '../VideoShow/VideoShow';
import BackupSharpIcon from '@mui/icons-material/BackupSharp';

// const config = {
  // bucketName: 'user-test-bucket-fu',
  // dirName: 'photos', /* optional */
  // region: 'ap-south-1', //
  // accessKeyId: 'AKIA6LO5UIQRE2SUCVGZ',//AKIA6LO5UIQRF7H22YFL
  // secretAccessKey: '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',
// }
//ST83uGpppkI/xwBJh2wXZLjI1UpsDLfA0LHsQaMM   //AKIA6LO5UIQRK2JLZOK7
// Size range for the video 
const minimum_paylode = 5000000 // bytes = 5mb
const max_Playlode = 1000000000 // bytes = 1gb

/* ENTER YOUR ENDPOINT HERE */

const API_ENDPOINT = 'https://b6vf5apn1i.execute-api.ap-southeast-2.amazonaws.com/api-stage-four/file-uplode-four/uploads'
//singdurl api
  // reactS3
  //   .uploadFile(e.dataTransfer.files[0], config)
  //   .then(data => console.log(data))
  //   .catch(err => console.error(err))
//https://final-bucket-26th-march.s3.ap-southeast-2.amazonaws.com/8880274.jpg?AWSAccessKeyId=ASIA6LO5UIQRGUDWQXOM&Content-Type=image%2Fjpeg&Expires=1679854859&Signature=p1%2BNTFH99Jir%2Fl2bU0izraBBl3w%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEEIaDmFwLXNvdXRoZWFzdC0yIkYwRAIgettiX6h6%2FfILFBDIpgfNpNdCFykCa%2F4AMx0FkYMOqfYCIEX%2Bo7QAYZqGK7bX%2FkLhT8dA5f9qWVQcFjjgj9jabtsGKvUCCBsQABoMOTg2Njk2NjY0MDk4IgxvpOfkNT2dRXpg5cMq0gKdNjsiqle3kws7tj3tokdErlGS3z7HAQj6Q2oMzi08cxCrMckJK4ZD%2F%2F7e1ztt%2F7aP1fGltlsdbubVCJl30KKH4p10zra8OHnzCkZNd%2BMXady%2BcDulYh9rok8bp5%2BofGJGG0RblxsjSkrS9J90Cv1db8MttggMT1BRUfA2DHHZOM1gmmKBtRpYFGBjt8V40u4OZcaQoAlRdjBRimKIzOHEIu%2BIqktBM6vu27Xnaaf8HtePDpo%2FU%2F8j7dKXdLbum7gy9RMCNoybg8iEvspaG%2FVTxywVm8OaQgm9UmnICZ6TiUtKPB8wJEFnP%2FjB30rSWbo%2BFMd6UWSQ0WkALW1HSoB0VWPN1jjNBeXUZ0iu7fEkKrcZnCdLYwS%2FwXXwp2uOkobZwTx6mdDDMuMYKS8bFLcM9NKktQn8msQg9CzZ7m5eDQX9IsRTmNiAstm4esWqZdZGsDDfl4KhBjqfAZru8LXMIFYYkGAz%2F1BD9m2IaPP5BWPFq2uhiJc2lKW3FImg65%2B0IJpKvaNtvzeE0fol3lmQKp3p8%2B85AQL0Gxfji3wgAsXQW28sZHlR93scVsn5%2F3RtEp%2BOKUoDshv4EJ2XRlCSkikipN33TrxCtZsSt5Y4qJta9FtAfHpDHXonYrlNuOaGEFcvwGMs8A6428T3VMCTf9s%2FCGzdTVY5gg%3D%3D
const Uplode = () => {
  const [dragState, setDragState] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0);
  const [data, setData] = useState('')
  const [progressbar, setProgressBar] = useState(false)

  function createVideo(file) {
    // var image = new Image()
    let reader = new FileReader()
    reader.onload = (e) => {
      console.log('length: ', e.target.result.includes('data:video/mp4'))
      if (!e.target.result.includes('data:video/mp4')) {
        return alert('Wrong file type - video/mp4.')
      }
      if (file.size > max_Playlode) {
        return alert('video is loo large.')
      }
      if (file.size < minimum_paylode) {
        return alert('video is loo small.')
      }
      setData(e.target.result)
    }
    reader.readAsDataURL(file)
  }
  //************************************************************************** */
  async function uplode(e) {
    try {
      if (e) e.preventDefault()
      setDragState(false)
      setProgressBar(true)
      let files = e.target.files ? e.target.files : e.dataTransfer.files
      console.log(files[0].size)
      if (!files.length) return
      createVideo(files[0])

      // Get the presigned URL
      const response = await axios({
        method: 'GET',
        url: API_ENDPOINT
      })

      let binary = atob(data.split(',')[1])
      let array = []
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i))
      }
      let blobData = new Blob([new Uint8Array(array)], { type: 'video/mp4' })
      // console.log('Uploading to: ', response.uploadURL)
      const result = axios({
        method: 'put',
        headers: {
          "Content-Type": "video/mp4"
        },
        url: response.uploadURL,
        data: blobData
      },
        //logic for progress barr
        {
          onUploadProgress: (e) => {
            const progress = Math.round(
              (e.loaded / e.total) * 100
            );
            setUploadProgress(progress);
          },
        });
      console.log('Result: ', result)
      // Final URL for the user doesn't need the query string params
      // this.uploadURL = response.uploadURL.split('?')[0]

      //SINGED URL
      // console.log('buttion clik bt uolofe function')
      // console.log(e.target.files[0])
      // createImage(e.target.files[0])
      // axios.put('https://b6vf5apn1i.execute-api.ap-southeast-2.amazonaws.com/api-stage-four/file-uplode-four',{
      //   onUploadProgress: (progressEvent) => {
      //     const progress = Math.round(
      //       (progressEvent.loaded / progressEvent.total) * 100
      //     );
      //     setUploadProgress(progress);
      //   },
      // })
      // .then(res=>console.log(res))
      // .catch(err=>console.log(err))

    } catch (error) {
      console.log(error)
    }
    setProgressBar(false)
  }

  function onDrag(e) {
    e.preventDefault()
    setDragState(true)
    console.log('on drag')
  }




  
  return (
    <>
      <div
        className='dropContainer'
      >
        <div className='dropdown'
          id={dragState ? "styleforDrag" : ""}
        >
          <div
            onDragOver={onDrag}
            onDragLeave={() => setDragState(false)}
            onDrop={uplode}
          >
            {dragState ? <>
              <h4 style={{ color: "#ffff" }}>Drop Here</h4>
            </> : <>
              <h1><b>You Can uplode Video </b></h1>
              <p className='text-of-drop'>CLICK ON THE BUTTON OR DRAG AND DROP FILES HERE</p>
            </>}

            <label htmlFor="inputuserfile"><div className='UPLODElogoDiv'>
              <BackupSharpIcon />
            </div>
              <p className='lablename'> select file</p>
            </label>
            <input
              type="file"
              id='inputuserfile'
              hidden
              onChange={uplode} />
          </div>

        </div>
        <div>
          {progressbar ? <>
              <>uploding status: </> &ensp;
              {uploadProgress < 100 && (
                <progress value={uploadProgress} max="100">
                  uploding:  &ensp;{uploadProgress}%
                </progress>
              )}
          </>:""}
        </div>
        
        

        {/* <VideoShow /> */}
      </div>

    </>
  )
}

export default Uplode;
