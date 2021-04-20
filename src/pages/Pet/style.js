import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  infoTitleAdoption: {
    color: '#f7a800',
  },
  infoTitleMeusPets: {
    color: '#589b9b',
  },
  infoTitle: {
    fontSize: 12,
    fontFamily: 'Roboto Regular',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  infoBox: {
    marginRight: 80,
  },
  info: {
    color: '#757575',
    fontFamily: 'Roboto Regular',
    fontSize: 14,
  },
  title: {
    fontFamily: 'Roboto Medium',
    fontSize: 16,
    color: '#434343',
    textTransform: 'capitalize',
    marginBottom: 16,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  line: {
    marginBottom: 16,
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});

export default styles;