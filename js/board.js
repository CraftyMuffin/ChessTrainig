function createChessBoard(position) {
  var game = new Chess();
  var config = {
    draggable: true,
    pieceTheme: 'img/chesspieces/{piece}.png',
    position: position || 'start',
    onDragStart: (_source, piece, _position, _orientation) => {
      if (game.game_over()) return false;

      if (
        (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)
      ) {
        return false;
      }
    },
    onDrop: (source, target) => {
      var move = game.move({
        from: source,
        to: target,
        promotion: 'q', // NOTE: always promote to a queen for example simplicity
      });

      if (move === null) return 'snapback';
    },
    onSnapEnd: () => {
      board.position(game.fen());
    },
  };

  return ChessBoard('board', config);
}
