import * as xlsx from '../src/index.js';
import JSZip from 'jszip';

const makeTestWorkbook = () => {
  let workbook = new xlsx.Workbook();
  let worksheet = new xlsx.Worksheet([[1, 'a'], [2, 'b']]);
  workbook.addWorksheet(worksheet);
  return workbook;
}

describe('Worksheet', () => {
  it('is not undefined', () => {
    expect(xlsx.Worksheet).toBeDefined();
  });
});

describe('Workbook', () => {
  it('is not undefined', () => {
    expect(xlsx.Workbook).toBeDefined();
  });

  describe('#save', () => {
    it('resolves with an arraybuffer on success', () => {
      return makeTestWorkbook().save()
        .then((content) => {
          expect(content).toBeInstanceOf(Uint8Array);
        });
    });

    it('zips the correct files and structure', () => {
      return makeTestWorkbook().save()
        .then((content) => JSZip.loadAsync(content))
        .then((zip) => {
          expect(zip.file('[Content_Types].xml')).not.toBeNull();
          expect(zip.folder('_rels').file('.rels')).not.toBeNull();
          expect(zip.folder('docProps').file('app.xml')).not.toBeNull();
          expect(zip.folder('docProps').file('core.xml')).not.toBeNull();

          let xl = zip.folder('xl');
          expect(xl.folder('_rels').file('workbook.xml.rels')).not.toBeNull();
          expect(xl.folder('theme').file('theme1.xml')).not.toBeNull();
          expect(xl.folder('worksheets').file('sheet1.xml')).not.toBeNull();
          expect(xl.file('styles.xml')).not.toBeNull();
          expect(xl.file('workbook.xml')).not.toBeNull();
        });
    });
  });
});
