import Profile from './Profile';

export default async function updateProfile (info, setError, removeError) {
  setError('good');
  removeError('Uploading User Information...')
  try {
    const profile = await Profile.fetchList({
      "username": info.username
    })
    
    if(profile.length > 0){
      profile[0].update({
        name: info.name,
        username: info.username,
        // rating: info.ratings,
        summary: info.summary,
        skills: info.skills,
        isFreelancer: info.isFreelancer,
        email: info.email,
        image: info.image
      })
    } else {
      profile[0] = new Profile({
        name: info.name,
        username: info.username,
        // rating: info.ratings,
        summary: info.summary,
        skills: info.skills,
        isFreelancer: info.isFreelancer,
        email: info.email,
        image: info.image
      })
    }
    
    const saved = 
    await profile[0].save();
    console.log(saved)
    setError('good');
    removeError('Info Updated Successfully...')
  } catch (error) {
    console.log(error)
    setError('bad');
    removeError('Update Failed, Try Again')
  }
}