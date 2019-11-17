import { Model } from 'radiks';

export default class ForumReply extends Model {
  static className = 'ForumReply';

  static schema = {
    body: {
      type: String,
      decrypted: true
    },
    author: {
      type: String,
      decrypted: true
    },
    forum_post_id: {
      type: String,
      decrypted: true
    }
  }

  static defaults = {
    author: '',
  }
}
