// import React, { Fragment, useState } from 'react';
// import Message from './Message';
// import Progress from './Progress';
// import axios from 'axios';

// const FileUpload = () => {
//   const [file, setFile] = useState('');
//   const [upload, setUpload] = useState('');
//   const [filename, setFilename] = useState(' ');
//   const [uploadedFile, setUploadedFile] = useState({});
//   const [message, setMessage] = useState('');
//   const [uploadPercentage, setUploadPercentage] = useState(0);
//   const [fileURL,seFiletURL]=useState("");
//   const [detection,setDetection]=useState("");
//   const [disease,setDisease]=useState("");
//   const [desc,setDesc]=useState("");
//   const onChange = e => {
//     setFile(e.target.files[0]);
//     setFilename(e.target.files[0].name);
//   };

//   const onSubmit = async e => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const res = await axios.post('http://localhost:3000/grape', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         },
//         onUploadProgress: progressEvent => {
//           setUploadPercentage(
//             parseInt(
//               Math.round((progressEvent.loaded * 100) / progressEvent.total)

//             )
//           );
//         }
//       }).then((response)=>{setShow(!show);setDesc(response.data.pesticides);setDetection(response.data.disease);seFiletURL(response.data.path);console.log(response.data)}).catch((err)=>{console.log("Fail")});
      
//       // Clear percentage
//       setTimeout(() => setUploadPercentage(0), 10000);

//       const { fileName, filePath } = res.data;

//       setUploadedFile({ fileName, filePath });

//       setMessage('File Uploaded');
//     } catch (err) {
      
//         setMessage('There was a problem with the server');
      
//       setUploadPercentage(0)
//     }
//   };
//  const[show,setShow]=useState(false);
//   return (
//     <Fragment>
//       {message ? <Message msg={message} /> : null}
//       <form onSubmit={onSubmit}>
//         <div className='custom-file mb-4'>
//           <input
//             type='file'
//             className='custom-file-input'
//             class='form-control form-control-lg'
//             id='customFile'
//             accept="image/*"
//             onChange={onChange}
//           />
//           <label className='custom-file-label' class="form-label" htmlFor='customFile'>
//             {filename}
//           </label>
//         </div>

//         <Progress percentage={uploadPercentage} />
//  {
//         show?<div class="card container mt-5 pt-2" style={{width:"18em"}}>
//   <img src={`../${fileURL}`} class="card-img-top" alt="..."/>
//   <h3>{detection}</h3>
//   <div class="card-body">
//     <p class="card-text">{desc}</p>
//   </div>
// </div>:null
//       }
//         <input
//           type='submit'
//           value='Upload'
//           class='btn btn-primary btn-block mt-4'
           
//         />
//       </form>
//       {uploadedFile ? (
//         <div className='row mt-5'>
//           <div className='col-md-6 m-auto'>
//             <h3 className='text-center'>{uploadedFile.fileName}</h3>
//             <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
//           </div>
//         </div>
//       ) : null}
//     </Fragment>
//   );
// };

// export default FileUpload;