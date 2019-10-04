import React from 'react';
import MaterialTable from 'material-table';
import Cookie from 'universal-cookie';

import Url from '../../components/Url';
import Main from '../main/Main'

const cookie = new Cookie();
export default class MaterialTableDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'Name', field: 'Name' },
        { title: 'Contact', field: 'Contact' },
        { title: 'Email', field: 'Email' },
      ],
      clientList: [],
      loaded: false,
    }
  }

  render() {
    if (!this.state.loaded) {
      fetch(Url.getClientList + cookie.get('userID'),
        { method: 'GET' }
      )
        .then(res => res.json())
        .then(data => {
          this.setState({ clientList: data, loaded: true });
        });
    } else {
      const contents =
        <MaterialTable
          title="Client List"
          columns={this.state.columns}
          data={this.state.clientList}
          // wait for backend api
          /* editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  console.log(newData);
                  fetch(Url.addClientList,
              { method: 'POST', body: newData }
            )
              .then(res => res.json())
              .then(data => {
                console.log(data);
              })
              .catch(e => console.log('error:', e))
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  console.log(newData);
                  fetch(Url.setStatus+ 
                    { method: 'PUT', }
                  )
                    .then(res => res.json())
                    .catch(e => console.log('error:', e));
                }, 600);
              })
          }}*/
        />

      return <Main value={contents} />
    }

    return <Main value={<div></div>} />
  }
}

