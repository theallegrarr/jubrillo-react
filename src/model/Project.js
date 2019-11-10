import { Model } from 'radiks';

export default class Project extends Model {
  static className = 'JubrilloProject';

  static schema = {
    title: {
      type: String,
      decrypted: true
    },
    employer_username: {
      type: String,
      decrypted: true
    },
    project_index: {
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
    },
    active: {
      type: Boolean,
      decrypted: true
    }
  }

  static defaults = {
    duration: 3,
    budget: 30,
    developer_id: '',
    active: true,
  }
}
