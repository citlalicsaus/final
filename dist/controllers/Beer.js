"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _beer = _interopRequireDefault(require("../models/beer"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const onGetList = (req, res) => {
  const onBeersFound = beers => {
    res.json({
      message: 'se ha realizado con exito',
      data: beers
    });
  };

  _beer.default.find({}).then(onBeersFound).catch((0, _utils.default)(res));
};

const onGetEntity = (req, res) => {
  const {
    id
  } = req.params;

  const onBeerFound = beer => {
    res.json({
      message: 'se ha realizado con exito',
      data: beer
    });
  };

  _beer.default.findOne({
    _id: id
  }).then(onBeerFound).catch((0, _utils.default)(res));
};

const onCreateEntity = (req, res) => {
  const beer = (0, _beer.default)(req.body);

  const onBeerCreated = beerCreated => {
    res.json({
      message: 'Exito',
      data: beerCreated
    });
  };

  beer.save().then(onBeerCreated).catch((0, _utils.default)(res));
};

const onUpdateEntity = (req, res) => {
  const {
    id
  } = req.params;
  const {
    name,
    nameDisplay,
    abv,
    isOrganic,
    isRetired,
    status,
    statusDisplay
  } = req.body;

  const onFindEntity = beer => {
    beer.name = name;
    beer.nameDisplay = nameDisplay;
    beer.abv = abv;
    beer.isOrganic = isOrganic;
    beer.isRetired = isRetired;
    beer.status = status;
    beer.statusDisplay = statusDisplay;

    const onBeerSaved = beerUpdated => {
      res.json({
        message: 'exito se actualizo tu cheve',
        data: beerUpdated
      });
    };

    beer.save().then(onBeerSaved).catch((0, _utils.default)(res));
  };

  _beer.default.findOne({
    _id: id
  }).then(onFindEntity).catch((0, _utils.default)(res));
};

const onDeleteEntity = (req, res) => {
  const {
    id
  } = req.params;

  const onBeerDeleted = () => {
    res.json({
      message: 'Ha sido borrado con exito'
    });
  };

  _beer.default.deleteOne({
    _id: id
  }).then(onBeerDeleted).catch((0, _utils.default)(res));
};

var _default = app => {
  app.get('/beer', onGetList);
  app.post('/beer', onCreateEntity);
  app.get('/beer/:id', onGetEntity);
  app.put('/beer/:id', onUpdateEntity);
  app.delete('/beer/:id', onDeleteEntity);
};

exports.default = _default;
//# sourceMappingURL=Beer.js.map