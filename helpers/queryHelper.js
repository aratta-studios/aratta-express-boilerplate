import Sequelize from "sequelize";



export default class QueryHelper {

  constructor(model) {
    this.model = model;
  }

  update(body, res) {
    this.model.findOne({where: {id: body.id}}).then(object => {
      if (object !== null) {
        object.update(body).then(object => res.status(200).json({
          type: 'success',
          message: `updated!`,
          data: object
        }));
      } else {
        res.status(200).json({
          type: 'success',
          message: `not found!`,
          data: null
        })
      }
    }).catch(e=> res.status(200).json({
      type: 'Error',
      message: e.message,
      data: e
    }));
  }

  create(body, res) {
    this.model.create(body).then(object => res.status(200).json({
      type: 'success',
      message: 'created!',
      data: object
    })).catch(e=> res.status(200).json({
      type: 'Error',
      message: e.message,
      data: e
    }));
  }

  /**
   * Updates if id is defined in body, else creates
   * @param body
   * @param res
   */
  createOrUpdate(body, res) {
    if (body.id !== undefined) {
      this.update(body, res)
    } else {
      this.create(body, res);
    }
  }

  find(body, res) {
    return {
      all: () => this.model.findAll().then(object => res.status(200).json({
        type: 'success',
        message: 'found all!',
        data: object
      })).catch(e=> res.status(200).json({
        type: 'Error',
        message: e.message,
        data: e
      })),
      one: () => this.model.findOne({where: {id: body.id}}).then(object => res.status(200).json({
        type: 'success',
        message: 'found requested',
        data: object
      })).catch(e=> res.status(200).json({
        type: 'Error',
        message: e.message,
        data: e
      })),
      paginated: (page,pageSize) => {

        const offset = parseInt(page) * parseInt(pageSize);
        const limit = offset + parseInt(pageSize);

        return this.model.findAll({
          limit,
          offset
        }).then(object => res.status(200).json({
          type: 'success',
          message: 'found all!',
          data: object
        })).catch(e=> res.status(200).json({
          type: 'Error',
          message: e.message,
          data: e
        }))
      },
      conditional: (condition,relations) => this.model.findAll({
        where: condition,
        include: relations
      }).then(object => res.status(200).json({
        type: 'success',
        message: 'found all!',
        data: object
      })).catch(e=> res.status(200).json({
        type: 'Error',
        message: e.message,
        data: e
      }))
    }
  }

  delete(condition, res) {
    this.model.destroy({where: condition}).then(() => res.status(200).json({
      type: 'success',
      message: 'deleted!',
      data: null
    })).catch(e=> res.status(200).json({
      type: 'Error',
      message: e.message,
      data: e
    }));
  }

}
