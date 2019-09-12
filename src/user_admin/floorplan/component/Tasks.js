//This file may be modified or deleted in the next version.
import React from 'react'
import Url from '../../../components/Url';
import Popup from 'react-popup';

class Tasks extends React.Component {

static RequestedTask(taskId,x,y,info) {
    Popup.create({
      title: 'Requested task from client',
      content: <div>
        <p>{x}  {y}</p>
          <p className="approveTaskInfo">{info}</p>
        </div>,
      buttons: {
        left: [{
          text: 'Reject',
          className: 'danger',
          action: function () {
              fetch(Url.setStatus+taskId+'/'+'Requested',
                { method: 'PUT', }
              )
                .then(res => res.json())
                .catch(e => console.log('error:', e))
            alert('Task has been rejected');
            //not sure if this works...
            this.forceUpdate();
          }
        }],
        right: [{
          text: 'Approve',
          key: '⌘+s',
          className: 'success',
          action: function () {
            //approve function here.
            fetch(Url.setStatus+taskId+'/'+'New',
                { method: 'PUT', }
              )
                .then(res => res.json())
                .catch(e => console.log('error:', e))
            alert('Task has been approved');
            //not sure if this works...
            this.forceUpdate();
          }
        }]
      }
    });
    return 
  }
}

export default Tasks;