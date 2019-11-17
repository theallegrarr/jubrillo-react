import { Model } from 'radiks';

export default class LastVisit extends Model {
  static className = 'JubrilloLastVisit';

  static schema = {
    message: {
      type: String,
      decrypted: true
    },
    owner: {
      type: String,
      decrypted: true
    }
  }

  static defaults = {
    message: 'visit logged',
  }
}