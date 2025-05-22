'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  // customors는 테이블 이름과 일치해야한다.
  customors.init({
    id: {type: DataTypes.INTEGER, primaryKey: true}, // 더 자세하게 키를 설정
    name: DataTypes.STRING, //  allowNull: true같은 것으로도 설정 가능
    address: DataTypes.STRING, // defaultValue 설정 가능
    email: DataTypes.STRING,
    phone: DataTypes.STRING // unique, autoincreamnet도 가능
  }, {
    sequelize,
    timestamps: false, // createAt, updateAt 컬럼 없음
    modelName: 'customers', // 무조건 복수의 테이블을 찾음. 없으면 복수의 이름이 생성됨
    tableName: 'customers'
  });
  return customors;
};