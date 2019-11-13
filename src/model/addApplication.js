import Application from './Applications';

export default function addApplication (data) {
  //console.log(person.attrs.profile.name, person.attrs.username)
  const newJobApp = new Application({
    project_id: data.project_id,
    project_index: data.project_index,
    applicant_username: data.applicant_username,
    applicant_bid: data.applicant_bid,
    applicant_message: data.applicant_message,
    duration: data.duration
  });
  //console.log(newJobApp)
  return newJobApp.save().then((res) => {
    //console.log('job application made');
    return res;
  }).catch(err => console.log(err));
}