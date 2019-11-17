import { Model } from 'radiks';

export default class Forum extends Model {
  static className = 'ForumPost';

  static schema = {
    body: {
      type: String,
      decrypted: true
    },
    topic: {
      type: String,
      decrypted: true
    },
    author: {
      type: String,
      decrypted: true
    },
    forum_index: {
      type: String,
      decrypted: true
    }
  }

  static defaults = {
    author: '',
  }
}
