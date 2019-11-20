import Person from './User';

export default async function createUser (person) {
  //console.log(person.attrs.profile.name, person.attrs.username)
  try {
    //console.log(newUser)
    const check = await Person.fetchList({ username: person.attrs.username})
    //console.log(check, person)
    if(check.length === 0){
      const newUser = new Person({
        name: person.attrs.profile.name,
        username: person.attrs.username,
        rating: 5,
      });
      
      await newUser.save()
      // .then((res) => {
      //   //console.log(res)
      //   //console.log('user details updated');
      // }).catch(err => console.log(err));
    }
  } catch (error) {
    console.log(error)
  }
}