import React from 'react';

import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import Viewer from './Viewer';
import Url from '../../../components/Url';
import '../../../assets/css/uploadimg.css';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
    padding: '12px',
    'margin-left': '10px',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskId: this.props.taskId,
      file: null,
      imagePreviewUrl: null,
      parent: this.props.parent,
      loading:false,
      success:false,
    };
  }

  _handleSubmit(e) {
    e.preventDefault();
    if (this.state.imagePreviewUrl !== null) {
      this.setState({loading:true,})

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
          this.setState({loading:false,success:true,})
          alert(feedback);
          this.state.parent.getData();
          this.state.parent.displayPoints();
        })
        .catch(e => console.log('error:', e))
    } else
      alert('please add a image file.');
  }

  _handleImageChange(e) {
    this.setState({ file: null, imagePreviewUrl: null })
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();

    if (typeof file != 'undefined') {
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
        reader.readAsDataURL(file)
      } else {
        this.setState({ file: null, imagePreviewUrl: null });
        alert('please upload image files');
      }
    }
  }
  render() {
    const { classes } = this.props;
    const buttonClassname = clsx({
      [classes.buttonSuccess]: this.state.success,
    });

    let { imagePreviewUrl } = this.state;
    return (
      <div className='submitForm'>
        <form className="form" onSubmit={(e) => this._handleSubmit(e)}>
        <div className={classes.root}>
        <input className="fileInput"
            type="file" accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => this._handleImageChange(e)} multiple />
      {/* Submit button with Circular Indeterminate */}
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={this.state.loading}
          onClick={(e) => this._handleSubmit(e)}
        >
          Upload Image
        </Button>
        {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
      </div>
        </form>
        {imagePreviewUrl !== null &&
          <Viewer
            setRate={this.props.setRate}
            img={imagePreviewUrl}
            source="uploader"
            x={this.props.x}
            y={this.props.y}
            info={this.props.info}
            floorID={this.props.floorID}
            floorplan={this.props.floorplan}
            photoInfo={this.props.photoInfo} />
          }
        {imagePreviewUrl === null &&
          <div className="photo-info">
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

ImageUpload.propTypes= {
  classes: PropTypes.object.isRequired,
}


export default withStyles(styles)(ImageUpload);