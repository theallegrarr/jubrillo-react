import { Model } from 'radiks';

export default class FundingJob extends Model {
  static className = 'ProjectFunds';

  static schema = {
    funded: {
      type: Boolean,
      decrypted: true
    },
    amount: {
      type: Number,
      decrypted: true
    },
    project_id: {
      type: String,
      decrypted: true
    },
    employer: {
      type: String,
      decrypted: true
    },
    freelancer: {
      type: String,
      decrypted: true
    },
    project_complete: {
      type: Boolean,
      decrypted: true
    }
  }

  static defaults = {
    funded: false,
    amount: 0,
    project_complete: false
  }
}
