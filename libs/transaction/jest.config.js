module.exports = {
  name: 'transaction',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/transaction',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
