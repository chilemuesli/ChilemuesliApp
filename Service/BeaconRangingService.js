import {Platform} from 'react-native';


/**
 * uuid of YOUR BEACON (change to yours)
 * @type {String} uuid
 */
const UUID = 'FDA50693-A4E2-4FB1-AFCF-C6EB07647825';
const IDENTIFIER = 'Holy';

const OTHER_UUID = 'AB9F6774-7413-4806-8497-A30B7C1A9DE4';
const OTHER_IDENTIFIER = 'April';

export default class BeaconsRaningService {
  // will be set as a reference to "beaconsDidRange" event:
  beaconsDidRangeEvent = null;

  constructor() {
    //
  }
}