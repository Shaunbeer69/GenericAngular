module.exports = {
  name: 'security',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/security',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
