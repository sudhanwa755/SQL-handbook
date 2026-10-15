export const CURRICULUM = [
  {
    id: "part1",
    chapterNumber: 1,
    title: "Database Normalization",
    subtitle: "From Unnormalized Data to 1NF, 2NF, 3NF & BCNF",
    fileName: "01-normalization.sql",
    part: "Part 1 · Database Theory",
    partId: "theory",
    readTime: "20 min",
    difficulty: "Beginner",
    badge: "1NF–3NF",
    badgeClass: "badge-cyan",
    year: "2025",
    iconType: "html",
    overview: "Normalization is the systematic process of organizing relational database schemas to eliminate redundancy, ensure functional dependency integrity, and eradicate update, insertion, and deletion anomalies.",
    anomalies: [
      {
        type: "Update Anomaly",
        icon: "✏️",
        desc: "Redundant copies of data cause inconsistency when a record is updated in one location but remains unchanged in others."
      },
      {
        type: "Insertion Anomaly",
        icon: "➕",
        desc: "Inability to record an independent entity without forcing dummy/fake data into unrelated foreign columns."
      },
      {
        type: "Deletion Anomaly",
        icon: "🗑️",
        desc: "Deleting a child fact inadvertently wipes out unrelated core parent entities permanently."
      }
    ],
    sections: [
      {
        id: "1nf",
        title: "1.1 First Normal Form (1NF) — Atomicity",
        content: "A relation is in 1NF if and only if every attribute contains only atomic (indivisible) values, and there are no repeating groups, lists, or arrays within a single column.",
        sql: `-- Violating 1NF (Multi-valued comma-separated courses):
-- Students(id, name, courses) -> (1, 'Alice', 'Math, CS, Physics')

-- Transformed to 1NF (Atomic rows):
CREATE TABLE student_courses (
  student_id INT NOT NULL,
  student_name VARCHAR(50) NOT NULL,
  course_code VARCHAR(20) NOT NULL,
  PRIMARY KEY (student_id, course_code)
);

INSERT INTO student_courses VALUES 
(1, 'Alice', 'CS101'),
(1, 'Alice', 'MATH201'),
(1, 'Alice', 'PHYS101');`,
        resultTable: {
          headers: ["student_id", "student_name", "course_code"],
          rows: [
            ["1", "Alice", "CS101"],
            ["1", "Alice", "MATH201"],
            ["1", "Alice", "PHYS101"]
          ]
        },
        gotcha: "Never store JSON or comma-separated lists when relational querying, indexing, or referential integrity is required."
      },
      {
        id: "2nf",
        title: "1.2 Second Normal Form (2NF) — Full Functional Dependency",
        content: "A relation is in 2NF if it is in 1NF and every non-prime attribute is fully functionally dependent on the ENTIRE candidate key (no partial dependencies on a subset of a composite key).",
        sql: `-- Decomposing partial dependency:
-- CourseName depends only on course_code, not the full composite key (student_id, course_code)

CREATE TABLE courses (
  course_code VARCHAR(20) PRIMARY KEY,
  course_title VARCHAR(100) NOT NULL,
  credits INT NOT NULL
);

CREATE TABLE enrollments (
  student_id INT NOT NULL,
  course_code VARCHAR(20) NOT NULL,
  grade CHAR(2),
  PRIMARY KEY (student_id, course_code),
  FOREIGN KEY (course_code) REFERENCES courses(course_code)
);`,
        resultTable: {
          headers: ["course_code", "course_title", "credits"],
          rows: [
            ["CS101", "Intro to Databases", "4"],
            ["MATH201", "Linear Algebra", "3"]
          ]
        },
        gotcha: "If a table has a single-column Primary Key and is in 1NF, it is automatically in 2NF!"
      },
      {
        id: "3nf",
        title: "1.3 Third Normal Form (3NF) — No Transitive Dependencies",
        content: "A relation is in 3NF if it is in 2NF and no non-prime attribute is transitively dependent on the primary key (X -> Y and Y -> Z where Z is non-prime is strictly forbidden).",
        sql: `-- Violates 3NF: emp_id -> dept_id -> dept_manager
-- Resolved by splitting into two independent relations:

CREATE TABLE departments (
  dept_id INT PRIMARY KEY,
  dept_name VARCHAR(50) NOT NULL,
  dept_manager VARCHAR(50) NOT NULL
);

CREATE TABLE employees (
  emp_id INT PRIMARY KEY,
  emp_name VARCHAR(50) NOT NULL,
  dept_id INT,
  FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);`,
        resultTable: {
          headers: ["dept_id", "dept_name", "dept_manager"],
          rows: [
            ["10", "Engineering", "Sarah Connor"],
            ["20", "Data Platform", "Alan Turing"]
          ]
        },
        gotcha: "Remember Bill Kent's famous mnemonic: 'Every non-key attribute must provide a fact about the key, the whole key, and nothing but the key, so help me Codd.'"
      }
    ]
  },
  {
    id: "part2",
    chapterNumber: 2,
    title: "Keys & Integrity Constraints",
    subtitle: "Candidate Keys, Primary Keys, Foreign Keys & Cascading",
    fileName: "02-keys-constraints.sql",
    part: "Part 1 · Database Theory",
    partId: "theory",
    readTime: "25 min",
    difficulty: "Beginner",
    badge: "PK / FK",
    badgeClass: "badge-amber",
    year: "2025",
    iconType: "ts",
    overview: "Keys enforce relational identity and semantic integrity. Understand the hierarchy from Super Keys to Candidate Keys, Primary Keys, Foreign Key cascades, and domain constraints.",
    sections: [
      {
        id: "key-types",
        title: "2.1 Key Hierarchy: Super, Candidate & Primary",
        content: "A Super Key uniquely identifies a row. A Candidate Key is a minimal Super Key (no redundant attributes). The Primary Key is the chosen Candidate Key.",
        sql: `CREATE TABLE users (
  user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username VARCHAR(30) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  ssn CHAR(11) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Candidate Keys: {user_id}, {username}, {email}, {ssn}
-- Selected Primary Key: user_id
-- Alternate Keys: username, email, ssn`,
        resultTable: {
          headers: ["user_id", "username", "email", "status"],
          rows: [
            ["101", "alex_dev", "alex@corp.io", "ACTIVE"],
            ["102", "maya_db", "maya@corp.io", "ACTIVE"]
          ]
        },
        gotcha: "Primary keys cannot contain NULL. UNIQUE constraints allow at most one NULL in PostgreSQL/SQL Server, or multiple NULLs in MySQL."
      },
      {
        id: "referential-integrity",
        title: "2.2 Foreign Keys & Referential Cascades",
        content: "Foreign keys enforce referential integrity between parent and child tables. Cascades specify what happens to children when the parent is deleted or updated.",
        sql: `CREATE TABLE orders (
  order_id INT PRIMARY KEY,
  customer_id INT,
  order_total DECIMAL(10,2) CHECK (order_total >= 0),
  CONSTRAINT fk_cust 
    FOREIGN KEY (customer_id) 
    REFERENCES customers(customer_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);`,
        resultTable: {
          headers: ["Action", "Syntax", "Behavior"],
          rows: [
            ["CASCADE", "ON DELETE CASCADE", "Deletes all matching child records automatically"],
            ["SET NULL", "ON DELETE SET NULL", "Sets child foreign key to NULL if allowed"],
            ["RESTRICT", "ON DELETE RESTRICT", "Aborts and blocks parent deletion entirely"]
          ]
        },
        gotcha: "ON DELETE CASCADE can be dangerous on large tables; an accidental parent row deletion can cascade into millions of deleted child records."
      }
    ]
  },
  {
    id: "part3",
    chapterNumber: 3,
    title: "DDL · DML · Transaction Control (TCL)",
    subtitle: "Schema Operations, Mutation & ACID Guarantees",
    fileName: "03-ddl-dml-tcl.sql",
    part: "Part 2 · Core SQL Operations",
    partId: "core",
    readTime: "30 min",
    difficulty: "Intermediate",
    badge: "ACID",
    badgeClass: "badge-purple",
    year: "2025",
    iconType: "sql",
    overview: "Master Data Definition Language (DDL), Data Manipulation Language (DML), and Transaction Control Language (TCL) with ACID properties and savepoints.",
    sections: [
      {
        id: "truncate-vs-delete",
        title: "3.1 TRUNCATE vs DELETE vs DROP",
        content: "The classic database interview question. Understand row-by-row logging, transaction rollbacks, table locking, and identity resets.",
        sql: `-- Row-by-row logged mutation:
DELETE FROM audit_logs WHERE created_at < NOW() - INTERVAL '30 days';

-- Fast metadata deallocation:
TRUNCATE TABLE staging_events;

-- Completely eradicates table structure:
DROP TABLE temp_imports;`,
        resultTable: {
          headers: ["Feature", "DELETE", "TRUNCATE", "DROP"],
          rows: [
            ["Type", "DML", "DDL", "DDL"],
            ["WHERE Clause", "Yes, supported", "No, removes all rows", "No"],
            ["Transaction Rollback", "Yes (fully logged)", "DBMS dependent", "Rarely rollbackable"],
            ["Space Reclaim", "Slow/Fragmented", "Instant deallocation", "Complete removal"]
          ]
        },
        gotcha: "TRUNCATE cannot run if foreign keys reference the table, even if the referencing table is empty."
      },
      {
        id: "acid-transactions",
        title: "3.2 ACID Properties & Savepoints",
        content: "Transactions guarantee Atomicity, Consistency, Isolation, and Durability across atomic blocks.",
        sql: `BEGIN TRANSACTION;

UPDATE accounts SET balance = balance - 500 WHERE account_id = 'ACC_A';

-- Create recovery checkpoint:
SAVEPOINT sp_deduct_complete;

UPDATE accounts SET balance = balance + 500 WHERE account_id = 'ACC_B';

-- If an error occurs on target account:
-- ROLLBACK TO sp_deduct_complete;

COMMIT;`,
        resultTable: {
          headers: ["Property", "Meaning", "Implementation"],
          rows: [
            ["Atomicity", "All operations succeed or all fail", "Undo logs & Rollback"],
            ["Consistency", "Constraints remain valid", "Schema validation & Triggers"],
            ["Isolation", "Concurrent transactions do not collide", "Locking & MVCC"],
            ["Durability", "Committed data survives crashes", "Write-Ahead Logging (WAL)"]
          ]
        },
        gotcha: "DML inside a transaction is not permanent until explicitly committed. Failing to close transactions causes locking contention."
      }
    ]
  },
  {
    id: "part4",
    chapterNumber: 4,
    title: "SELECT · WHERE · Filtering & Ordering",
    subtitle: "Projection, Wildcards, Logical Precedence & Pagination",
    fileName: "04-select-where.sql",
    part: "Part 2 · Core SQL Operations",
    partId: "core",
    readTime: "25 min",
    difficulty: "Beginner",
    badge: "DQL",
    badgeClass: "badge-blue",
    year: "2025",
    iconType: "js",
    overview: "Master Data Query Language (DQL): projection, comparison operators, pattern matching with LIKE, boolean evaluation rules, multi-column ORDER BY, and pagination.",
    sections: [
      {
        id: "where-operators",
        title: "4.1 Filtering Predicates & Pattern Matching",
        content: "Use comparison operators, BETWEEN, IN sets, and wildcard LIKE searches (_ for single char, % for zero or more).",
        sql: `SELECT 
  product_id, 
  product_name, 
  category, 
  unit_price 
FROM products
WHERE category IN ('Electronics', 'Hardware')
  AND unit_price BETWEEN 100 AND 999.99
  AND product_name LIKE 'Pro_%'
ORDER BY unit_price DESC
LIMIT 5;`,
        resultTable: {
          headers: ["product_id", "product_name", "category", "unit_price"],
          rows: [
            ["801", "Pro_Monitor_4K", "Electronics", "$649.00"],
            ["804", "Pro_Audio_DAC", "Hardware", "$320.00"],
            ["809", "Pro_Keyboard_Mech", "Hardware", "$149.50"]
          ]
        },
        gotcha: "LIKE '%pattern' with a leading wildcard cannot use B-Tree indexes, triggering costly full table scans."
      },
      {
        id: "logical-precedence",
        title: "4.2 Logical Operator Precedence (AND beats OR)",
        content: "SQL evaluates NOT first, then AND, then OR. Without parentheses, unexpected results will occur.",
        sql: `-- CAUTION: Evaluated as: WHERE active = 1 OR (role = 'Admin' AND dept = 'IT')
SELECT user_id, role, dept FROM users
WHERE active = 1 OR role = 'Admin' AND dept = 'IT';

-- CORRECT (Explicit grouping):
SELECT user_id, role, dept FROM users
WHERE (active = 1 OR role = 'Admin') AND dept = 'IT';`,
        resultTable: {
          headers: ["Expression", "Evaluation Order"],
          rows: [
            ["NOT", "Highest priority (evaluated 1st)"],
            ["AND", "Middle priority (evaluated 2nd)"],
            ["OR", "Lowest priority (evaluated 3rd)"]
          ]
        },
        gotcha: "Always use explicit parentheses when combining AND with OR."
      }
    ]
  },
  {
    id: "part5",
    chapterNumber: 5,
    title: "Functions, NULLs & CASE Logic",
    subtitle: "Three-Valued Logic, COALESCE & Conditional Expressions",
    fileName: "05-functions-null.sql",
    part: "Part 3 · Analytical SQL",
    partId: "analytics",
    readTime: "30 min",
    difficulty: "Intermediate",
    badge: "3VL / NULL",
    badgeClass: "badge-green",
    year: "2025",
    iconType: "react",
    overview: "Relational databases use Three-Valued Logic (3VL): TRUE, FALSE, and UNKNOWN. Learn why 'col = NULL' always fails, how to use COALESCE, and write powerful CASE statements.",
    sections: [
      {
        id: "three-valued-logic",
        title: "5.1 Three-Valued Logic (3VL) & IS NULL",
        content: "NULL represents missing or unknown information. Any arithmetic or comparison with NULL produces NULL (UNKNOWN), never TRUE or FALSE.",
        sql: `-- NEVER DO THIS: Always evaluates to UNKNOWN (returns 0 rows):
-- SELECT * FROM users WHERE middle_name = NULL;

-- THE CORRECT APPROACH:
SELECT 
  first_name, 
  last_name, 
  COALESCE(middle_name, 'N/A') AS middle_name_display,
  COALESCE(phone, email, 'No Contact') AS primary_contact
FROM users
WHERE middle_name IS NULL;`,
        resultTable: {
          headers: ["first_name", "last_name", "middle_name_display", "primary_contact"],
          rows: [
            ["Elena", "Rostova", "N/A", "elena@space.org"],
            ["Devon", "Miles", "N/A", "555-0192"]
          ]
        },
        gotcha: "In SQL, NULL != NULL evaluates to UNKNOWN! Only IS NULL or IS NOT NULL can test for nullness."
      },
      {
        id: "case-expressions",
        title: "5.2 CASE ... WHEN Conditional Logic",
        content: "CASE is SQL's universal inline branching statement. Use it inside SELECT, WHERE, or ORDER BY.",
        sql: `SELECT 
  employee_id,
  full_name,
  salary,
  CASE 
    WHEN salary >= 120000 THEN 'Executive Tier'
    WHEN salary >= 80000  THEN 'Senior Tier'
    WHEN salary >= 50000  THEN 'Mid-Level Tier'
    ELSE 'Associate Tier'
  END AS compensation_band
FROM employee_salaries
ORDER BY salary DESC;`,
        resultTable: {
          headers: ["employee_id", "full_name", "salary", "compensation_band"],
          rows: [
            ["1001", "Marcus Vance", "$145,000", "Executive Tier"],
            ["1004", "Priya Nair", "$96,000", "Senior Tier"],
            ["1009", "Leo Chen", "$72,000", "Mid-Level Tier"]
          ]
        },
        gotcha: "If no ELSE clause is provided and no WHEN branch matches, CASE returns NULL."
      }
    ]
  },
  {
    id: "part6",
    chapterNumber: 6,
    title: "GROUP BY & HAVING Aggregations",
    subtitle: "Aggregate Functions, Grouping Rules & Post-Filters",
    fileName: "06-groupby-having.sql",
    part: "Part 3 · Analytical SQL",
    partId: "analytics",
    readTime: "25 min",
    difficulty: "Intermediate",
    badge: "Aggregates",
    badgeClass: "badge-amber",
    year: "2025",
    iconType: "sql",
    overview: "Understand aggregate functions (COUNT, SUM, AVG, MIN, MAX), the strict rule of GROUP BY, and the fundamental difference between WHERE and HAVING.",
    sections: [
      {
        id: "group-by-rules",
        title: "6.1 The Non-Aggregated Column Rule",
        content: "Every column in your SELECT list must either be enclosed in an aggregate function or listed in the GROUP BY clause.",
        sql: `SELECT 
  department_name,
  COUNT(*) AS total_employees,
  AVG(salary) AS avg_dept_salary,
  MAX(salary) AS top_salary
FROM employees
GROUP BY department_name;`,
        resultTable: {
          headers: ["department_name", "total_employees", "avg_dept_salary", "top_salary"],
          rows: [
            ["Engineering", "42", "$108,500", "$165,000"],
            ["Data Platform", "18", "$112,000", "$158,000"],
            ["Product Design", "12", "$94,200", "$125,000"]
          ]
        },
        gotcha: "COUNT(*) counts every row including NULLs. COUNT(column_name) ignores NULL rows!"
      },
      {
        id: "where-vs-having",
        title: "6.2 WHERE vs HAVING Execution Order",
        content: "WHERE filters raw individual rows BEFORE grouping. HAVING filters consolidated group rows AFTER aggregation.",
        sql: `SELECT 
  department_id, 
  COUNT(*) AS dev_count, 
  AVG(salary) AS avg_salary
FROM employees
WHERE is_active = TRUE               -- Row-level filter (BEFORE GROUP BY)
GROUP BY department_id
HAVING COUNT(*) >= 5                 -- Group-level filter (AFTER GROUP BY)
   AND AVG(salary) > 85000;`,
        resultTable: {
          headers: ["department_id", "dev_count", "avg_salary"],
          rows: [
            ["Dept 101", "14", "$112,400"],
            ["Dept 104", "8", "$94,600"]
          ]
        },
        gotcha: "Never use HAVING to filter rows that can be eliminated in WHERE. Filtering early in WHERE drastically reduces grouping memory."
      }
    ]
  },
  {
    id: "part7",
    chapterNumber: 7,
    title: "All SQL Joins & Multi-Table Queries",
    subtitle: "INNER, LEFT, RIGHT, FULL, CROSS, SELF Joins & Venn Diagrams",
    fileName: "07-relational-joins.sql",
    part: "Part 4 · Relational Analysis",
    partId: "relational",
    readTime: "45 min",
    difficulty: "Advanced",
    badge: "Venn / Joins",
    badgeClass: "badge-coral",
    year: "2025",
    iconType: "react",
    overview: "Relational databases shine when combining tables. Master Cartesian products, INNER, LEFT, RIGHT, FULL OUTER joins, SELF joins, and Venn set intersections.",
    vennTypes: [
      { type: "inner", title: "INNER JOIN", desc: "Only rows with matching keys in BOTH Table A and Table B." },
      { type: "left", title: "LEFT OUTER JOIN", desc: "ALL rows from Table A, plus matching rows from Table B (NULL if no match)." },
      { type: "right", title: "RIGHT OUTER JOIN", desc: "ALL rows from Table B, plus matching rows from Table A (NULL if no match)." },
      { type: "full", title: "FULL OUTER JOIN", desc: "ALL rows from both tables. Missing sides are filled with NULLs." }
    ],
    sections: [
      {
        id: "inner-join",
        title: "7.1 INNER JOIN Mechanics",
        content: "Returns only records where the join predicate evaluates to TRUE in both relations.",
        sql: `SELECT 
  e.emp_id, 
  e.emp_name, 
  d.dept_name, 
  d.location
FROM employees e
INNER JOIN departments d 
  ON e.dept_id = d.dept_id;`,
        resultTable: {
          headers: ["emp_id", "emp_name", "dept_name", "location"],
          rows: [
            ["101", "Marcus Vance", "Engineering", "San Francisco"],
            ["102", "Elena Rostova", "Data Platform", "New York"],
            ["103", "Aiden Pearce", "Cybersecurity", "Chicago"]
          ]
        },
        gotcha: "If joining keys have duplicate values on both sides, the join will produce an M x N Cartesian multiplication!"
      },
      {
        id: "outer-joins",
        title: "7.2 LEFT, RIGHT & FULL OUTER Joins",
        content: "Outer joins preserve rows from one or both tables even when no match exists in the other.",
        sql: `-- Find customers who have NEVER placed an order:
SELECT 
  c.customer_id, 
  c.company_name, 
  o.order_id, 
  o.order_total
FROM customers c
LEFT JOIN orders o 
  ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;`,
        resultTable: {
          headers: ["customer_id", "company_name", "order_id", "order_total"],
          rows: [
            ["CUST_501", "Acme Labs", "NULL", "NULL"],
            ["CUST_508", "Vortex AI", "NULL", "NULL"]
          ]
        },
        gotcha: "Putting a condition on the right table in the WHERE clause turns a LEFT JOIN into an INNER JOIN! Put it in the ON clause instead."
      },
      {
        id: "self-join",
        title: "7.3 SELF JOIN — Hierarchies & Trees",
        content: "Joining a table to itself using two distinct aliases to navigate hierarchical structures like manager-employee relationships.",
        sql: `SELECT 
  emp.emp_name AS employee, 
  COALESCE(mgr.emp_name, 'Top Executive / CEO') AS manager
FROM employees emp
LEFT JOIN employees mgr 
  ON emp.manager_id = mgr.emp_id;`,
        resultTable: {
          headers: ["employee", "manager"],
          rows: [
            ["Marcus Vance", "Top Executive / CEO"],
            ["Elena Rostova", "Marcus Vance"],
            ["Devon Miles", "Marcus Vance"],
            ["Maya Lin", "Elena Rostova"]
          ]
        },
        gotcha: "Always use table aliases (e.g. emp and mgr) when self-joining to prevent column name collisions."
      }
    ]
  },
  {
    id: "part8",
    chapterNumber: 8,
    title: "Subqueries & Advanced Set Operations",
    subtitle: "Scalar, Multi-Row, Correlated Subqueries, EXISTS & UNION",
    fileName: "08-subqueries-sets.sql",
    part: "Part 4 · Relational Analysis",
    partId: "relational",
    readTime: "40 min",
    difficulty: "Advanced",
    badge: "EXISTS / Sets",
    badgeClass: "badge-purple",
    year: "2025",
    iconType: "sql",
    overview: "Master nested queries: scalar subqueries, correlated row-by-row lookups, the efficiency of EXISTS vs IN, and mathematical set operations (UNION, INTERSECT, EXCEPT).",
    sections: [
      {
        id: "correlated-subqueries",
        title: "8.1 Correlated Subqueries vs EXISTS",
        content: "A correlated subquery references values from the outer query, executing once per candidate row. EXISTS stops immediately upon finding the first match.",
        sql: `-- Find employees earning above their department's average:
SELECT 
  e.emp_id, 
  e.emp_name, 
  e.salary, 
  e.dept_id
FROM employees e
WHERE e.salary > (
  SELECT AVG(sub.salary) 
  FROM employees sub 
  WHERE sub.dept_id = e.dept_id
);`,
        resultTable: {
          headers: ["emp_id", "emp_name", "salary", "dept_id"],
          rows: [
            ["101", "Marcus Vance", "$145,000", "10"],
            ["107", "Sarah Connor", "$132,000", "20"]
          ]
        },
        gotcha: "NOT IN (subquery) returns zero rows if ANY row in the subquery returns NULL! Use NOT EXISTS instead for NULL safety."
      },
      {
        id: "set-operations",
        title: "8.2 UNION, UNION ALL, INTERSECT & EXCEPT",
        content: "Mathematical set combinations across compatible queries. UNION removes duplicates with an expensive sort; UNION ALL preserves all rows efficiently.",
        sql: `-- High-performance union of active and archived records:
SELECT user_id, email, 'ACTIVE' AS status FROM users_live
UNION ALL
SELECT user_id, email, 'ARCHIVED' AS status FROM users_archive;`,
        resultTable: {
          headers: ["Operation", "Mathematical Set", "Duplicate Handling"],
          rows: [
            ["UNION", "A ∪ B", "Eliminates duplicates (expensive sort)"],
            ["UNION ALL", "A + B", "Keeps all rows (instant performance)"],
            ["INTERSECT", "A ∩ B", "Returns only records present in BOTH"],
            ["EXCEPT / MINUS", "A - B", "Returns records in A that are NOT in B"]
          ]
        },
        gotcha: "Always default to UNION ALL unless you specifically require duplicate removal."
      }
    ]
  }
];
