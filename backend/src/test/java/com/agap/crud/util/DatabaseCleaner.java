package com.agap.crud.util;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class DatabaseCleaner {

    private final DataSource dataSource;
    private Connection connection;

    public void clearTables() {
        try (Connection connection = dataSource.getConnection()) {
            this.connection = connection;

            checkTestDatabase();
            tryToClearTables();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            this.connection = null;
        }
    }

    private void checkTestDatabase() throws SQLException {
        String catalog = connection.getCatalog();

        if (catalog == null || !catalog.endsWith("test")) {
            throw new RuntimeException(
                    "Cannot clear database tables because '" + catalog + "' is not a test database (suffix 'test' not found).");
        }
    }

    private void tryToClearTables() throws SQLException {
        List<String> tableNames = getTableNames();
        clear(tableNames);
    }

    private List<String> getTableNames() throws SQLException {
        List<String> tableNames = new ArrayList<>();

        DatabaseMetaData metaData = connection.getMetaData();
        ResultSet rs = metaData.getTables(connection.getCatalog(), null, null, new String[] { "TABLE" });

        while (rs.next()) {
            tableNames.add(rs.getString("TABLE_NAME"));
        }

        tableNames.remove("flyway_schema_history");

        return tableNames;
    }

    private void clear(List<String> tableNames) throws SQLException {
        Statement statement = buildSqlStatement(tableNames);

        log.debug("Executing SQL");
        statement.executeBatch();
    }

    private Statement buildSqlStatement(List<String> tableNames) throws SQLException {
        Statement statement = connection.createStatement();

        statement.addBatch(sql("SET FOREIGN_KEY_CHECKS = 0"));
        addTruncateStatements(tableNames, statement);
        statement.addBatch(sql("SET FOREIGN_KEY_CHECKS = 1"));
        addResetPrimaryKeyStatments(tableNames, statement);
        return statement;
    }

    private void addTruncateStatements(List<String> tableNames, Statement statement) {
        tableNames.forEach(tableName -> {
            try {
                statement.addBatch(sql("TRUNCATE TABLE " + tableName));
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        });
    }

    private void addResetPrimaryKeyStatments(List<String> tableNames, Statement statement) {
        tableNames.forEach(tableName -> {
            try {
                statement.addBatch(sql(String.format("ALTER TABLE %s AUTO_INCREMENT = 1", tableName)));
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        });
    }

    private String sql(String sql) {
        log.debug("Adding SQL: {}", sql);
        return sql;
    }

}