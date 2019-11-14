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
    },
    step: {
      type: Number,
      decrypted: true
    },
    employer_rating: {
      type: Number,
      decrypted: true
    },
    freelancer_rating: {
      type: Number,
      decrypted: true
    },
    selected_freelancer: {
      type: String,
      decrypted: true
    },
    agreement_reached : {
      type: Boolean,
      decrypted: true
    },
    work_description: {
      type: String,
      decrypted: true
    },
    work_balance: {
      type: String,
      decrypted: true
    }
  }

  static defaults = {
    duration: 3,
    budget: 30,
    developer_id: '',
    active: true,
    step: 1,
    agreement_reached: false,
    work_balance: 0,
  }
}
