var _ = require('lodash'),
  Q = require('q');

var winConditionHookQ = function (M) {
  var winner = undefined,
    mPieces = {},
    pieces = M.getPieces();

  _.each(pieces, function (piece) {
    mPieces[piece.locationId] = {'class': piece.class};
  });

  var checkWin = function (spacesIds) {
    var s1 = mPieces[spacesIds[0]],
      s2 = mPieces[spacesIds[1]],
      s3 = mPieces[spacesIds[2]];

    if (s1 && s2 && s3) {
      if (s1.class === 'O' && s2.class === 'O' && s3.class === 'O') {
        winner = 'p1';
      } else if (s1.class === 'X' && s2.class === 'X' && s3.class === 'X') {
        winner = 'p2';
      }
    }
  };

  checkWin(['topLeft', 'topMiddle', 'topRight']);
  checkWin(['middleLeft', 'middleMiddle', 'middleRight']);
  checkWin(['bottomLeft', 'bottomMiddle', 'bottomRight']);

  checkWin(['topLeft', 'middleLeft', 'bottomLeft']);
  checkWin(['topMiddle', 'middleMiddle', 'bottomMiddle']);
  checkWin(['topRight', 'middleRight', 'bottomRight']);

  checkWin(['topLeft', 'middleMiddle', 'bottomRight']);
  checkWin(['bottomLeft', 'middleMiddle', 'topRight']);

  if (!winner && pieces.length === 9) {
    return 'tie';
  }

  return Q(winner);
};

module.exports = winConditionHookQ;
