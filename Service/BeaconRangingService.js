import {Platform} from 'react-native';
import Beacons from 'react-native-beacons-manager';
import BluetoothState from 'react-native-bluetooth-state-manager';

/**
 * uuid of YOUR BEACON (change to yours)
 * @type {String} uuid
 */
const UUID_1 = 'FDA50693-A4E2-4FB1-AFCF-C6EB07647825';
const IDENTIFIER_1 = 'Holy';

const UUID_2 = 'AB9F6774-7413-4806-8497-A30B7C1A9DE4';
const IDENTIFIER_2 = 'April';

export default class BeaconRangingService {
  region1 = {identifier: IDENTIFIER_1, uuid: UUID_1};
  region2 = {identifier: IDENTIFIER_2, uuid: UUID_2};

  // will be set as a reference to "beaconsDidRange" event:
  beaconsDidRangeEvent = null;
  rangedBeaconsUUIDMap = new Map();
  majorToBeFound = '';
  minorToBeFound = '';

  constructor() {
    if (Platform.OS === 'ios') {
      console.log('Running on iOS');
      Beacons.requestAlwaysAuthorization();
    } else if (Platform === 'android') {
      console.log('Running on Android');
      console.log('Android permissions are handled in native app code.');
    }
    this.rangedBeaconsUUIDMap.set(UUID_1, []);
    this.rangedBeaconsUUIDMap.set(UUID_2, []);
  }

  startRanging(
    rangingListener,
    bluetoothStateListener,
    majorToFind,
    minorToFind,
  ) {
    // Range for beacons inside the region
    this.majorToBeFound = majorToFind;
    this.minorToBeFound = minorToFind;
    Beacons.startRangingBeaconsInRegion(this.region1)
      .then(() => console.log('Beacons ranging started successfully'))
      .catch(error =>
        console.log(`Beacons ranging not started, error: ${error}`),
      );
    // Range for beacons inside the other region
    Beacons.startRangingBeaconsInRegion(this.region2)
      .then(() => console.log('Beacons ranging started successfully'))
      .catch(error =>
        console.log(`Beacons ranging not started, error: ${error}`),
      );

    // update location to ba able to monitor:
    if (Platform.OS === 'ios') {
      Beacons.startUpdatingLocation();
    }

    this.beaconsDidRangeEvent = Beacons.BeaconsEventEmitter.addListener(
      'beaconsDidRange',
      data => {
        console.log('beaconsDidRange data: ', data);
        const {beacons} = data;
        this.rangedBeaconsUUIDMap = this.convertRangingArrayToMap(beacons);
        let beaconToBeFound = this.findFirstBeaconWithIdentifierToFind(UUID_1);
        if (beaconToBeFound != null) {
          console.log('Calling listener');
          rangingListener(beaconToBeFound);
        } else {
          beaconToBeFound = this.findFirstBeaconWithIdentifierToFind(UUID_2);
          if (beaconToBeFound != null) {
            console.log('Calling listener');
            rangingListener(beaconToBeFound);
          }
        }
        console.log('Beacon to be found: ' + beaconToBeFound);
      },
    );

    // listen bluetooth state change event
    BluetoothState.onStateChange(bluetoothState => {
      bluetoothStateListener(bluetoothState);
    });
  }

  stopRanging() {
    // stop ranging beacons:
    Beacons.stopRangingBeaconsInRegion(this.region1)
      .then(() => console.log('Beacons ranging stopped successfully'))
      .catch(error =>
        console.log(`Beacons ranging not stopped, error: ${error}`),
      );

    Beacons.stopRangingBeaconsInRegion(this.region2)
      .then(() => console.log('Beacons ranging stopped successfully'))
      .catch(error =>
        console.log(`Beacons ranging not stopped, error: ${error}`),
      );

    // remove ranging event we registered at componentDidMount
    this.beaconsDidRangeEvent.remove();
  }

  convertRangingArrayToMap(rangedBeacon) {
    console.log('this.rangedBeaconsUUIDMap: ' + this.rangedBeaconsUUIDMap);
    rangedBeacon.forEach(beacon => {
      if (beacon.uuid.length > 0) {
        const uuid = beacon.uuid.toUpperCase();
        const rangedBeacons = this.rangedBeaconsUUIDMap
          .get(uuid)
          .filter(rangedBeac => rangedBeac === uuid);

        this.rangedBeaconsUUIDMap.set(uuid, [...rangedBeacons, beacon]);
      }
    });
    return this.rangedBeaconsUUIDMap;
  }

  findFirstBeaconWithIdentifierToFind(uuid) {
    const majorMinorToBeFound = this.majorToBeFound + '.' + this.minorToBeFound;
    let rangedBeacons = this.rangedBeaconsUUIDMap.get(uuid);
    let beaconToBeFound = null;
    rangedBeacons.forEach(beacon => {
      const majorMinor = beacon.major + '.' + beacon.minor;
      if (majorMinor === majorMinorToBeFound) {
        console.log('Ranging: ' + majorMinorToBeFound);
        beaconToBeFound = beacon;
      }
    });
    return beaconToBeFound;
  }
}
