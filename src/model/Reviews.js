import { Model } from 'radiks';

export default class Reviews extends Model {
  static className = 'JubrilloReview';

  static schema = {
    rating: {
      type: Number,
      decrypted: true
    },
    project_id: {
      type: String,
      decrypted: true
    },
    text: {
      type: String,
      decrypted: true
    },
    from: {
      type: String,
      decrypted: true
    },
    to: {
      type: String,
      decrypted: true
    }
  }

  static defaults = {
    rating: 5
  }
}
