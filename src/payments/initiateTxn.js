import BitcoinGateway from 'bitcoin-receive-payments';

const pub_key = `xpub6BzGdULiY9mPw3JSRif2SswanpfeKputv3rx2JfqXux1GghGQD6tgftMW2jABCZ3ghhtDFrPcKCF8SxKctNHGY9V3ar4wGjDWv3QGCLdJwSzpub6qojrAeEdxfezxK1HMLbMuUycFkek8veAsQUFXumoC2JoUpn7NoVgkHBiFSfj3aCjiyQAQPqRdFWnFUBL6dEFBLNMeH6xxRHBFWyLKoPYvp`;
const openexchangerates_key =  `e193a412de2241ca91cd6a331b96518f`;

const gateway = new BitcoinGateway(pub_key, openexchangerates_key);


export default function NewTxn(id, amount) {
  return gateway.createAddress(id)
  .then(function(address) {
  
      console.log('got new address', 
        address.address, 'and it has', address.seconds_left / 60, 
        'minutes left before it expires.');
      
      console.log('ask user to pay ', amount, 
        'USD in it as', gateway.USDtoBIT(amount) + 
        ' bits, using HTML, preferably as a QR code');

      const results = {
        address: address,
        amountInBtc: gateway.USDtoBIT(amount)
      };

      return results;
  }).catch(function() {
      return('failed');
  })
}