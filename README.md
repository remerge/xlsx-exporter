# xlsxport

A simple XLSX exporter for Node.js and browsers, with the simple goal of being able to export a 2D array directly to an XLSX file.

## Usage

```
let data = [[1, 'a'], [2, 'b']]
let worksheet = new xlsx.Worksheet(data);
let workbook = new xlsx.Workbook();
workbook.addWorksheet(worksheet);
workbook.save(function(array) {
  // do something with this Uint8Array
})
```

## Checklist

[] Export 2D array to XLSX file
[] Ensure compatibility with Node.js
[] Ensure compatibility with Browserify/webpack
[] Published source should be ES5
