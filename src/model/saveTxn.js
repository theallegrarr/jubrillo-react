import BlacklistSchema from './TxnBlackList';

export default async function saveTransaction (txn_id) {
  const newBL = new BlacklistSchema({
    txn_id: txn_id
  });

  try{
    const blop = await newBL.save();
    console.log(blop)
    return true;
  } catch (err){
    console.log(err)
  }
}