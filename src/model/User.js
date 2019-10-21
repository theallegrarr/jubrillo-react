import { Model } from 'radiks';

export default class Person extends Model {
  static className = 'JubrilloUser';

  static schema = {
    name: String,
    username: String,
    email: String,
    rating: Number,
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

