import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    Root: {
      path: 'activity-monitor',
      screens: {
        ActivityMonitor: 'home',
        Links: 'links',
        ActivityMonitor: 'activity-monitor'
      },
    },
  },
};
