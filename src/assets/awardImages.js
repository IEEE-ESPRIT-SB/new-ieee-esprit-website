// This file will be used to list all award images
export function getAwardImages() {
  const awardFileNames = [
    'IEEE Outstanding Branch Counselor and Branch Chapter Advisor Award 2022.jpg',
    'IEEE R8 Medium Student Branch Chapter of the Year Award .jpg',
    'IEEE Region 8 Large Student Branch Chapter of the Year 2021 Award.jpg',
    'IEEE Tunisia Section Outstanding LARGE Student Branch Award 2021.jpg',
    'IEEE Tunisia Section Women In Engineering Affinity Group Award 2021.jpg',
    'IEEE WIE Student Branch Affinity Group of the Year Award.jpg',
    'none.jpg',
    'none1.jpg',
    'R8 Large Student Branch Chapter of the Year Award 2022 .JPG',
    'Region 8 SIGHT Student Branch of the Year 2022 Award.jpg',
    'The Darrel Chong Student Activity Award Bronze 2022.jpg',
    'The Most Inspiring IEEE Region 8 SIGHT DAY 2023 celebration.jpg'
  ];
  
  const mappedFiles = awardFileNames.map((filename, index) => ({
    id: index,
    src: `/assets/awards/${filename}`,
    alt: filename.replace('.jpg', '').replace('.JPG', '')
  }));

  return mappedFiles;
}

// This function splits the award images into two separate arrays
export function getSplitAwardImages() {
  const allAwards = getAwardImages();
  const halfLength = Math.ceil(allAwards.length / 2);
  
  return {
    firstHalf: allAwards.slice(0, halfLength),
    secondHalf: allAwards.slice(halfLength)
  };
}