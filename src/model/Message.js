import { Model } from 'radiks';

export default class Message extends Model {
  static className = 'JubrilloMessage';

  static schema = {
    body: {
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
    },
    project_message: {
      type: Boolean,
      decrypted: true
    },
    chat_message: {
      type: Boolean,
      decrypted: true
    },
    project_id: {
      type: String,
      decrypted: true
    },
    chat_id: {
      type: String,
      decrypted: true
    },
    project_index: {
      type: Number,
      decrypted: true
    }
  }

  static defaults = {
    body: '',
  }
}