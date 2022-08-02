const { sqlDbConnection } = require('../utils/sqlConnector');

module.exports = class DataBase {
    manageConnections(query) {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await sqlDbConnection();

                // create a query
                connection.query(query, (error, results, fields) => {
                    connection.release();
                    if (error) {
                        // global.logger(error);
                        console.log(error);
                        reject(error);
                        return;
                    }
                    // connected!
                    const rows = results;
                    const rowCount = results.length
                        ? results.length
                        : results.affectedRows;

                    resolve({ rows, rowCount });
                });
            } catch (error) {
                console.error(error);
            }
        });
    }

    async execute(query) {
        const result = await this.manageConnections(query);
        return result;
    }

    // Async Select function
    async select(tableName, columns, condition) {
        let conditions = '';

        // If there is a condition object build query using keys and values
        if (condition) {
            const conditionKeys = Object.keys(condition);
            const conditionValues = Object.values(condition).map((value) =>
                typeof value === 'string' ? `'${value}'` : value
            );
            conditionKeys.forEach((key, index) => {
                let field = key;

                conditions += `${field} = ${conditionValues[index]}${
                    index === conditionKeys.length - 1 ? '' : ' AND '
                }`;
            });
        }

        let fields = [];
        if (columns?.length) {
            fields = [...columns];
        }
        let query = `SELECT ${
            fields?.length ? fields.join() : '*'
        } FROM ${tableName}`;
        if (conditions) query += ` WHERE ${conditions}`;

        // Fire manageConnections function with query
        const result = await this.manageConnections(query);
        return result;
    }

    async insert(tableName, data) {
        // Get columns from keys and values from object values
        const columns = Object.keys(data);
        const values = Object.values(data).map((value) =>
            typeof value === 'string' ? `'${value}'` : value
        );

        // Build final query
        const query = `INSERT INTO ${tableName} (${columns.join()}) VALUES (${values.join()})`;

        // Fire manageConnections function with query
        const result = await this.manageConnections(query);
        return result;
    }

    async update(tableName, data, condition) {
        // Get columns from keys and values from object values
        const columns = Object.keys(data);
        const values = Object.values(data).map((value) =>
            typeof value === 'string' ? `'${value}'` : value
        );
        let updates = '';
        columns.forEach((column, index) => {
            updates += `${column} = ${values[index]}${
                index === columns.length - 1 ? '' : ', '
            }`;
        });
        let conditions = '';

        // If there is a condition object build query using keys and values
        if (condition) {
            const conditionKeys = Object.keys(condition);
            const conditionValues = Object.values(condition).map((value) =>
                typeof value === 'string' ? `'${value}'` : value
            );
            conditionKeys.forEach((key, index) => {
                conditions += `${key} = ${conditionValues[index]}${
                    index === conditionKeys.length - 1 ? '' : ' AND '
                }`;
            });
        }

        // Build final query
        let query = `UPDATE ${tableName} SET ${updates}`;
        if (conditions) query += ` WHERE ${conditions}`;

        // Fire manageConnections function with query
        const result = await this.manageConnections(query);
        return result;
    }
};
