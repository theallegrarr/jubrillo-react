import React, {useEffect, useState} from 'react';
import { FaCopy } from 'react-icons/fa';
import icon from '../../assets/logo.png';
import bc from '../../assets/barcode.png';
import axios from 'axios';
import ErrorBar from '../errorBar/errorBar';

const wallet = `1MUy689ex2dcX58WAdTkdA6u5hs2nnKzCv`;
export default function PopUp ({ person, project, form, setForm, setPopDisp }) {

  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [txnId, setID] = useState(form.transaction_id);
  const [usdValue, setUSD] = useState(form.usdAmount);
  const [errorMessage, removeError] = useState('');
  const [errorType, setErrorType] = useState(''); 

  useEffect(() => {
    getRate();
  }, [])

  const submit = () => {
    const newform = {
      transaction_id: txnId,
      usdAmount: usdValue
    }

    setForm(newform)
    setPopDisp(false)
  }

  async function getRate() {
    try {
      const res = await axios.get(`https://api.coindesk.com/v1/bpi/currentprice.json`)
      await setRate(parseFloat(res.data.bpi.USD.rate.replace(/,/g, '')))
      //console.log(res.data.bpi.USD.rate.replace(/,/g, ''))
    } catch (error) {
      console.log(error);
    }
  }

  return(<>
      {errorMessage && 
      <ErrorBar 
      errorMessage={errorMessage}
      errorType={errorType}
      removeError={removeError}
      />}
      <div id="myModal" className="modal">
        <div className="modal-content">
          <div className='columns'>
            <div className='pay-header-row'>
              <div><img src={icon} alt='logo'></img></div>
              <img src={'https://cdn.pixabay.com/photo/2013/12/08/12/12/bitcoin-225080__340.png'} alt='logo'></img>
            </div>
<h4>Fund Job #{project.project_index} - {project.title}</h4>
            <img className='bcode' src={bc} alt='barcode'></img>
  <h1 className='valueH1'>₿: {amount ? amount : 0}</h1>
            <p>{`Address(Click to Copy)`}</p>
            <div className='wallet-place'>
              <FaCopy className='fa-copy' />
            <input
              value={wallet}
              className='btc-addr'
              readOnly
              onClick={(e) => {
                e.target.select();
                document.execCommand('copy');
                e.target.focus();
                setErrorType('good')
                removeError('Copied to Clipboard!');
              }}></input></div>
            <input
              value={usdValue ? usdValue : ''}
              className='btc-inputs'
              placeholder='Enter Amount in $ to get BTC Equivalent'
              onChange={(e) => {
                setUSD(e.target.value)
                setAmount((parseFloat(e.target.value)/rate).toFixed(7))
              }}
            ></input>
            
            <input
              value={txnId}
              className='btc-inputs'
              placeholder='Enter Transaction ID After Sending Payment'
              onChange={(e)=>setID(e.target.value)}
            ></input>
            <div className='fund-buttons'>
              <button 
              style={{ 'backgroundColor': '#00ABB4'}}
              onClick={() => {
                submit();
              }}>
                Paid
              </button>
              <button 
              onClick={() => {
                setPopDisp(false);
              }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>);
}