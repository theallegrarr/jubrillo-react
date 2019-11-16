import axios from 'axios';
import ProjectSchema from '../model/Project';
import BlackList from '../model/TxnBlackList';
import SaveTxn from '../model/saveTxn';

const myWallet = `1MUy689ex2dcX58WAdTkdA6u5hs2nnKzCv`;

export default async function VerifyTransaction( project_id, transaction_id ) {

  try {
    const transaction = await axios({
      method: 'get',
      url: `https://api.blockcypher.com/v1/btc/main/txs/${transaction_id}`
    });
    const Blacklist = await BlackList.fetchList({ txn_id: transaction_id })
    //console.log(transaction.data.outputs)
    // const total = transaction.data.total;
    // const fees = transaction.data.fees;
    const satoshi = 0.00000001;
    //console.log(getAmount(transaction.data.outputs))
    const funded = (parseFloat(getAmount(transaction.data.outputs))*satoshi).toFixed(7);
    const confirmations = parseInt(transaction.data.confirmations);
    //console.log(transaction, funded, confirmations, transaction.data.outputs, Blacklist)


      if(confirmations > 2 
        && verifyAccount(transaction.data.outputs) 
        && Blacklist.length === 0
        ){
        const project = await ProjectSchema.fetchList({ _id: project_id });
        //console.log(project);
        const oldBalance = parseFloat(project[0].attrs.work_balance).toFixed(7);
        const newBalance = parseFloat(oldBalance)+parseFloat(funded);

        
        if(project){
          await project[0].update({ 
            work_balance: newBalance,
            transaction_id: transaction_id
          })
          
          return project[0].save().then(res => {
            //console.log(res);

            if(SaveTxn(transaction_id)){
              return true;
            } else {
              return false;
            }
          }).catch(err => {
            console.log(err)
            return false;
          })
        }
      } else {
        //console.log('bad');
        return false;
      }

  } catch (error) {
    console.log(error)
    return false;
  }
}

function verifyAccount(accounts){
  for(let i=accounts.length-1; i>=0; i--){
    if(accounts[i].addresses[0] === myWallet){
      return true;
    }
  }
  return false;
}

function getAmount(accounts){
  for(let i=accounts.length-1; i>=0; i--){
    if(accounts[i].addresses[0] === myWallet){
      console.log(accounts[i])
      return accounts[i].value;
    }
  }
  return false;
}