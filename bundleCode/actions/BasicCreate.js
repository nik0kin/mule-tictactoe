var _ = require('lodash');

exports.validateQ = function (M, actionOwnerRel, params) {
  var space = M.getSpace(params.whereId);

  if (!space) {
    throw 'INVALID SPACE';
  }

  var piecesOnSpace = M.getPieces({spaceId: space.boardSpaceId});

  if (piecesOnSpace.length > 0) {
    throw 'SPACE IS FULL';
  }
};

exports.doQ = function (M, actionOwnerRel, params) {
  M.log('new piece, ' + actionOwnerRel + ' at ' + params.whereId);

  var newPiece = {
    'class': (actionOwnerRel === 'p1') ? 'O' : 'X',
    attributes: {},
    ownerId: actionOwnerRel,
    locationId: params.whereId
  };

  M.addPiece(newPiece);

  return M.persistQ();
};
