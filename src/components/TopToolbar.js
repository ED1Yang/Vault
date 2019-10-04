import React from 'react';
import Popup from 'react-popup';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Cookies from 'universal-cookie';

import  SearchInput  from './SearchInput';
import Url from './Url';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

let file = typeof undefined;
let clientId = '';

const cookie = new Cookies();

const UsersToolbar = props => {
  const { className } = props;
  const classes = useStyles();
  const [state, setState] = React.useState({ clientid: '', file: '',});

  const search = "Search "+ props.title;

  const handleChange = clientid => event => {
    clientId = event.target.value;
    setState({
      clientid: event.target.value,
    });
  };

  const _handleImageChange = (e) => {
    setState({ file: null})
    e.preventDefault();
    file = e.target.files[0];
    if (typeof file != 'undefined') {
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
          setState({file: file});
      } else {
        setState({ file: null});
        file = typeof undefined;
        alert('please upload image files');
      }
    }
  }

  const clickHandler = (e) => {
    if(props.title === 'project' && props.admin === 'true'){
      let clientList = [];
      fetch(Url.getClientList+cookie.get('userID'),
        { method: 'GET' }
      )
        .then(res => res.json())
        .then(data => {
          clientList = data;
          Popup.create({
            title: 'Add new project',
            content: <form className={classes.container} noValidate autoComplete="off">
                      <TextField
                        id="addProjectTitle"
                        label="Project title"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                      />
                      <TextField
                        id="addProjectDetails"
                        multiline
                        rows="4"
                        placeholder="Project info here..."
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                      />
                      <input id='addProjectFile' className="fileInput" type="file" onChange={(e) => _handleImageChange(e)} accept="image/png, image/jpeg, image/jpg" multiple />
                      <FormControl required className={classes.formControl}>
                        <InputLabel htmlFor="client-native-required">Client</InputLabel>
                        <Select
                          native
                          value={state.client}
                          onChange={handleChange('client')}
                          name="client"
                          inputProps={{
                            id: 'client-native-required',
                          }}
                        >
                          <option value="" />
                          {clientList.map(client => <option key={client.ID} value={client.ID}>{client.Name}</option>)}
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                      </FormControl>
              </form>
              ,
            buttons: {
              left: [{
                text: 'Cancel',
                className: 'danger',
                action: function () {
                  Popup.close();
                }
              }],
              right: [{
                text: 'Create',
                key: '⌘+s',
                className: 'success',
                action: function () {
                  if(document.getElementById('addProjectTitle').value!==''&&document.getElementById('addProjectDetails').value!==''&&clientId!==''){
                    if(file !== 'undefined' && typeof file !== 'undefined'){
                      let feedback = '';
                      let formData = new FormData();
                      formData.append('projname', document.getElementById('addProjectTitle').value)
                      formData.append('projdesc', document.getElementById('addProjectDetails').value)
                      formData.append('clientID', clientId)
                      formData.append('image', file)
                      fetch(Url.addNewProject,
                        { method: 'POST', body: formData }
                      )
                        .then(res => res.json())
                        .then(data => {
                          feedback = data.Message;
                          file = typeof undefined;
                          clientId = '';
                          setState({clientid: '', file: '',})
                          alert(feedback);
                          Popup.close();
                          props.getdata();
                        })
                        .catch(e => console.log('error:', e))
                    }else{
                      alert('please add a image file.');
                    }
                  }else{
                    alert('please fill in all required fields.');
                  }
                }
              }]
            }
          });
       });
    }else if(props.title === 'floor plan' && props.admin === 'true'){
          Popup.create({
            title: 'Add new floor plan',
            content: <form className={classes.container} noValidate autoComplete="off">
                      <TextField
                        id="addMapTitle"
                        label="Floor plan title"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                      />
                      <TextField
                        id="addMapDetails"
                        multiline
                        rows="4"
                        placeholder="floor plan info here..."
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                      />
                      <input id='addMapFile' className="fileInput" type="file" onChange={(e) => _handleImageChange(e)} accept="image/png, image/jpeg, image/jpg" multiple />
              </form>
              ,
            buttons: {
              left: [{
                text: 'Cancel',
                className: 'danger',
                action: function () {
                  Popup.close();
                }
              }],
              right: [{
                text: 'Create',
                key: '⌘+s',
                className: 'success',
                action: function () {
                  if(document.getElementById('addMapTitle').value!==''&&document.getElementById('addMapDetails').value!==''){
                    if(file !== 'undefined' && typeof file !== 'undefined'){
                      let feedback = '';
                      let formData = new FormData();
                      formData.append('proj_id', props.projectid)
                      formData.append('floor_no', document.getElementById('addMapTitle').value)
                      formData.append('floor_desc', document.getElementById('addMapDetails').value)
                      formData.append('image', file)
                      fetch(Url.addNewFloorPlan,
                        { method: 'POST', body: formData }
                      )
                        .then(res => res.json())
                        .then(data => {
                          feedback = data.Message;
                          file = typeof undefined;
                          setState({file: '',})
                          alert(feedback);
                          Popup.close();
                          props.getdata();
                        })
                        .catch(e => console.log('error:', e))
                    }else{
                      alert('please add a image file.');
                    }
                  }else{
                    alert('please fill in all required fields.');
                  }
                }
              }]
            }
          });
    }else{
      alert('No permission');
    }
  }

  return (
    <div
      className={clsx(classes.root, className)}
    >
      {props.admin === 'true'&&
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button
          color="primary"
          variant="contained"
          onClick={clickHandler}
        >
          Add {props.title}
        </Button>
      </div>}
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder={search}
          getsearch={props.getsearch}
        />
      </div>
      <Popup getdata={props.getdata} projectid={props.projectid}/>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
