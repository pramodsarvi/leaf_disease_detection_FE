// import React from 'react';
import React, { Fragment, useState } from 'react';
import Message from './components/Message';
import Progress from './components/Progress';
import axios from 'axios';
// import FileUpload from './components/FileUpload';
import './App.css';

const App = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState(' ');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [api, setApi] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [fileURL,setFileURL]=useState("");
  const [detection,setDetection]=useState("");
  // const [disease,setDisease]=useState("");
  const [desc,setDesc]=useState("");
  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    console.log(api+"!")
    try {
      const res = await axios.post(`${api}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)

            )
          );
        }
      }).then((response)=>{setShow(!show);setDesc(response.data.pesticides);setFileURL(response.data.url);setDetection(response.data.disease);console.log(response.data)}).catch((err)=>{console.log("Fail")});
      
      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 10000);

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded');
    } catch (err) {
      
        setMessage('There was a problem with the server');
      
      setUploadPercentage(0)
    }
  };
  const rchange=(e)=>{
    var check=e.target.value
    if (check==="potato")
    {
      setApi('https://farmassistprod.herokuapp.com/potato');
      console.log(api)
    }
    else if(check==="grape")
    {
      setApi('https://farmassistprod.herokuapp.com/grape')
      console.log(api)

    }
    else if(check==="tomato")
    {
      setApi('https://farmassistprod.herokuapp.com/tomato')
      console.log(api)

    }
    else if(check==="apple")
    {
      setApi('https://farmassistprod.herokuapp.com/apple')
      console.log(api)

    }
    // console.log(api+"aaaaaaaaa")
  }
 const[show,setShow]=useState(false);
 return(
  <>
    <div className='container mt-4'>
     
     <div className="radiobtn1">
       <h1 class="display-4">Select Plant</h1>
     </div>
                
                <div className="radiobtn">
     <div class="form-check">
       <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="potato" onChange={rchange} />
       <label class="form-check-label me-5" for="exampleRadios1">
         Potato
       </label>
     </div>
     <div class="form-check">
       <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="tomato" onChange={rchange} />
       <label class="form-check-label me-5" for="exampleRadios2">
       Tomato
       </label>
     </div>
     <div class="form-check disabled">
       <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="apple" onChange={rchange}/>
       <label class="form-check-label me-5" for="exampleRadios3">
         Apple
       </label>
     </div>
     <div class="form-check">
       <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="corn"onChange={rchange}/>
       <label class="form-check-label me-5" for="exampleRadios2">
         Corn
       </label>
     </div>
     <div class="form-check disabled">
       <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="grape" onChange={rchange}/>
       <label class="form-check-label me-5" for="exampleRadios3">
         Grapes
       </label>
     </div>
          </div>
      
         <div className="ani">    
           <h4 className='display-4 text-center mb-4'>
           <i className='fab fa-react' /> 
         </h4>
         <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            class='form-control form-control-lg'
            id='customFile'
            accept="image/*"
            onChange={onChange}
          />
          <label className='custom-file-label' class="form-label" htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />
 {
        show?<div class="card container mt-5 pt-2" style={{width:"18em"}}>
  <img src={fileURL} class="card-img-top" alt="..."/>
  <h3>{detection}</h3>
  <div class="card-body">
    <p class="card-text">{desc}</p>
    {/* {fileURL} */}
  </div>
</div>:null
      }
        <input
          type='submit'
          value='Upload'
          class='btn btn-primary btn-block mt-4'
           
        />
      </form>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
    </Fragment>
         </div>
     
        {api}
       </div>
   
  </>)
  ;
 
 };

export default App;
