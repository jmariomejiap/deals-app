import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
  Button,
  Linking
} from 'react-native';
import { priceDisplay } from '../util';
import ajax from '../ajax'; 

class DealDetail extends React.Component {
  static propTypes = {
    initialDealData: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
  }

  state = {
    deal: this.props.initialDealData,
    imageIndex: 0,
  }

  async componentDidMount() {
    const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
    this.setState({
      deal: fullDeal,
    });
  }


  // animation touch...
  imageXPosition = new Animated.Value(0);

  imagePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gs) => {
      this.imageXPosition.setValue(gs.dx);
    },
    onPanResponderRelease: (evt, gs) => {
      this.screenWidth = Dimensions.get('window').width;

      // use math to determine right or left base on - negative value
      if (Math.abs(gs.dx) > this.screenWidth * 0.4) {
        const direction = Math.sign(gs.dx);
        
        Animated.timing(this.imageXPosition, {
          toValue: direction * this.screenWidth,
          duration: 250,
        }).start(() => this.handleSwipe(-1 * direction));
      }
      else {
        Animated.spring(this.imageXPosition, {
          toValue: 0,
        }).start();
      }
    },
  });

  // +1 = rigth and -1 = left
  handleSwipe = (indexDirection) => {
    if (!this.state.deal.media[this.state.imageIndex + indexDirection]) {
      Animated.spring(this.imageXPosition, {
        toValue: 0,
      }).start();
      return;
    }
  
    this.setState((prevState) => {
      return { imageIndex: prevState.imageIndex + indexDirection };
    }, () => {
      this.imageXPosition.setValue(indexDirection * this.screenWidth);
      Animated.spring(this.imageXPosition, {
        toValue: 0,
      }).start();
    });
  };

  openDealUrl = () => {
    if (!this.state.deal.url) {
      return;
    }
    Linking.openURL(this.state.deal.url);
  } 


  render() {
    const { deal } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onBack}>
          <Text style={styles.backLink}>Back</Text>
        </TouchableOpacity>
        <Animated.Image
          {...this.imagePanResponder.panHandlers}
          source={{ uri: deal.media[this.state.imageIndex] }}
          style={[{ left: this.imageXPosition }, styles.image]}
        />
        <View style={styles.detail}>
          <Text style={styles.title} >{deal.title}</Text>
          <View style={styles.footer}>
            <View style={styles.info}>
              <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
              <Text style={styles.cause}>{deal.cause.name}</Text>
            </View>
            {deal.user && (
              <View style={styles.user}>
                <Image source={{ uri: deal.user.avatar }} style={styles.avatar} />
                <Text>{deal.user.name}</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.description}>
          <Text>{deal.description}</Text>
        </View>
        <Button title="Buy this deal" onPress={this.openDealUrl}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backLink: {
    color: '#22f',
    marginBottom: 10,
    marginLeft: 10,
  },
  image: {
    width: '100%',
    height: 150,

  },
  title: {
    fontSize: 15,
    padding: 10,
    fontWeight: 'bold',
    // marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  },
  info: {
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#bbb',
    borderWidth: 1,
    borderTopWidth: 0,
  },
  user: {
    alignItems: 'center',
  },
  cause: {
    marginVertical: 10,
  },
  price: {
    fontWeight: 'bold',
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  description: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderStyle: 'dotted',
    margin: 10,
    padding: 10,
  },
});

export default DealDetail;
