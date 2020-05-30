module.exports = {
  name: 'generic-application',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/generic-application',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
