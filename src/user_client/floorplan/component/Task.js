import React from 'react';
import Popup from 'react-popup';
import Url from '../../../components/Url';

export default class Task{

  static RequestedTask(x,y,info,taskId,props) {
    Popup.create({
      title: 'Requested task',
      content: <div>
        <p>{x}  {y}</p>
        <p className="taskInfo">{info}</p>
      </div>,
      buttons: {
        left: [{
          text: 'Delete',
          className: 'danger',
          key: 'delete',
          action: function () {
            if (window.confirm('Are you sure you wish to delete this task?')) {
              fetch(Url.setStatus + taskId + '/Deleted',
                { method: 'PUT', }
              )
                .then(res => {
                  res.json();
                  Popup.alert('Task has been deleted');
                  Popup.close();
                  props.parent.getData();
                  props.parent.displayPoints();
                })
                .catch(e => console.log('error:', e))
            }
          }
        }
        ],
      }
    });
  }

  static AssignedTask(x,y,info) {
    Popup.create({
      title: 'Requested task',
      content: <div>
        <p>{x}  {y}</p>
        <p className="taskInfo">{info}</p>
      </div>,
    });
  }
}