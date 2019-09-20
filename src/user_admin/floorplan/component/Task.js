import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Popup from 'react-popup';
import Url from '../../../components/Url';

export default class Task {
    static RequestedTask(x, y, info, taskId, props) {

        Popup.create({
            title: 'Requested task from client',
            content: <div>
                <p>{x}  {y}</p>
                <p className="taskInfo">{info}</p>
            </div>,
            buttons: {
                left: [{
                    text: 'Reject',
                    className: 'danger',
                    action: function () {
                        fetch(Url.setStatus + taskId + '/Reject',
                            { method: 'PUT', }
                        )
                            .then(res => {
                                res.json();
                                Popup.alert('Task has been rejected');
                                props.getdata();
                                props.displaypoints();
                                Popup.close();
                            })
                            .catch(e => console.log('error:', e))
                    }
                }, {
                    text: 'Delete',
                    key: 'delete',
                    action: function () {
                        if (window.confirm('Are you sure you wish to delete this task?')) {
                            fetch(Url.setStatus + taskId + '/Deleted',
                                { method: 'PUT', }
                            )
                                .then(res => {
                                    res.json();
                                    Popup.alert('Task has been deleted');
                                    props.getdata();
                                    props.displaypoints();
                                    Popup.close();
                                })
                                .catch(e => console.log('error:', e))
                            
                        }
                    }
                }],
                right: [{
                    text: 'Approve',
                    key: 'enter',
                    className: 'success',
                    action: function () {
                        fetch(Url.setStatus + taskId + '/New',
                            { method: 'PUT', }
                        )
                            .then(res => {
                                res.json();
                                Popup.alert('Task has been approved');
                                props.getdata();
                                props.displaypoints();
                                Popup.close();
                            })
                            .catch(e => console.log('error:', e));
                    }
                }]
            }
        });
    }

    static RejectedTask(x, y, info, taskId, props) {
        Popup.create({
            title: 'Rejected task',
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
                                    props.getdata();
                                    props.displaypoints();
                                    Popup.close();
                                })
                                .catch(e => console.log('error:', e))
                            
                        }
                    }
                }],
                right: [{
                    text: 'Reactive',
                    key: 'enter',
                    className: 'success',
                    action: function () {
                        fetch(Url.setStatus + taskId + '/Requested',
                            { method: 'PUT', }
                        )
                            .then(res => {
                                res.json();
                                Popup.alert('Task has been reactived');
                                props.getdata();
                                props.displaypoints();
                                Popup.close();
                            })
                            .catch(e => console.log('error:', e));
                    }
                }]
            }
        });
    }

    static DeletedTask(x, y, info, taskId, props) {
        Popup.create({
            title: 'Deleted task',
            content: <div>
                <p>{x}  {y}</p>
                <p className="taskInfo">{info}</p>
            </div>,
            buttons: {
                left: [{
                    text: 'New',
                    action: function () {
                        fetch(Url.resetTask + taskId,
                            { method: 'DELETE', }
                        )
                            .then(res => {
                                res.json();
                                Popup.alert('Task has been reactivated to the status New');
                                props.getdata();
                                props.displaypoints();
                                Popup.close();
                            })
                            .catch(e => console.log('error:', e))
                    }
                }],
                right: [{
                    text: 'Done',
                    key: 'enter',
                    className: 'success',
                    action: function () {
                        fetch(Url.setStatus + taskId + '/Done',
                            { method: 'PUT', }
                        )
                            .then(res => {
                                res.json();
                                Popup.alert('Task has been reactivated to the status Done');
                                props.getdata();
                                props.displaypoints();
                                Popup.close();
                            })
                            .catch(e => console.log('error:', e));
                    }
                }]
            }
        });
    }

    static NewTask(x, y, info, taskId, props, classes, state, handleChange) {
        let empList = [];
        fetch(Url.getAllEmp,
            { method: 'GET' }
        )
            .then(res => res.json())
            .then(data => {
                empList = data;
                Popup.create({
                    title: 'Assign task',
                    content: <div>
                        <p>{x}  {y}</p>
                        <p className="taskInfo">{info}</p>
                        <FormControl required className={classes.formControl}>
                            <InputLabel htmlFor="emp-native-required">Employee</InputLabel>
                            <Select
                                native
                                value={state.emp}
                                onChange={handleChange}
                                name="emp"
                                inputProps={{
                                    id: 'emp-native-required',
                                }}
                            >
                                <option value="" />
                                {empList.map(emp => <option key={emp.ID} value={emp.ID}>{emp.Name}</option>)}
                            </Select>
                            <FormHelperText>Required</FormHelperText>
                        </FormControl>
                    </div>,
                    buttons: {
                        left: [{
                            text: 'Delete',
                            className: 'danger',
                            action: function () {
                                if (window.confirm('Are you sure you wish to delete this task?')) {
                                    fetch(Url.setStatus + taskId + '/Deleted',
                                        { method: 'PUT', }
                                    )
                                        .then(res => {
                                            res.json();
                                            Popup.alert('Task has been deleted');
                                            props.getdata();
                                            props.displaypoints();
                                            Popup.close();
                                        })
                                        .catch(e => console.log('error:', e))
                                }
                            }
                        }],
                        right: [{
                            text: 'Assign',
                            className: 'success',
                            action: function () {
                                // if(empId!==''){
                                let formData = new FormData();
                                formData.append('empid', handleChange);
                                formData.append('jobid', taskId);
                                fetch(Url.assignTask,
                                    { method: 'POST', body: formData }
                                )
                                    .then(res => {
                                        res.json();
                                        alert('Task has been assigned');
                                        props.getdata();
                                        props.displaypoints();
                                        Popup.close();
                                    })
                                    .catch(e => console.log('error:', e));
                            }
                        }]
                    }
                })
            })
            .catch(e => console.log('error:', e));
    }

    static AssignedTask(x, y, info, taskId, props,emp,contact) {
        Popup.create({
            title: 'Assigned task',
            content: <div>
                <p>{x}  {y}</p>
                <p className="taskInfo">{info}</p>
                {emp?<p>This task is assigned to: {emp}</p>:<p></p>}
                {contact?<p>Contact: {contact}</p>:<p></p>}
            </div>,
            buttons: {
                left: [{
                    text: 'Delete',
                    key: 'delete',
                    className: 'danger',
                    action: function () {
                        if (window.confirm('Are you sure you wish to delete this task?')) {
                            fetch(Url.setStatus + taskId + '/Deleted',
                                { method: 'PUT', }
                            )
                                .then(res => {
                                    res.json();
                                    Popup.alert('Task has been deleted');
                                    props.getdata();
                                    props.displaypoints();
                                    Popup.close();
                                })
                                .catch(e => console.log('error:', e))
                        }
                    }
                }],
                right: [{
                    text: 'Reset',
                    className: 'success',
                    action: function () {
                        fetch(Url.resetTask + taskId,
                            { method: 'DELETE', }
                        )
                            .then(res => {
                                res.json();
                                Popup.alert('Task has been reset to new');
                                props.getdata();
                                props.displaypoints();
                                Popup.close();
                            })
                            .catch(e => console.log('error:', e))
                    }
                }]
            }
        });
    }
}