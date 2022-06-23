{
  "Resources": [
    {
      "Name": "Linq JS",
      "Enabled": true,
      "LoadFirst": false,
      "Order": 3,
      "ModuleType": "require",
      "FileName": "linq.js",
      "Description": "Enables querying js objects like linq."
    },
    {
      "Name": "QueryString ES5",
      "Enabled": true,
      "LoadFirst": false,
      "Order": 1,
      "ModuleType": "require",
      "FileName": "QueryString_es5.js",
      "Description": "Parses and loads current querystring collection."
    },
    {
      "Name": "Require JS",
      "Enabled": true,
      "LoadFirst": true,
      "Order": 2,
      "ModuleType": "script",
      "FileName": "require.js",
      "Description": "AMD module loading library."
    },
    {
      "Name": "JQuery",
      "Enabled": true,
      "LoadFirst": true,
      "Order": 1,
      "ModuleType": "script",
      "FileName": "jquery.js",
      "Description": "Awesome library."
    },
    {
      "Name": "Bootstrap4 JS (w/popper)",
      "Enabled": true,
      "LoadFirst": false,
      "Order": 2,
      "ModuleType": "require",
      "FileName": "bootstrap4withpopper.js",
      "Description": ""
    },
    {
      "Name": "Bootstrap 4 CSS",
      "Enabled": true,
      "LoadFirst": false,
      "Order": 1,
      "ModuleType": "style",
      "FileName": "bootstrap4.min.css",
      "Description": "Bootstrap 4 CSS"
    },
    {
      "Name": "Notify JS",
      "Enabled": true,
      "LoadFirst": false,
      "Order": 1,
      "ModuleType": "script",
      "FileName": "vanilla-notify.js",
      "Description": "Enabled app to show popup notifications."
    },
    {
      "Name": "Notify CSS",
      "Enabled": true,
      "LoadFirst": false,
      "Order": 1,
      "ModuleType": "style",
      "FileName": "vanilla-notify.css",
      "Description": "Enabled app to show popup notifications."
      },
      {
          "Name": "Froala",
          "Enabled": true,
          "LoadFirst": false,
          "Order": 1,
          "ModuleType": "require",
          "ModuleName": "Froala",
          "FileName": "froala.js",
          "Description": "Editor."
      },
      {
          "Name": "Froala CSS",
          "Enabled": true,
          "LoadFirst": false,
          "Order": 1,
          "ModuleType": "style",
          "FileName": "froala.css",
          "Description": "Editor."
      },

    {
      "Name": "Util",
      "Enabled": true,
      "LoadFirst": false,
      "Order": 2,
      "ModuleType": "require",
      "ModuleName": "Util",
      "FileName": "util.js",
      "Description": ""
    },
    {
      "Name": "Grid",
      "Enabled": true,
      "LoadFirst": false,
      "Order": 6,
      "ModuleType": "require",
      "ModuleName": "Grids",
      "FileName": "grid.js",
      "Description": ""
    },
    {
      "Name": "Bind",
      "Enabled": true,
      "LoadFirst": false,
      "Order": 6,
      "ModuleType": "require",
      "ModuleName": "Bind",
      "FileName": "bind.js",
      "Description": ""
      },
      {
          "Name": "Apps Tabstrip Helper",
          "Enabled": true,
          "LoadFirst": false,
          "Order": 2,
          "ModuleType": "require",
          "ModuleName": "Tabstrips",
          "FileName": "tabstrip.js",
          "Description": "Quick tabs. This version requires util.js in references."
      },
      {
          "Name": "Apps Tabstrip CSS",
          "Enabled": true,
          "LoadFirst": false,
          "Order": 1,
          "ModuleType": "style",
          "FileName": "tabstrip.css",
          "Description": "Decorates Apps Tabstrip."
      }
  ]
}
