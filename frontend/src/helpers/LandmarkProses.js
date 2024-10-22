function preProcessLandmark(landmarkList) {
  // Salin daftar landmark
  const tempLandmarkList = JSON.parse(JSON.stringify(landmarkList));

  // Convert to relative coordinates
  let baseX = 0,
    baseY = 0;
  tempLandmarkList.forEach((landmarkPoint, index) => {
    if (index === 0) {
      baseX = landmarkPoint[0];
      baseY = landmarkPoint[1];
    }

    landmarkPoint[0] = landmarkPoint[0] - baseX;
    landmarkPoint[1] = landmarkPoint[1] - baseY;
  });

  // Convert to a one-dimensional list
  const flatLandmarkList = tempLandmarkList.flat();

  // Normalization
  const maxValue = Math.max(...flatLandmarkList.map(Math.abs));

  const normalize = (n) => n / maxValue;

  const normalizedLandmarkList = flatLandmarkList.map(normalize);

  return normalizedLandmarkList;
}

export default preProcessLandmark;
