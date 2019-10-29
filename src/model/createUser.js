import Person from './User';

export default function createUser (person) {
  //console.log(person.attrs.profile.name, person.attrs.username)
  const newUser = new Person({
    name: person.attrs.profile.name,
    username: person.attrs.username,
    rating: 5,
  });
  //console.log(newUser)
  newUser.save().then((res) => {
    console.log(res);
  }).catch(err => console.log(err));
}