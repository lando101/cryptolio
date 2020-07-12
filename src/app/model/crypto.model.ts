import { CryptoDisplay } from './crypto-display.model';
import { CryptoInfo } from './crypto-coininfo.model';



export interface Crypto {
  id?: string;
  display: CryptoDisplay;
  coinInfo: CryptoInfo;
}
