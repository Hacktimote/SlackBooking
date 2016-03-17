/**
 * Created by franciosdelpech on 3/11/16.
 */

import {MKColor} from 'react-native-material-kit';
import Color from 'color';

var sidebar = Color("#9b59b6");
var primary = Color("white").hexString().toString();
var secondary = MKColor.Green;

module.exports = {
  brandPrimary : primary,
  brandSecondary: secondary,
  brandSidebar: sidebar.hexString().toString(),
  brandNavbar: primary
};