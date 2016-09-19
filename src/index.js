import JSZip from 'jszip'

import {
  makeContentTypes,
  makeRels,
  makeApp,
  makeCore,
  makeWorkbookRels,
  makeTheme,
  makeSheet,
  makeStyles,
  makeWorkbook
} from './templates';

export class Worksheet {
  constructor(data) {
    this.data = data;
  }
}

export class Workbook {
  constructor() {
    this.worksheets = [];
  }

  addWorksheet(worksheet) {
    this.worksheets.push(worksheet);
  }

  save() {
    let zip = new JSZip();
    zip.file('[Content_Types].xml', makeContentTypes());
    zip.folder('_rels').file('.rels', makeRels());

    let docProps = zip.folder('docProps');
    docProps.file('app.xml', makeApp());
    docProps.file('core.xml', makeCore());

    let xl = zip.folder('xl');
    xl.folder('_rels').file('workbook.xml.rels', makeWorkbookRels());
    xl.folder('theme').file('theme1.xml', makeTheme());

    this.worksheets.forEach(function(worksheet) {
      // TODO: doesn't support more than one worksheet
      xl.folder('worksheets').file('sheet1.xml', makeSheet(worksheet));
    });

    xl.file('styles.xml', makeStyles());
    xl.file('workbook.xml', makeWorkbook(this));

    return zip.generateAsync({ type: 'uint8array' });
  }
}
