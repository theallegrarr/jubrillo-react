import Profile from './Profile';

export default function updateProfile (info) {
  //console.log(person.attrs.profile.name, person.attrs.username)
  const newData = new Profile({
    name: info.name,
    username: info.username,
    rating: info.ratings,
    summary: info.summary,
    skills: info.skills,
    isFreelancer: info.isFreelancer,
  });
  //console.log(newUser)
  newData.save().then((res) => {
    console.log(res);
  }).catch(err => console.log(err));
}