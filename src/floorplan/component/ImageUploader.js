import React from 'react';
import Viewer from './Viewer';
import '../../assets/css/uploadimg.css';

class ImageUpload extends React.Component {
    constructor(props) {
      super(props);
      this.state = {file: null,imagePreviewUrl: null};
    }
  
    _handleSubmit(e) {
      e.preventDefault();
      this.state.file === null ? alert("please add images") : alert("Ready to upload: " + this.state.file.name + ". Waiting for back-end API");
    }
  
    _handleImageChange(e) {
      this.setState({file: null, imagePreviewUrl: null})
      e.preventDefault();
      let file = e.target.files[0];
      let reader = new FileReader();

      if(typeof file!='undefined'){
        if(file.type==='image/jpeg'||file.type==='image/png'||file.type==='image/jpg'){
          reader.onloadend = () => {
            this.setState({
              file: file,
              imagePreviewUrl: reader.result
            });
          }
          reader.readAsDataURL(file)
        }else{
          this.setState({file: null, imagePreviewUrl: null});
          alert('please upload image files');
        }
      }
    }
    render() {
      let {imagePreviewUrl} = this.state;
      return (
        <div>
          <form onSubmit={(e)=>this._handleSubmit(e)}>
            <input className="fileInput" 
              type="file" accept="image/png, image/jpeg, image/jpg"
              onChange={(e)=>this._handleImageChange(e)} multiple/>
            <button className="submitButton" 
              type="submit"
              onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
          </form>
            {imagePreviewUrl === null ? false : true && <Viewer img={imagePreviewUrl}/>}
        </div>
      )
    }
  }

  export default ImageUpload;