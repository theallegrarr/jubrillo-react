import { Model } from 'radiks';

export default class TxnBlackList extends Model {
  static className = 'TransactionBlacklist';

  static schema = {
    txn_id: {
      type: String,
      decrypted: true
    }
  }

  static defaults = {
    txn_id: '',
  }
}
