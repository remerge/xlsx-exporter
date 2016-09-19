import { describe, it } from 'mocha';
import { expect } from 'chai';

import * as xlsx from '../src/index.js';
import JSZip from 'jszip';

import fs from 'fs';

function makeTestWorkbook() {
  let workbook = new xlsx.Workbook();
  let worksheet = new xlsx.Worksheet([[1, 'a'], [2, 'b']]);
  workbook.addWorksheet(worksheet);
  return workbook;
}

describe('Worksheet', function() {
  it('is not undefined', function() {
    expect(xlsx.Worksheet).not.to.be.undefined;
  });
});

describe('Workbook', function() {
  it('is not undefined', function() {
    expect(xlsx.Workbook).not.to.be.undefined;
  });

  describe('#save', function() {
    it('resolves with an arraybuffer on success', function() {
      return makeTestWorkbook().save()
        .then((content) => {
          expect(content).to.be.instanceOf(Uint8Array);
        });
    });

    it('zips the correct files and structure', function() {
      return makeTestWorkbook().save()
        .then((content) => JSZip.loadAsync(content))
        .then((zip) => {
          expect(zip.file('[Content_Types].xml')).not.to.be.null;
          expect(zip.folder('_rels').file('.rels')).not.to.be.null;
          expect(zip.folder('docProps').file('app.xml')).not.to.be.null;
          expect(zip.folder('docProps').file('core.xml')).not.to.be.null;

          let xl = zip.folder('xl');
          expect(xl.folder('_rels').file('workbook.xml.rels')).not.to.be.null;
          expect(xl.folder('theme').file('theme1.xml')).not.to.be.null;
          expect(xl.folder('worksheets').file('sheet1.xml')).not.to.be.null;
          expect(xl.file('styles.xml')).not.to.be.null;
          expect(xl.file('workbook.xml')).not.to.be.null;
        });
    });
  });
});
