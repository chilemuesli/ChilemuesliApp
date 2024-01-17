import {Platform} from 'react-native';
import {DeviceEventEmitter} from 'react-native';
import Beacons from 'react-native-beacons-manager';

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
  rangedBeaconsUUIDMap = {};
  majorToBeFound = '';
  minorToBeFound = '';

  constructor() {
    if (Platform.OS === 'ios') {
      console.log('Running on iOS');
      Beacons.requestWhenInUseAuthorization();
    } else if (Platform === 'android') {
      console.log('Running on Android');
      console.log('Android permissions are handled in native app code.');
    }
    this.rangedBeaconsUUIDMap[UUID_1] = [];
    this.rangedBeaconsUUIDMap[UUID_2] = [];
  }

  async startRanging(
    rangingListener,
    bluetoothStateListener,
    majorToFind,
    minorToFind,
  ) {
    this.majorToBeFound = majorToFind;
    this.minorToBeFound = minorToFind;

    if (Platform.OS === 'ios') {
      this.startRangingiOS(rangingListener, bluetoothStateListener);
    } else if (Platform === 'android') {
      await this.startRangingAndroid(rangingListener, bluetoothStateListener);
    }
    this.beaconsDidRangeEvent = DeviceEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        console.log('beaconsDidRange data: ', data);
        const {beacons} = data.beacons;
        this.convertRangingArrayToMap(beacons);
        console.log('rangedBeaconsUUIDMap', this.rangedBeaconsUUIDMap);
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
  }

  startRangingiOS(rangingListener, bluetoothStateListener) {
    Beacons.startMonitoringForRegion(this.region1);
    Beacons.startRangingBeaconsInRegion(this.region1);
    Beacons.startMonitoringForRegion(this.region2);
    Beacons.startRangingBeaconsInRegion(this.region2);
    Beacons.startUpdatingLocation();
  }

  async startRangingAndroid(rangingListener, bluetoothStateListener) {
    // Tells the library to detect iBeacons
    Beacons.detectIBeacons();

    // Start detecting all iBeacons in the nearby
    try {
      await Beacons.startRangingBeaconsInRegion(this.region1);
      await Beacons.startRangingBeaconsInRegion(this.region2);
      console.log('Beacons ranging started successfully!');
    } catch (error) {
      console.log(`Beacons ranging not started, error: ${error}`);
    }
  }

  stopRanging() {
    // stop ranging beacons:
    Beacons.stopRangingBeaconsInRegion(this.region1)
      .then(() => console.log('Beacons ranging stopped successfully'))
      .catch((error) =>
        console.log(`Beacons ranging not stopped, error: ${error}`),
      );

    Beacons.stopRangingBeaconsInRegion(this.region2)
      .then(() => console.log('Beacons ranging stopped successfully'))
      .catch((error) =>
        console.log(`Beacons ranging not stopped, error: ${error}`),
      );

    // remove ranging event we registered at componentDidMount
    this.beaconsDidRangeEvent.remove();
  }

  convertRangingArrayToMap(rangedBeacon) {
    // clear map
    this.rangedBeaconsUUIDMap[UUID_1] = [];
    this.rangedBeaconsUUIDMap[UUID_2] = [];
    rangedBeacon.forEach((beacon) => {
      if (beacon.uuid.length > 0) {
        const uuid = beacon.uuid.toUpperCase();
        this.rangedBeaconsUUIDMap[uuid] = this.rangedBeaconsUUIDMap[uuid] || [];
        this.rangedBeaconsUUIDMap[uuid].push(beacon);
      }
    });
    console.log('this.rangedBeaconsUUIDMap: ' + this.rangedBeaconsUUIDMap);
  }

  findFirstBeaconWithIdentifierToFind(uuid) {
    const majorMinorToBeFound = this.majorToBeFound + '.' + this.minorToBeFound;
    let rangedBeacons = this.rangedBeaconsUUIDMap[uuid];
    let beaconToBeFound = null;
    console.log(
      'Ranging: ' + majorMinorToBeFound + ' UUID: ' + uuid + ' RangedBeacons: ',
      rangedBeacons,
    );
    rangedBeacons.forEach((beacon) => {
      const majorMinor = beacon.major + '.' + beacon.minor;
      console.log('Checking: ' + majorMinor);
      if (majorMinor === majorMinorToBeFound) {
        console.log('Found: ' + majorMinor);
        beaconToBeFound = beacon;
      }
    });
    return beaconToBeFound;
  }
}
