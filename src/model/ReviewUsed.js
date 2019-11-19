import { Model } from 'radiks';

export default class ReviewUsed extends Model {
  static className = 'JubrilloReviewUsed';

  static schema = {
    owner: {
      type: Number,
      decrypted: true
    },
    review_id: {
      type: String,
      decrypted: true
    },
    project_id: {
      type: String,
      decrypted: true
    }
  }

  static defaults = {
    review_id: ''
  }
}
