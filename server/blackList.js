const blackList = {};

function addToBlackList(token) {
  const blackListLength = Object.keys(blackList).length;
  blackList[blackListLength] = token;
  setTimeout(() => delete blackList[blackListLength], 300 * 1000);
}

function checkBlackList(token) {
  return Object.values(blackList).some((blackToken) => blackToken == token);
}

module.exports = { addToBlackList, checkBlackList };
