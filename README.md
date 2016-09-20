# xlsx-exporter

A simple XLSX exporter for Node.js and browsers, with the goal of being able to export a 2D array directly to an XLSX file.

## Usage

```javascript
import * as xlsx from 'xlsx-exporter';

const worksheet = new xlsx.Worksheet([[1, 'a'], [2, 'b']]);
const workbook = new xlsx.Workbook();
workbook.addWorksheet(worksheet);
workbook.save(function(array) {
  // do something with this Uint8Array
})
```
