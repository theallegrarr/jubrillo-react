import { Model } from 'radiks';

export default class Profile extends Model {
  static className = 'UserProfile';

  static schema = {
    name: String,
    username: String,
    email: String,
    rating: Number,
    rank: Number,
    summary: String,
    skills: Array,
    isFreelancer: {
      type: Boolean,
      decrypted: true
    },
    jobsDone: {
      type: Number,
      decrypted: true
    },
    jobsCreated: {
      type: Number,
      decrypted: true
    }
  }

  static defaults = {
    isFreelancer: false,
    jobsDone: 0,
    jobsCreated: 0,
  }
}

