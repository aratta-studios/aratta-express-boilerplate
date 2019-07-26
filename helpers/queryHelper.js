export default class QueryHelper {

  constructor(model) {
    this.model = model;
  }

  /**
   * Updates database record based on data in request body it's important that body contains an id
   * @param body
   * @param res
   */
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
    }).catch(e => res.status(200).json({
      type: 'Error',
      message: e.message,
      data: e
    }));
  }

  /**
   * Creates a new database record based on body
   * @param body
   * @param res
   */
  create(body, res) {
    this.model.create(body).then(object => res.status(200).json({
      type: 'success',
      message: 'created!',
      data: object
    })).catch(e => res.status(200).json({
      type: 'Error',
      message: e.message,
      data: e
    }));
  }

  /**
   * Creates a new database record based on body without http response
   * @param body
   */
  createWithoutResponse(body) {
    this.model.create(body);
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

  /**
   * Finds db record or records
   * @param body
   * @param res
   * @param relations
   * @returns {{all: (function(): Promise<T | never>), paginated: (function(*=, *=): Promise<T | never>), conditional: (function(*=, *=): Promise<T | never>), one: (function(): Promise<T | never>)}}
   */
  find(body, res, relations) {
    return {
      /**
       * finds all records for given model in the class constructor
       * @returns {Promise<T | never>}
       */
      all: () => this.model.findAll({
        include: relations
      }).then(object => res.status(200).json({
        type: 'success',
        message: 'found all!',
        data: object
      })).catch(e => res.status(200).json({
        type: 'Error',
        message: e.message,
        data: e
      })),
      /**
       * finds one record for given model in the class constructor based on id in the request body
       * @returns {Promise<T | never>}
       */
      one: () => this.model.findOne({
        where: {id: body.id},
        include: relations
      }).then(object => res.status(200).json({
        type: 'success',
        message: 'found requested',
        data: object
      })).catch(e => res.status(200).json({
        type: 'Error',
        message: e.message,
        data: e
      })),
      /**
       * finds all records for given model in the class constructor paginated
       * @returns {Promise<T | never>}
       */
      paginated: () => {

        const offset = parseInt(body.page) * parseInt(body.pageSize);
        const limit = offset + parseInt(body.pageSize);

        return this.model.findAll({
          limit,
          offset,
          include: relations
        }).then(object => res.status(200).json({
          type: 'success',
          message: 'found all!',
          data: object
        })).catch(e => res.status(200).json({
          type: 'Error',
          message: e.message,
          data: e
        }))
      },
      /**
       * finds all records for given model in the class constructor paginated and based on given condition
       * @returns {Promise<T | never>}
       */
      conditional: () => {

        const offset = parseInt(body.page) * parseInt(body.pageSize);
        const limit = offset + parseInt(body.pageSize);

        return this.model.findAll({
          limit: (body.page && body.pageSize) ? limit : null,
          offset: (body.page && body.pageSize) ? offset : null,
          where: body.where,
          include: relations
        }).then(object => res.status(200).json({
          type: 'success',
          message: 'found all!',
          data: object
        })).catch(e => res.status(200).json({
          type: 'Error',
          message: e.message,
          data: e
        }))
      }
    }
  }

  /**
   * Deletes records of given model in the constructor based on condition
   * @param condition
   * @param res
   */
  delete(condition, res) {
    this.model.destroy({where: condition}).then(() => res.status(200).json({
      type: 'success',
      message: 'deleted!',
      data: null
    })).catch(e => res.status(200).json({
      type: 'Error',
      message: e.message,
      data: e
    }));
  }

}
