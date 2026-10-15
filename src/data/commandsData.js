export const COMMAND_CATEGORIES = [
  {
    category: "DDL",
    name: "Data Definition Language",
    subtitle: "Structure & Schemas",
    icon: "Box",
    color: "#fbbf24",
    badgeClass: "badge-gold",
    description: "Defines, modifies, and alters the physical structure and metadata of relational database objects.",
    commands: [
      { name: "CREATE", syntax: "CREATE TABLE table_name (col1 type constraint, ...);", desc: "Creates a new table, database, view, or index." },
      { name: "ALTER", syntax: "ALTER TABLE table_name ADD COLUMN col_name type;", desc: "Modifies an existing database object or adds/drops constraints." },
      { name: "DROP", syntax: "DROP TABLE table_name;", desc: "Permanently removes a table, index, or schema from the database." },
      { name: "TRUNCATE", syntax: "TRUNCATE TABLE table_name;", desc: "Fast-wipes all rows from a table while preserving structure. Cannot be rolled back in many DBMS." }
    ]
  },
  {
    category: "DML",
    name: "Data Manipulation Language",
    subtitle: "Row CRUD Operations",
    icon: "Edit3",
    color: "#38bdf8",
    badgeClass: "badge-blue",
    description: "Manipulates and mutates the actual data records stored within existing database tables.",
    commands: [
      { name: "INSERT", syntax: "INSERT INTO table_name (col1, col2) VALUES (v1, v2);", desc: "Inserts one or multiple new rows into a relation." },
      { name: "UPDATE", syntax: "UPDATE table_name SET col1 = v1 WHERE condition;", desc: "Modifies column values in rows matching the WHERE filter." },
      { name: "DELETE", syntax: "DELETE FROM table_name WHERE condition;", desc: "Removes specific rows satisfying filter conditions." },
      { name: "MERGE", syntax: "MERGE INTO target USING source ON (condition) ...", desc: "Upsert operation: conditionally inserts or updates records." }
    ]
  },
  {
    category: "DQL",
    name: "Data Query Language",
    subtitle: "Relational Retrieval",
    icon: "Search",
    color: "#22c55e",
    badgeClass: "badge-green",
    description: "Queries, filters, joins, groups, and retrieves record sets from one or multiple relations.",
    commands: [
      { name: "SELECT", syntax: "SELECT col1, col2 FROM table_name WHERE ...;", desc: "Projects columns and retrieves rows from relations." },
      { name: "DISTINCT", syntax: "SELECT DISTINCT col1 FROM table_name;", desc: "Eliminates duplicate rows from the projected result set." },
      { name: "GROUP BY", syntax: "SELECT dept, COUNT(*) FROM emp GROUP BY dept;", desc: "Groups rows sharing values into summary aggregate rows." },
      { name: "HAVING", syntax: "SELECT dept, AVG(salary) FROM emp GROUP BY dept HAVING AVG(salary) > 50000;", desc: "Filters grouped rows after aggregation." }
    ]
  },
  {
    category: "TCL",
    name: "Transaction Control Language",
    subtitle: "ACID & Atomicity",
    icon: "Shield",
    color: "#a855f7",
    badgeClass: "badge-purple",
    description: "Manages atomic database transactions, ensures ACID compliance, and guarantees durability.",
    commands: [
      { name: "BEGIN TRANSACTION", syntax: "BEGIN TRANSACTION; -- starts atomic block", desc: "Explicitly starts a new transaction." },
      { name: "COMMIT", syntax: "COMMIT; -- persists changes permanently", desc: "Permanently writes and saves all transaction changes to disk." },
      { name: "ROLLBACK", syntax: "ROLLBACK; -- discards uncommitted changes", desc: "Undoes all mutations since the last COMMIT or SAVEPOINT." },
      { name: "SAVEPOINT", syntax: "SAVEPOINT sp_checkpoint1; ... ROLLBACK TO sp_checkpoint1;", desc: "Creates a designated restore checkpoint inside an active transaction." }
    ]
  },
  {
    category: "DCL",
    name: "Data Control Language",
    subtitle: "Security & Privileges",
    icon: "Lock",
    color: "#f43f5e",
    badgeClass: "badge-red",
    description: "Administers user roles, access control levels, and security privileges across database entities.",
    commands: [
      { name: "GRANT", syntax: "GRANT SELECT, INSERT ON employees TO app_user;", desc: "Grants specific permissions to a database user or role." },
      { name: "REVOKE", syntax: "REVOKE DELETE ON employees FROM contractor_role;", desc: "Revokes previously assigned permissions or security privileges." }
    ]
  }
];
