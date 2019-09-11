import React from 'react';
import Viewer from './Viewer';
import Url from '../../../components/Url';
import '../../../assets/css/uploadimg.css';

class ImageUpload extends React.Component {
    constructor(props) {
      super(props);
      this.state = {taskId: this.props.taskId, file: null,imagePreviewUrl: null, parent: this.props.parent};
    }
  
    _handleSubmit(e) {
      e.preventDefault();
      if(this.state.imagePreviewUrl !== null){
        let feedback = '';
        let formData = new FormData();
        formData.append('id', this.state.taskId)
        formData.append('image', this.state.file)
        fetch(Url.uploadImage,
          { method: 'POST', body: formData }
        )
          .then(res => res.json())
          .then(data => {
            feedback = data.Message;
            alert(feedback);
            this.state.parent.getData();
            this.state.parent.displayPoints();
          })
          .catch(e => console.log('error:', e))
        }else
          alert('please add a image file.');
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
        <div className='submitForm'>
          <form className="form" onSubmit={(e)=>this._handleSubmit(e)}>
            <input className="fileInput" 
              type="file" accept="image/png, image/jpeg, image/jpg"
              onChange={(e)=>this._handleImageChange(e)} multiple/>
            <button className="submitButton" 
              type="submit"
              onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
          </form>
            {imagePreviewUrl !== null && <Viewer img={imagePreviewUrl} source="uploader"  x = {this.props.x} y = {this.props.y} info = {this.props.info} floorID={this.props.floorID} floorplan={this.props.floorplan}/>}
            {imagePreviewUrl === null && <div className="photo-info">
            <h2 id="simple-modal-title">Task Information: </h2>
            <p id="simple-modal-description">
              x: {this.props.x} y: {this.props.y}
            </p>
            <p> {this.props.info}</p>
          </div>}
        </div>
      )
    }
  }

  export default ImageUpload;