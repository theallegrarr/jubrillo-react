import Project from './Project';

export default function insertProject (info) {
  let newData = new Project({
    title: info.title,
    employer_username: info.employer_username,
    project_index: info.project_index,
    budget: info.budget,
    description: info.description,
    skills: info.skills,
    duration: info.duration,
    employer_rating: info.employer_rating
  });

  return newData.save().then((res) => {
    console.log(res);
  }).catch(err => console.log(err));
}