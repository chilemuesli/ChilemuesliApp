import React from 'react';
import {Platform, SectionList, StyleSheet, Text, View} from 'react-native';
import Beacons from 'react-native-beacons-manager';
import {useBluetoothState} from 'react-native-bluetooth-state-manager';

/**
 * uuid of YOUR BEACON (change to yours)
 * @type {String} uuid
 */
const UUID = 'FDA50693-A4E2-4FB1-AFCF-C6EB07647825';
const IDENTIFIER = 'Holy';

const OTHER_UUID = 'AB9F6774-7413-4806-8497-A30B7C1A9DE4';
const OTHER_IDENTIFIER = 'April';

const REGIONS = [
  {identifier: IDENTIFIER, uuid: UUID},
  {identifier: OTHER_IDENTIFIER, uuid: OTHER_UUID},
];

const BeaconsDemo = () => {
  const bluetoothState = useBluetoothState();
  // beacons by (upper case) region UUID
  const [beaconsByUuid, setBeaconsByUuid] = React.useState({
    [UUID.toUpperCase()]: [],
    [OTHER_UUID.toUpperCase()]: [],
  });

  React.useEffect(() => {
    if (Platform.OS === 'ios') {
      Beacons.requestAlwaysAuthorization();
      Beacons.startUpdatingLocation();
    } else {
      Beacons.detectIBeacons();
    }

    REGIONS.forEach((region) => {
      Beacons.startRangingBeaconsInRegion(region)
        .then(() => console.log('Beacons ranging started succesfully'))
        .catch((error) =>
          console.log(`Beacons ranging not started, error: ${error}`),
        );
    });

    // Ranging: Listen for beacon changes
    const subscription = Beacons.BeaconsEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        console.log('beaconsDidRange data: ', data);
        const next = {
          [UUID.toUpperCase()]: [],
          [OTHER_UUID.toUpperCase()]: [],
        };
        (data.beacons || []).forEach((beacon) => {
          if (beacon.uuid.length > 0) {
            const uuid = beacon.uuid.toUpperCase();
            next[uuid] = [...(next[uuid] || []), beacon];
          }
        });
        setBeaconsByUuid(next);
      },
    );

    return () => {
      REGIONS.forEach((region) => {
        Beacons.stopRangingBeaconsInRegion(region)
          .then(() => console.log('Beacons ranging stopped succesfully'))
          .catch((error) =>
            console.log(`Beacons ranging not stopped, error: ${error}`),
          );
      });
      subscription.remove();
    };
  }, []);

  const sections = Object.keys(beaconsByUuid).map((uuid) => ({
    title: uuid,
    data: beaconsByUuid[uuid],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.btleConnectionStatus}>
        Bluetooth connection status: {bluetoothState ? bluetoothState : 'NA'}
      </Text>
      <Text style={styles.headline}>ranging beacons:</Text>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.uuid + item.major + item.minor + index}
        renderSectionHeader={({section}) => (
          <Text style={styles.rowSection}>{section.title}</Text>
        )}
        renderItem={({item}) => (
          <View style={styles.row}>
            <Text style={styles.smallText}>UUID: {item.uuid ? item.uuid : 'NA'}</Text>
            <Text style={styles.smallText}>Major: {item.major ? item.major : 'NA'}</Text>
            <Text style={styles.smallText}>Minor: {item.minor ? item.minor : 'NA'}</Text>
            <Text>RSSI: {item.rssi ? item.rssi : 'NA'}</Text>
            <Text>Proximity: {item.proximity ? item.proximity : 'NA'}</Text>
            <Text>
              Distance: {item.distance ? item.distance.toFixed(2) : 'NA'}m
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    margin: 5,
    backgroundColor: '#F5FCFF',
  },
  btleConnectionStatus: {
    fontSize: 20,
    paddingTop: 20,
  },
  headline: {
    fontSize: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  row: {
    padding: 8,
    paddingBottom: 16,
  },
  smallText: {
    fontSize: 11,
  },
  rowSection: {
    fontWeight: '700',
  },
});

export default BeaconsDemo;
