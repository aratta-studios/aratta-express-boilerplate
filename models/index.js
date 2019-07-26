import Sequelize from 'sequelize';
import env from '../env';
import UserModel from '../models/users';
import ExampleModel from '../models/examples';

const Op = Sequelize.Op;

/**
 * String aliases for using in dynamic where query
 * @type {{$strictLeft: *, $values: *, $notIn: *, $regexp: *, $notRegexp: *, $noExtendLeft: *, $or: (typedArray: (Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array), index: number, value: number) => number, $in: *, $noExtendRight: *, $col: *, $is: ((value1: any, value2: any) => boolean) | string, $contains: ((string: string) => boolean) | ((other: (Node | null)) => boolean), $eq: *, $gt: *, $like: *, $any: *, $contained: *, $ne: *, $adjacent: *, $notBetween: *, $and: (typedArray: (Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array), index: number, value: number) => number, $notIRegexp: *, $between: *, $gte: *, $iLike: *, $lte: *, $iRegexp: *, $lt: *, $strictRight: *, $all: (all|HTMLAllCollection|(<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [(PromiseLike<T1> | T1), (PromiseLike<T2> | T2), (PromiseLike<T3> | T3), (PromiseLike<T4> | T4), (PromiseLike<T5> | T5), (PromiseLike<T6> | T6), (PromiseLike<T7> | T7), (PromiseLike<T8> | T8), (PromiseLike<T9> | T9), (PromiseLike<T10> | T10)]) => Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>)|(<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [(PromiseLike<T1> | T1), (PromiseLike<T2> | T2), (PromiseLike<T3> | T3), (PromiseLike<T4> | T4), (PromiseLike<T5> | T5), (PromiseLike<T6> | T6), (PromiseLike<T7> | T7), (PromiseLike<T8> | T8), (PromiseLike<T9> | T9)]) => Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>)|(<T1, T2, T3, T4, T5, T6, T7, T8>(values: [(PromiseLike<T1> | T1), (PromiseLike<T2> | T2), (PromiseLike<T3> | T3), (PromiseLike<T4> | T4), (PromiseLike<T5> | T5), (PromiseLike<T6> | T6), (PromiseLike<T7> | T7), (PromiseLike<T8> | T8)]) => Promise<[T1, T2, T3, T4, T5, T6, T7, T8]>)|(<T1, T2, T3, T4, T5, T6, T7>(values: [(PromiseLike<T1> | T1), (PromiseLike<T2> | T2), (PromiseLike<T3> | T3), (PromiseLike<T4> | T4), (PromiseLike<T5> | T5), (PromiseLike<T6> | T6), (PromiseLike<T7> | T7)]) => Promise<[T1, T2, T3, T4, T5, T6, T7]>)|(<T1, T2, T3, T4, T5, T6>(values: [(PromiseLike<T1> | T1), (PromiseLike<T2> | T2), (PromiseLike<T3> | T3), (PromiseLike<T4> | T4), (PromiseLike<T5> | T5), (PromiseLike<T6> | T6)]) => Promise<[T1, T2, T3, T4, T5, T6]>)|(<T1, T2, T3, T4, T5>(values: [(PromiseLike<T1> | T1), (PromiseLike<T2> | T2), (PromiseLike<T3> | T3), (PromiseLike<T4> | T4), (PromiseLike<T5> | T5)]) => Promise<[T1, T2, T3, T4, T5]>)|(<T1, T2, T3, T4>(values: [(PromiseLike<T1> | T1), (PromiseLike<T2> | T2), (PromiseLike<T3> | T3), (PromiseLike<T4> | T4)]) => Promise<[T1, T2, T3, T4]>)|(<T1, T2, T3>(values: [(PromiseLike<T1> | T1), (PromiseLike<T2> | T2), (PromiseLike<T3> | T3)]) => Promise<[T1, T2, T3]>)|(<T1, T2>(values: [(PromiseLike<T1> | T1), (PromiseLike<T2> | T2)]) => Promise<[T1, T2]>)|(<T>(values: (PromiseLike<T> | T)[]) => Promise<T[]>)|(<TAll>(values: Iterable<PromiseLike<TAll> | TAll>) => Promise<TAll[]>)), $notLike: *, $not: *, $overlap: *, $notILike: *}}
 */
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};

/**
 * connectin sequelize to db
 */
const sequelize = new Sequelize(env.database, env.username, env.password, {
  operatorsAliases,
  host: env.host,
  dialect: env.dialect,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

/**
 * Link our models with sequelize
 */
const User = UserModel(sequelize, Sequelize);
const Example = ExampleModel(sequelize, Sequelize);

/**
 * Specify our associations
 * E.g:
 HospitalDoctor.hasOne(Hospital,{foreignKey: 'id',sourceKey:'hospital_id'});
 HospitalDoctor.hasOne(Doctor,{foreignKey: 'id',sourceKey:'doctor_id'});
 Doctor.hasMany(HospitalDoctor,{foreignKey: 'doctor_id'});
 Hospital.hasMany(HospitalDoctor,{foreignKey: 'hospital_id'});
 *
 */

module.exports = {
  User,
  Example
};
