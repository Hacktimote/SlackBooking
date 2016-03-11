/**
 * Created by franciosdelpech on 3/11/16.
 */
var Color = require("color")

var primary = Color("#ecf0f1");
var secondary = Color("#453F41");
var sidebar = Color("#9b59b6");
var navbar = Color("#9b59b6");

var darken = primary.darken(0.2).hexString().toString();

module.exports = {
  brandPrimary : primary.hexString().toString(),
  darker: darken,
  brandSecondary: secondary.hexString().toString(),
  brandSidebar: sidebar.hexString().toString(),
  brandNavbar: sidebar.hexString().toString()
}