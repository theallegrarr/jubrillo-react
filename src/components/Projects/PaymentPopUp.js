import React, {useEffect, useState} from 'react';
import icon from '../../assets/logo.png';
import bc from '../../assets/barcode.png';

export default function PopUp ({ person, project }) {

  const [amount, setAmount] = useState(null);
  const [rate, setRate] = useState(0);
  const [txnId, setID] = useState('');

  return(<>
      <div id="myModal" class="modal">
        <div class="modal-content">
          <div className='columns'>
            <div className='pay-header-row'>
              <div><img src={icon} alt='logo'></img></div>
              <img src={'https://cdn.pixabay.com/photo/2013/12/08/12/12/bitcoin-225080__340.png'} alt='logo'></img>
            </div>
<h4>Fund Job #{project.project_index} - {project.title}</h4>
            <img className='bcode' src={bc} alt='barcode'></img>
            <input
              value={`1MUy689ex2dcX58WAdTkdA6u5hs2nnKzCv`}
              className='btc-addr'
              disabled
            ></input>
            <input
              value={amount}
              className='btc-inputs'
              placeholder='Enter Amount in $'
            ></input>
            <input
              value={amount}
              className='btc-inputs'
              placeholder='Value in BTC will be shown here'
            ></input>
            <input
              value={txnId}
              className='btc-inputs'
              placeholder='Transaction ID'
            ></input>
            <div className='fund-buttons'>
              <button 
              style={{ 'backgroundColor': 'green'}}
              onClick={() => {

              }}>
                Paid
              </button>
              <button 
              onClick={() => {

              }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>);
}