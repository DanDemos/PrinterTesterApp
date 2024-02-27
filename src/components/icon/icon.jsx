import AntIcon from 'react-native-vector-icons/AntDesign'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Awesome5Icon from 'react-native-vector-icons/FontAwesome5'
import IstoIcon from 'react-native-vector-icons/Fontisto'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import IonicIcon from 'react-native-vector-icons/Ionicons'
import McommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import OctiIcon from 'react-native-vector-icons/Octicons'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import ZsocialIcon from 'react-native-vector-icons/Zocial'

export const IconComp = props => {
  if (props.type === 'ant') {
    return <AntIcon name={props.name} {...props} />
  } else if (props.type === 'entypo') {
    return <EntypoIcon name={props.name} {...props} />
  } else if (props.type === 'evil') {
    return <EvilIcon name={props.name} {...props} />
  } else if (props.type === 'feather') {
    return <FeatherIcon name={props.name} {...props} />
  } else if (props.type === 'awesome') {
    return <AwesomeIcon name={props.name} {...props} />
  } else if (props.type === 'awesome5') {
    return <Awesome5Icon name={props.name} {...props} />
  } else if (props.type === 'isto') {
    return <IstoIcon name={props.name} {...props} />
  } else if (props.type === 'foundation') {
    return <FoundationIcon name={props.name} {...props} />
  } else if (props.type === 'ionic') {
    return <IonicIcon name={props.name} {...props} />
  } else if (props.type === 'mcommunity') {
    return <McommunityIcon name={props.name} {...props} />
  } else if (props.type === 'material') {
    return <MaterialIcon name={props.name} {...props} />
  } else if (props.type === 'octi') {
    return <OctiIcon name={props.name} {...props} />
  } else if (props.type === 'smipleline') {
    return <SimpleLineIcon name={props.name} {...props} />
  } else if (props.type === 'zsocial') {
    return <ZsocialIcon name={props.name} {...props} />
  } else {
    return <AwesomeIcon name={props.name} {...props} />
  }
}