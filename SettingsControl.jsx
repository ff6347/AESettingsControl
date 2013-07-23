// Copyright (c)  2013
// Fabian "fabiantheblind" Morón Zirfas
// Permission is hereby granted, free of charge, to any
// person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software
// without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to  permit persons to
// whom the Software is furnished to do so, subject to
// the following conditions:
// The above copyright notice and this permission notice
// shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF  CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTIO
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// see also http://www.opensource.org/licenses/mit-license.php

/**
 * This is a settings control class
 * Used it at will
 * @param {String} _section the Settings Section Name
 */
function SettingsControl (_section) {
/**
 * Usage:
 *
 *  var data = {
 *   settingsSectionName:"testSettings",
 *   key_string:"astring",
 *   key_int:"ainteger",
 *   key_float:"afloatingpointvalue",
 *   key_boolean:"aboolean"
 * };
 *
 * var sc = new SettingsControl(data.settingsSectionName);
 *
 * test_set();
 * test_get();
 * sc = null;
 *
 *
 *
 * function test_get () {
 *   var resbool = sc.exec.get_setting_boolean( data.key_boolean);
 *   alert("Boolean Value: "+resbool);
 *
 *   var resint = sc.exec.get_setting_int( data.key_int);
 *   alert("Integer Value: "+ resint);
 *
 *     var resfloat = sc.exec.get_setting_int( data.key_float);
 *   alert("Floating Point Value: "+ resfloat);
 *
 *     var resstring = sc.exec.get_setting_string( data.key_string);
 *   alert("String Value: "+ resstring);
 * }
 * function test_set(){
 *    sc.exec.set_setting_boolean( data.key_boolean, false);
 *    sc.exec.set_setting_number( data.key_int, 345);
 *    sc.exec.set_setting_string(data.key_string, "Hello Settings");
 *   sc.exec.set_setting_number(data.key_float, 2.5);
 * }
 *
 */

  this.section = _section;
  this.exec = {
  section : _section,
/**
 * GETTER functions
 */
"get_setting"  : function (key, variable) {
  if((app.settings.haveSetting(this.section,key) === true)){
    variable = app.settings.getSetting(this.section, key);
  }
  return variable;
},

"get_setting_int" : function ( key) {
  var integer = null;
  integer = this.get_setting( key, integer);
  if(integer !== null){
      integer = parseInt(integer,10);
      if(isNaN(integer)){
        integer = null;
      }
  }
  return integer;
},

"get_setting_float"  : function ( key) {
  var floatingpointvalue = null;
  floatingpointvalue = this.get_setting( key, floatingpointvalue);
  if(floatingpointvalue !== null){
      floatingpointvalue = parseFloat(floatingpointvalue);
      if(isNaN(floatingpointvalue)){
        floatingpointvalue = null;
      }
  }
  return floatingpointvalue;
},

"get_setting_boolean"  : function ( key) {
  var bool = null;
  bool = this.get_setting( key, bool);
  if(bool !== null){
    bool = (bool === 'true') ? true : false;
  }
  return bool;
},

"get_setting_string"  : function ( key) {
  var str = null;
  str = this.get_setting( key, str);
  return str;
},


/**
 * SETTER FUNCTIONS
 */


"set_setting" : function ( key, val){
    app.settings.saveSetting(this.section, key, val);
},

"set_setting_number"  : function ( key, value) {
  this.set_setting( key, (String(value)));
},

"set_setting_string"  : function ( key, value) {
  this.set_setting( key, String(value));
},
 set_setting_boolean  : function ( key, value) {
   var val = value ? 'true' : 'false';
   this.set_setting( key , (value ? 'true' : 'false'));
 },
"isInt": function(n) {
   return n % 1 === 0;
},
"detectType":function(value){
  var res = null;
  switch (typeof value) {
    case 'string':
      res = 0;
      break;
    case 'number':
      if(this.isInt(value)){

      res = 1;
      }else{
        res = 2;
      }
      break;
    case 'boolean':
      res = 3;
      break;
    default:
      res = 4;
      break;
  }
  return res;
  },
 "patch_settings_recieve": function(obj, keys){
  /**
   * This function gets an object flat object like this
   * settings = {
   * "radius":100,
   * "doit": true,
   * "name": "Bob"
   * };
   *
   * and compares the key names to a list of keys that should be in the section
   *
   */
      for(var i = 0; i < keys.length;i++){
  for(var key in obj){
    if(obj.hasOwnProperty(key)){
        if(key == keys[i]){
          // do something.
          // not done yet. It needs to identify what type of object it is
          // eg . switch
          var val = null;
          var type = this.detectType(obj[key]);
          if (type === 0) {

            val = this.get_setting_string(keys[i]);
            if(val !== null){
              obj[key] = val;
            }

            }else if(type === 1){
            val = this.get_setting_int(keys[i]);
            if(val !== null){
              obj[key] = val;
            }
            }else if (type === 2) {
            val = this.get_setting_float(keys[i]);
            if(val !== null){
              obj[key] = val;
            }
            }else if (type ===3) {
            val = this.get_setting_boolean(keys[i]);
            if(val !== null){
              obj[key] = val;
            }
            } else if(type === 4){
            }
        }
      }
    }
  }
 }
};
} // end of settings control