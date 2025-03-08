import _ from 'lodash';

/**
 * Compares two datasets from XLSX or CSV files and identifies differences.
 * @param {Array<Object>} dataset1 - First dataset as an array of objects.
 * @param {Array<Object>} dataset2 - Second dataset as an array of objects.
 * @returns {Array<Object>} Array of differences, including field-level diffs and rows unique to each dataset.
 */
export const compareDatasets = (dataset1, dataset2) => {
  const differences = [];

  // Compare rows present in dataset1
  dataset1.forEach((item1, index) => {
    if (index < dataset2.length) {
      const item2 = dataset2[index];
      // Get all unique keys from both items
      const allKeys = new Set([...Object.keys(item1), ...Object.keys(item2)]);
      const diffFields = {};
      allKeys.forEach((key) => {
        if (!_.isEqual(item1[key], item2[key])) {
          diffFields[key] = { file1: item1[key], file2: item2[key] };
        }
      });
      if (Object.keys(diffFields).length > 0) {
        differences.push({ index, diffFields });
      }
    } else {
      // Row exists only in dataset1
      differences.push({ index, onlyInFile1: item1 });
    }
  });

  // Add remaining rows from dataset2
  dataset2.slice(dataset1.length).forEach((item2, offset) => {
    const index = dataset1.length + offset;
    differences.push({ index, onlyInFile2: item2 });
  });

  return differences;
};