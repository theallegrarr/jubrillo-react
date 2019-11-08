import Profile from './Profile';

export default function updateProfile (info) {
  //console.log(person.attrs.profile.name, person.attrs.username)
  const newData = new Profile({
    name: info.name,
    username: info.username,
    // rating: info.ratings,
    summary: info.summary,
    skills: info.skills,
    isFreelancer: info.isFreelancer,
    email: info.email,
    image: info.image
  });
  //console.log(newUser)
  Profile.fetchList({
    "username": info.username
  }).then(res => {
    if(res.length>0){
      res[0].destroy().then(res => console.log('entry destroyed')).catch(err => console.log('no entry'));
    }
    newData.save().then((res) => {
      console.log(res);
    }).catch(err => console.log(err));
    }).catch(err => console.log(err));
}