export default function stepMessage(step, role){
  if(step===1 && role ==='freelancer'){
    return(`Please Discuss the terms and specifications of this job with your Employer, Make sure you are on same page before moving forward`);
  }
  if(step===2 && role ==='freelancer'){
    return(`Allow Employer to fund the Job before proceeding, make sure the Job balance is updated with agreed funds before starting any work, you are allowed to receive payment directly but note that there will be no intervention from Jubrillo if you run into conflicts`);
  }
  if(step===3 && role ==='freelancer'){
    return(`Make sure the Job is funded then proceed to deliver the agreed work`);
  }
  if(step===4 && role ==='freelancer'){
    return(`Congratulations! The job is complete, you will receive payment in 24 hours in your BTC wallet`);
  }

  if(step===1 && role ==='employer'){
    return(`Please Discuss the terms and specifications of this job with your Freelancer`);
  }
  if(step===2 && role ==='employer'){
    return(`To Fund this job open the 'Add Funds' form enter the amount, 
    then send the BTC equivalent to the wallet shown, after sending the payment, enter the Transaction ID in the form before clicking 'Paid'`);
  }
  if(step===3 && role ==='employer'){
    return(`Please make sure the Job Balance shows the amount you funded, 
    if it isn't and you have made payment, contact us, but if it does wait for freelancer to deliver job.
    DO NOT MOVE TO NEXT STEP IF THE JOB IS NOT COMPLETED`);
  }
  if(step===4 && role ==='employer'){
    return(`Congratulations! The job is complete, you have 12 hours to open a dispute if this is a mistake, contact us`);
  }

}