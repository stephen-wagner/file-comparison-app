import _ from 'lodash';

export const compareDatasets = (dataset1, dataset2) => {
  const differences = [];

  dataset1.forEach((item1, index) => {
    const item2 = dataset2[index];
    if (item2) {
      const diffFields = {};
      Object.keys(item1).forEach((key) => {
        if (!_.isEqual(item1[key], item2[key])) {
          diffFields[key] = { file1: item1[key], file2: item2[key] };
        }
      });
      if (Object.keys(diffFields).length > 0) {
        differences.push({ index, diffFields });
      }
    } else {
      differences.push({ index, onlyInFile1: item1 });
    }
  });

  dataset2.forEach((item2, index) => {
    if (!dataset1[index]) {
      differences.push({ index, onlyInFile2: item2 });
    }
  });

  return differences;
};