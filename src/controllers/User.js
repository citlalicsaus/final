import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user';
import Beer from '../models/beer';
import { SECRET, SALTINESS } from '../config';
import onPromiseError from './utils';

const onGetList = (req, res) => {
  const onUsersFound = (users) => {
    res.json({
      message: 'se ha realizado con exito',
      data: users,
    });
  };
  User.find({})
    .populate('beersTaken')
    .then(onUsersFound)
    .catch(onPromiseError(res));
};

const onGetEntity = (req, res) => {
  const { id } = req.params;
  const onUserFound = (user) => {
    res.json({
      message: 'se ha realizado con exito',
      data: user,
    });
  };

  User.findOne({ _id: id })
    .populate('beersTaken')
    .then(onUserFound)
    .catch(onPromiseError(res));
};

const onCreateEntity = (req, res) => {
  const { name, email, password } = req.body;
  const onSaltHash = (hash) => {
    const newUser = new User({
      name,
      email,
      password: hash,
      beersTaken: [],
    });
    const onSaveUser = (userSaved) => {
      res.json({
        message: 'Usuario creado con exito',
        data: userSaved,
      });
    };
    newUser
      .save()
      .then(onSaveUser)
      .catch(onPromiseError(res));
  };
  bcrypt
    .hash(password, SALTINESS)
    .then(onSaltHash)
    .catch(onPromiseError(res));
};

const onUpdateEntity = (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const onUserFound = (user) => {
    user.name = name;
    user.email = email;
    user.password = password;
    const onUserSaved = (userSaved) => {
      res.json({
        message: 'Usuario Actualizado',
        data: userSaved,
      });
    };
    user
      .save()
      .then(onUserSaved)
      .catch(onPromiseError(res));
  };
  User.findOne({ _id: id })
    .then(onUserFound)
    .catch(onPromiseError(res));
};

const onDeleteEntity = (req, res) => {
  const { id } = req.params;
  const onUserDeleted = () => {
    res.json({ message: 'Usuario borrado correctamente' });
  };
  User.deleteOne({ _id: id })
    .then(onUserDeleted)
    .catch(onPromiseError(res));
};

const onDrankBeer = (req, res) => {
  if (!req.user) {
    res.status(400).json({
      message: 'Permiso denegado',
    });
    return;
  }
  const { beerID } = req.params;
  const onBeerFound = (beerFound) => {
    if (!beerFound) {
      res.status(404).json({ message: 'cheve no enctrada' });
    }
    req.user.beersTaken.push(beerFound._id);
    const onUserSaved = () => {
      res.json({
        message: 'User drank a beer successfully',
      });
    };
    req.user
      .save()
      .then(onUserSaved)
      .catch(onPromiseError(res));
  };
  Beer.findOne({ _id: beerID })
    .then(onBeerFound)
    .catch(onPromiseError(res));
};

const onLogin = (req, res) => {
  const { email, password } = req.body;
  const onUserFound = (user) => {
    if (!user) {
      return res.status(404).json({
        message: 'Usuario no encontrado',
      });
    }
    const onCompare = (isEqual) => {
      if (!isEqual) {
        res.status(300).json({ message: 'wrong password' });
      }
      const token = jwt.sign(
        {
          id: user._id,
        },
        SECRET,
        { expiresIn: 240 },
      );
      res.json({ auth: true, token });
    };

    bcrypt
      .compare(password, user.password)
      .then(onCompare)
      .catch(onPromiseError(res));
  };

  User.findOne({ email })
    .then(onUserFound)
    .catch(onPromiseError(res));
};

export default (app) => {
  app.get('/user', onGetList);
  app.get('/user/:id', onGetEntity);
  app.post('/user', onCreateEntity);
  app.post('/user/login', onLogin);
  app.put('/user/:id', onUpdateEntity);
  app.put('/user/drank/:beerID', onDrankBeer);
  app.delete('/user/:id', onDeleteEntity);
};
