import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
    'PortfolioApplication',
    'postgres',
    '123456',
    {
        host: 'localhost',
        dialect: 'postgres'
    }
);