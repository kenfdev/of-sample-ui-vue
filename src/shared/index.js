export function tryDownload(data, filename) {
  let caught;

  try {
    const blob = new Blob([data], { type: 'binary/octet-stream' });

    if (window.navigator.msSaveBlob) {
      // // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      var linkElement = window.document.createElement('a');
      linkElement.href = window.URL.createObjectURL(blob);
      linkElement.download = filename;
      document.body.appendChild(linkElement);
      linkElement.click();
      document.body.removeChild(linkElement);
    }
  } catch (ex) {
    caught = ex;
  }
  return caught;
}

export function uuidv4() {
  var cryptoInstance = window.crypto || window.msCrypto; // for IE11
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => {
    return (
      c ^
      (cryptoInstance.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16);
  });
}
