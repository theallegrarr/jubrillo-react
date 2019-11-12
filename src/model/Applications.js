import { Model } from 'radiks';

export default class Applications extends Model {
  static className = 'JubrilloProjectApplications';

  static schema = {
    project_id: {
      type: String,
      decrypted: true
    },
    project_index: {
      type: Number,
      decrypted: true
    },
    applicant_username: {
      type: String,
      decrypted: true
    },
    applicant_bid: {
      type: Number,
      decrypted: true
    },
    applicant_message: {
      type: String,
      decrypted: true
    },
    duration: {
      type: String,
      decrypted: true
    },
    selected: {
      type: Boolean,
      decrypted: true
    }
  }

  static defaults = {
    duration: 3,
    applicant_bid: 30,
    selected: false
  }
}
