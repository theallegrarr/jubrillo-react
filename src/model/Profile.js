import { Model } from 'radiks';

export default class Profile extends Model {
  static className = 'UserProfile';

  static schema = {
    name: String,
    username: {
      type: String,
      decrypted: true
    },
    email: {
      type: String,
      decrypted: true
    },
    rating: {
      type: Number,
      decrypted: true
    },
    rank: {
      type: Number,
      decrypted: true
    },
    summary: {
      type: String,
      decrypted: true
    },
    skills: {
      type: Array,
      decrypted: true
    },
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
    },
    image: {
      type: String,
      decrypted: true
    }
  }

  static defaults = {
    isFreelancer: false,
    jobsDone: 0,
    jobsCreated: 0,
    rating: 5,
  }
}

