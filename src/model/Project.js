import { Model } from 'radiks';

export default class Project extends Model {
  static className = 'JubrilloProject';

  static schema = {
    name: {
      type: String,
      decrypted: true
    },
    employer_id: {
      type: String,
      decrypted: true
    },
    applicants: {
      type: Number,
      decrypted: true
    },
    developer_id: {
      type: String,
      decrypted: true
    },
    budget: {
      type: Number,
      decrypted: true
    },
    description: {
      type: String,
      decrypted: true
    },
    skills: {
      type: Array,
      decrypted: true
    },
    duration: {
      type: Number,
      decrypted: true
    }
  }

  static defaults = {
    duration: 3,
    budget: 30,
  }
}
