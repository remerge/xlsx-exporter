# xlsx-exporter

A simple XLSX exporter for Node.js and browsers, with the simple goal of being able to export a 2D array directly to an XLSX file.

## Usage

```
import * as xlsx from 'xlsx-exporter';

let data = [[1, 'a'], [2, 'b']]
let worksheet = new xlsx.Worksheet(data);
let workbook = new xlsx.Workbook();
workbook.addWorksheet(worksheet);
workbook.save(function(array) {
  // do something with this Uint8Array
})
```
