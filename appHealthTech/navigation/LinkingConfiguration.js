import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    Root: {
      path: 'root',
      screens: {
        ActivityMonitor: 'home',
        Links: 'links',
        ActivityMonitor: 'activity-monitor'
      },
    },
  },
};
