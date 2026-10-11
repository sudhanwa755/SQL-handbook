// ==========================================================================
// HSQLDB / SQL HANDBOOK — COMPREHENSIVE CHAPTER QUIZ BANKS (ALL 8 CHAPTERS)
// Exactly 20 Questions per chapter (160 Questions total):
// - 7 Easy (Fundamental concepts & definitions)
// - 7 Medium (Mechanics, edge cases, anomalies)
// - 6 Query-based (SQL DDL/DML, schema design, queries)
// Includes complete rationale for why answers are correct and why alternatives are wrong.
// ==========================================================================

const QUIZ_DATA = {
  "part1": {
    "title": "Chapter 1 Mastery Quiz: Normalization (1NF – 3NF)",
    "subtitle": "Test your understanding of relational database normalization, anomalies, and schema design.",
    "questions": [
      {
        "id": 1,
        "difficulty": "easy",
        "type": "theory",
        "question": "What is the primary rule required for a relation to be in First Normal Form (1NF)?",
        "options": [
          "Every column must have a foreign key reference.",
          "Every column must hold atomic (indivisible) values with no repeating groups or arrays.",
          "Every non-key attribute must depend entirely on the primary key.",
          "All transitive functional dependencies must be eliminated."
        ],
        "correct": 1,
        "explanation": "1NF requires that each column contains only atomic (indivisible) values, and that there are no repeating groups or arrays."
      },
      {
        "id": 2,
        "difficulty": "easy",
        "type": "theory",
        "question": "Which normal form is specifically focused on eliminating Partial Functional Dependencies?",
        "options": [
          "First Normal Form (1NF)",
          "Second Normal Form (2NF)",
          "Third Normal Form (3NF)",
          "Boyce-Codd Normal Form (BCNF)"
        ],
        "correct": 1,
        "explanation": "2NF requires the relation to already be in 1NF and have NO partial dependencies (meaning every non-prime attribute must depend on the whole candidate key)."
      },
      {
        "id": 3,
        "difficulty": "easy",
        "type": "theory",
        "question": "In database theory, what is an 'Insertion Anomaly'?",
        "options": [
          "When inserting a row causes a duplicate primary key error.",
          "The inability to record certain facts without unintentionally inserting unrelated data or fictitious placeholder data.",
          "When an INSERT query takes longer than 1 second to execute due to unindexed columns.",
          "A failure caused by database server disk exhaustion during data load."
        ],
        "correct": 1,
        "explanation": "An insertion anomaly occurs when you cannot insert record A without having record B (for instance, being unable to insert a new Department because no employees have been hired into it yet)."
      },
      {
        "id": 4,
        "difficulty": "easy",
        "type": "theory",
        "question": "Which functional dependency describes a scenario where attribute A determines attribute B (A → B), and B determines non-key attribute C (B → C), so A indirectly determines C?",
        "options": [
          "Partial Dependency",
          "Trivial Dependency",
          "Transitive Dependency",
          "Multivalued Dependency"
        ],
        "correct": 2,
        "explanation": "A Transitive Dependency occurs when X → Y and Y → Z (where Y is not a candidate key and Z is not a prime attribute), resulting in X → Z via an intermediary attribute. 3NF removes transitive dependencies."
      },
      {
        "id": 5,
        "difficulty": "easy",
        "type": "theory",
        "question": "If a table is in 1NF and its Primary Key consists of only a SINGLE attribute (not composite), what can be concluded about its 2NF status?",
        "options": [
          "It violates 2NF because single keys cannot enforce dependencies.",
          "It is automatically in 2NF because partial dependencies are physically impossible with a single-column primary key.",
          "It must still be decomposed to achieve 2NF.",
          "It automatically achieves 3NF as well."
        ],
        "correct": 1,
        "explanation": "Partial dependency requires a proper subset of a composite candidate key. If the primary key is a single column, no proper subset exists; hence the table is automatically in 2NF."
      },
      {
        "id": 6,
        "difficulty": "easy",
        "type": "theory",
        "question": "What is a 'Deletion Anomaly'?",
        "options": [
          "Deleting a parent record causes an unexpected crash.",
          "Deleting data unintentionally results in the loss of other completely unrelated and valuable information.",
          "A DELETE statement failing because a transaction rollback was initiated.",
          "Deleting rows without specifying a WHERE clause."
        ],
        "correct": 1,
        "explanation": "A deletion anomaly occurs when deleting one entity unintentionally erases other critical information (e.g., deleting the last student in a course also erases the course syllabus)."
      },
      {
        "id": 7,
        "difficulty": "easy",
        "type": "theory",
        "question": "Which normal form requires a table to be in 2NF and have NO non-prime attribute transitively dependent on any candidate key?",
        "options": [
          "1NF",
          "2NF",
          "3NF",
          "4NF"
        ],
        "correct": 2,
        "explanation": "Third Normal Form (3NF) requires 2NF compliance plus the absence of transitive dependencies for non-prime attributes."
      },
      {
        "id": 8,
        "difficulty": "medium",
        "type": "theory",
        "question": "Consider table OrderDetails(order_id, product_id, product_name, unit_price, quantity). The PK is (order_id, product_id). Why does this table violate 2NF?",
        "options": [
          "quantity depends only on order_id.",
          "product_name and unit_price depend only on product_id, which is a partial subset of the composite primary key.",
          "order_id determines product_id transitively.",
          "It contains duplicate rows."
        ],
        "correct": 1,
        "explanation": "product_name and unit_price depend strictly on product_id alone rather than the combination (order_id, product_id), exhibiting a partial dependency that violates 2NF."
      },
      {
        "id": 9,
        "difficulty": "medium",
        "type": "theory",
        "question": "Given table Employees(emp_id, emp_name, dept_id, dept_name, dept_building). Primary Key is emp_id. Why does this table violate 3NF?",
        "options": [
          "emp_name partially depends on emp_id.",
          "dept_name and dept_building depend on dept_id, which is a non-key attribute, creating a transitive dependency: emp_id → dept_id → (dept_name, dept_building).",
          "emp_id is not atomic.",
          "The table violates 1NF because multiple employees work in the same building."
        ],
        "correct": 1,
        "explanation": "Because emp_id → dept_id and dept_id → dept_name, dept_name depends transitively on the primary key emp_id through non-key attribute dept_id."
      },
      {
        "id": 10,
        "difficulty": "medium",
        "type": "theory",
        "question": "When decomposing an unnormalized relation into multiple normalized relations, which mathematical property is mandatory to ensure queries on the decomposed tables return original data without spurious rows?",
        "options": [
          "Lossless-Join Decomposition",
          "ACID Transaction Durability",
          "Strict Two-Phase Locking",
          "Asymmetric Cardinality"
        ],
        "correct": 0,
        "explanation": "Lossless-join decomposition guarantees that joining the decomposed tables via their shared keys reconstructs the exact original relation without producing false or spurious phantom records."
      },
      {
        "id": 11,
        "difficulty": "medium",
        "type": "theory",
        "question": "Why is storing comma-separated values in a column (e.g., student_skills = 'Java, SQL, Docker') considered a serious relational design flaw?",
        "options": [
          "Relational databases cannot store commas inside VARCHAR columns.",
          "It violates 1NF, prevents index lookups on individual skills, complicates aggregations, and forces slow LIKE '%pattern%' scans.",
          "It forces the primary key to become composite.",
          "It triggers a database constraint error during table creation."
        ],
        "correct": 1,
        "explanation": "Storing multi-valued strings violates 1NF atomicity. It prevents the database optimizer from using B-Tree indexes, makes foreign keys impossible, complicates counting, and degrades performance."
      },
      {
        "id": 12,
        "difficulty": "medium",
        "type": "theory",
        "question": "How does Boyce-Codd Normal Form (BCNF) differ from Third Normal Form (3NF)?",
        "options": [
          "3NF allows multi-valued dependencies, whereas BCNF strictly disallows them.",
          "In 3NF, for X → Y, Y can be a prime attribute even if X is not a superkey; in BCNF, every determinant X must strictly be a superkey.",
          "BCNF only applies to tables without foreign keys.",
          "3NF is stricter than BCNF."
        ],
        "correct": 1,
        "explanation": "3NF allows X → Y if Y is a prime attribute even when X is not a superkey. BCNF removes this exemption: EVERY determinant X in a non-trivial dependency must be a superkey."
      },
      {
        "id": 13,
        "difficulty": "medium",
        "type": "theory",
        "question": "Consider CourseEnrollment(student_id, course_code, room_number, room_capacity). PK is (student_id, course_code). room_number depends on course_code, and room_capacity depends on room_number. Which normal forms are violated?",
        "options": [
          "1NF only",
          "2NF is violated by course_code → room_number, and 3NF is violated by room_number → room_capacity",
          "3NF only; 2NF is satisfied",
          "Neither is violated; the table is in BCNF"
        ],
        "correct": 1,
        "explanation": "course_code → room_number is a partial dependency violating 2NF. room_number → room_capacity is a transitive dependency between non-key attributes violating 3NF."
      },
      {
        "id": 14,
        "difficulty": "medium",
        "type": "theory",
        "question": "What is the primary trade-off of normalizing a database up to 3NF in high-throughput analytical/reporting workloads?",
        "options": [
          "Data redundancy increases significantly.",
          "Read queries frequently require multi-table JOINs across decomposed tables, which can impact reporting latency compared to denormalized read-models.",
          "INSERT and UPDATE queries become significantly slower.",
          "It becomes impossible to define foreign keys."
        ],
        "correct": 1,
        "explanation": "While normalization eliminates update anomalies for OLTP systems, reporting systems (OLAP/Data Warehouses) often intentionally denormalize schemas to avoid expensive multi-table JOIN operations."
      },
      {
        "id": 15,
        "difficulty": "query",
        "type": "coding",
        "question": "A legacy table has non-atomic data: UserPhones(user_id INT, phone_numbers VARCHAR(100)). Which pair of normalized tables correctly restructures this schema into 1NF with referential integrity?",
        "options": [
          "CREATE TABLE Users (user_id INT PRIMARY KEY, name VARCHAR(50));\nCREATE TABLE User_Phones (\n  user_id INT,\n  phone VARCHAR(20),\n  PRIMARY KEY (user_id, phone),\n  FOREIGN KEY (user_id) REFERENCES Users(user_id)\n);",
          "CREATE TABLE Users (\n  user_id INT PRIMARY KEY,\n  phone1 VARCHAR(20),\n  phone2 VARCHAR(20),\n  phone3 VARCHAR(20)\n);",
          "CREATE TABLE User_Phones (\n  phone_id INT,\n  user_id INT,\n  all_phones ARRAY\n);",
          "ALTER TABLE UserPhones ADD CONSTRAINT chk_comma CHECK (phone_numbers NOT LIKE '%,%');"
        ],
        "correct": 0,
        "explanation": "Decomposing the non-atomic list into a child table where each row holds exactly ONE atomic phone number with composite primary key (user_id, phone) satisfies 1NF."
      },
      {
        "id": 16,
        "difficulty": "query",
        "type": "coding",
        "question": "Table StudentCourses(student_id INT, course_id INT, course_name VARCHAR(50), grade CHAR(2)) has PK (student_id, course_id). Which SQL statements properly resolve the 2NF partial dependency course_id → course_name?",
        "options": [
          "CREATE TABLE Courses (\n  course_id INT PRIMARY KEY,\n  course_name VARCHAR(50)\n);\nCREATE TABLE Student_Grades (\n  student_id INT,\n  course_id INT,\n  grade CHAR(2),\n  PRIMARY KEY (student_id, course_id),\n  FOREIGN KEY (course_id) REFERENCES Courses(course_id)\n);",
          "CREATE TABLE Student_Grades (\n  student_id INT PRIMARY KEY,\n  grade CHAR(2)\n);\nCREATE TABLE Courses (\n  course_id INT PRIMARY KEY,\n  course_name VARCHAR(50)\n);",
          "ALTER TABLE StudentCourses DROP COLUMN course_id;",
          "CREATE TABLE StudentCourses (\n  enrollment_id INT PRIMARY KEY,\n  course_name VARCHAR(50)\n);"
        ],
        "correct": 0,
        "explanation": "Extracting course attributes into a parent `Courses` table and maintaining enrollments with `grade` in junction table `Student_Grades` eliminates partial dependency."
      },
      {
        "id": 17,
        "difficulty": "query",
        "type": "coding",
        "question": "Table Employees(emp_id INT PK, emp_name VARCHAR(50), dept_id INT, dept_name VARCHAR(50), dept_head VARCHAR(50)) violates 3NF due to dept_id → (dept_name, dept_head). Which DDL migration converts this into 3NF?",
        "options": [
          "CREATE TABLE Departments (\n  dept_id INT PRIMARY KEY,\n  dept_name VARCHAR(50),\n  dept_head VARCHAR(50)\n);\nALTER TABLE Employees DROP COLUMN dept_name, DROP COLUMN dept_head;\nALTER TABLE Employees ADD CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES Departments(dept_id);",
          "ALTER TABLE Employees ADD CONSTRAINT uq_dept UNIQUE (dept_name, dept_head);",
          "CREATE TABLE Dept_Head (\n  emp_id INT PRIMARY KEY,\n  dept_head VARCHAR(50)\n);",
          "UPDATE Employees SET dept_name = NULL, dept_head = NULL WHERE dept_id IS NOT NULL;"
        ],
        "correct": 0,
        "explanation": "Creating a dedicated `Departments` table and removing redundant transitive columns from `Employees` enforces 3NF."
      },
      {
        "id": 18,
        "difficulty": "query",
        "type": "coding",
        "question": "Before applying normalization on a legacy unconstrained table `RawSales`, you need to detect all duplicate composite keys `(store_id, sale_date, receipt_no)`. Which SQL query correctly identifies duplicate records?",
        "options": [
          "SELECT store_id, sale_date, receipt_no, COUNT(*) as cnt\nFROM RawSales\nGROUP BY store_id, sale_date, receipt_no\nHAVING COUNT(*) > 1;",
          "SELECT DISTINCT store_id, sale_date, receipt_no\nFROM RawSales\nWHERE COUNT(*) > 1;",
          "SELECT store_id, sale_date, receipt_no\nFROM RawSales\nWHERE receipt_no IN (SELECT receipt_no FROM RawSales);",
          "SELECT * FROM RawSales\nORDER BY store_id, sale_date, receipt_no DESC;"
        ],
        "correct": 0,
        "explanation": "Grouping by the candidate key columns and filtering with `HAVING COUNT(*) > 1` detects duplicate key combinations violating uniqueness."
      },
      {
        "id": 19,
        "difficulty": "query",
        "type": "coding",
        "question": "After normalizing into `Customers(cust_id PK, cust_name)` and `Orders(order_id PK, cust_id FK, order_total)`, which query retrieves the customer name and total spending for customers who spent more than $500, avoiding unnormalized duplication?",
        "options": [
          "SELECT c.cust_name, SUM(o.order_total) AS total_spent\nFROM Customers c\nJOIN Orders o ON c.cust_id = o.cust_id\nGROUP BY c.cust_id, c.cust_name\nHAVING SUM(o.order_total) > 500;",
          "SELECT c.cust_name, o.order_total\nFROM Customers c, Orders o\nWHERE o.order_total > 500;",
          "SELECT c.cust_name, SUM(o.order_total)\nFROM Customers c\nLEFT JOIN Orders o ON c.cust_id = o.cust_id\nWHERE SUM(o.order_total) > 500;",
          "SELECT cust_name, (SELECT order_total FROM Orders) FROM Customers;"
        ],
        "correct": 0,
        "explanation": "An INNER JOIN grouped by customer ID and filtered with `HAVING SUM(o.order_total) > 500` is the standard normalized query."
      },
      {
        "id": 20,
        "difficulty": "query",
        "type": "coding",
        "question": "Which SQL DDL statement correctly creates an associative junction table with a Composite Primary Key and cascading deletion constraints to ensure 1NF/2NF integrity?",
        "options": [
          "CREATE TABLE ProjectAssignments (\n  emp_id INT NOT NULL,\n  proj_id INT NOT NULL,\n  assigned_date DATE DEFAULT CURRENT_DATE,\n  role VARCHAR(30),\n  PRIMARY KEY (emp_id, proj_id),\n  FOREIGN KEY (emp_id) REFERENCES Employees(emp_id) ON DELETE CASCADE,\n  FOREIGN KEY (proj_id) REFERENCES Projects(proj_id) ON DELETE CASCADE\n);",
          "CREATE TABLE ProjectAssignments (\n  emp_id INT PRIMARY KEY,\n  proj_id INT PRIMARY KEY,\n  role VARCHAR(30)\n);",
          "CREATE TABLE ProjectAssignments (\n  id INT,\n  emp_id INT FOREIGN KEY,\n  proj_id INT FOREIGN KEY\n);",
          "CREATE TABLE ProjectAssignments (\n  emp_id INT UNIQUE,\n  proj_id INT UNIQUE,\n  role VARCHAR(30)\n);"
        ],
        "correct": 0,
        "explanation": "`PRIMARY KEY (emp_id, proj_id)` with `ON DELETE CASCADE` foreign key references maintains referential integrity."
      }
    ]
  },
  "part2": {
    "title": "Chapter 2 Mastery Quiz: Keys & Constraints",
    "subtitle": "Master Primary Keys, Foreign Keys, Candidate/Alternate Keys, UNIQUE, CHECK, and referential integrity actions.",
    "questions": [
      {
        "id": 1,
        "difficulty": "easy",
        "type": "theory",
        "question": "What two fundamental database properties are combined to define a PRIMARY KEY constraint?",
        "options": [
          "AUTO_INCREMENT and DEFAULT",
          "UNIQUE and NOT NULL",
          "FOREIGN KEY and INDEX",
          "CHECK and CASCADE"
        ],
        "correct": 1,
        "explanation": "A PRIMARY KEY uniquely identifies each row in a table. By definition, it requires column values to be strictly UNIQUE and NOT NULL. Option A is an implementation feature, and Option C defines relationship linkages."
      },
      {
        "id": 2,
        "difficulty": "easy",
        "type": "theory",
        "question": "What is a 'Candidate Key'?",
        "options": [
          "Any column that has been indexed by the DBA.",
          "A minimal superkey capable of uniquely identifying a record without redundant attributes.",
          "A foreign key awaiting approval from a schema migration.",
          "A key that can only contain integer values."
        ],
        "correct": 1,
        "explanation": "A Candidate Key is a minimal set of attributes that uniquely identifies any tuple in a table. From all candidate keys, one is chosen as the Primary Key, while remaining candidate keys become Alternate Keys."
      },
      {
        "id": 3,
        "difficulty": "easy",
        "type": "theory",
        "question": "Which constraint ensures that all values in a column satisfy a boolean condition (such as age >= 18)?",
        "options": [
          "CHECK",
          "DEFAULT",
          "UNIQUE",
          "NOT NULL"
        ],
        "correct": 0,
        "explanation": "The CHECK constraint validates domain integrity by ensuring that every inserted or updated value evaluates to TRUE for a specified boolean expression."
      },
      {
        "id": 4,
        "difficulty": "easy",
        "type": "theory",
        "question": "How many PRIMARY KEY constraints can a single relational table have?",
        "options": [
          "Unlimited, as long as each column is named differently.",
          "Exactly one (though it can be composite, consisting of multiple columns).",
          "Up to two (one clustered, one non-clustered).",
          "One for numeric columns and one for text columns."
        ],
        "correct": 1,
        "explanation": "A relational table can have strictly ONE Primary Key. However, that primary key can consist of multiple columns (a composite primary key). In contrast, a table can have multiple UNIQUE constraints."
      },
      {
        "id": 5,
        "difficulty": "easy",
        "type": "theory",
        "question": "What is an 'Alternate Key'?",
        "options": [
          "A secondary database server used for failover.",
          "A candidate key that was not chosen as the primary key.",
          "A foreign key that points to a temporary table.",
          "A key that automatically changes value on every UPDATE."
        ],
        "correct": 1,
        "explanation": "Any candidate key not selected as the primary key is termed an Alternate Key (or secondary key). It still uniquely identifies rows and is typically enforced via a UNIQUE constraint."
      },
      {
        "id": 6,
        "difficulty": "easy",
        "type": "theory",
        "question": "What is the primary objective of a FOREIGN KEY constraint?",
        "options": [
          "To speed up full-text search queries.",
          "To enforce Referential Integrity between child and parent tables.",
          "To prevent NULL values from ever being inserted into a column.",
          "To automatically compress data on disk."
        ],
        "correct": 1,
        "explanation": "Foreign keys enforce referential integrity by ensuring child rows cannot reference a non-existent parent row. They prevent orphaned records."
      },
      {
        "id": 7,
        "difficulty": "easy",
        "type": "theory",
        "question": "Which constraint automatically assigns a predefined fallback value when an INSERT statement does not supply one?",
        "options": [
          "DEFAULT",
          "FALLBACK",
          "AUTO_VAL",
          "SET NULL"
        ],
        "correct": 0,
        "explanation": "The DEFAULT constraint supplies a default literal value or function output (e.g. CURRENT_TIMESTAMP) if the INSERT query omits that column."
      },
      {
        "id": 8,
        "difficulty": "medium",
        "type": "theory",
        "question": "How does a UNIQUE constraint differ from a PRIMARY KEY constraint in ANSI SQL standard?",
        "options": [
          "UNIQUE constraints cannot be indexed.",
          "A table can have multiple UNIQUE constraints, and UNIQUE columns typically allow NULL values (one or more depending on RDBMS), whereas PRIMARY KEY strictly forbids all NULLs.",
          "PRIMARY KEY constraints can only be placed on integer data types.",
          "UNIQUE constraints only check uniqueness across the first 10 rows."
        ],
        "correct": 1,
        "explanation": "A table may have multiple UNIQUE constraints, whereas it can have only one Primary Key. Furthermore, PRIMARY KEY rejects NULLs completely, while UNIQUE allows NULLs (representing unknown values)."
      },
      {
        "id": 9,
        "difficulty": "medium",
        "type": "theory",
        "question": "If a Foreign Key is defined with 'ON DELETE CASCADE', what happens when a parent record in the referenced table is deleted?",
        "options": [
          "The deletion fails and throws a foreign key violation error.",
          "All referencing child rows in the dependent table are automatically deleted as well.",
          "The foreign key columns in referencing child rows are set to NULL.",
          "The parent record is archived into a backup table."
        ],
        "correct": 1,
        "explanation": "ON DELETE CASCADE automatically deletes all child rows that reference the deleted parent row, preventing orphaned records. Option A describes RESTRICT/NO ACTION, and Option C describes ON DELETE SET NULL."
      },
      {
        "id": 10,
        "difficulty": "medium",
        "type": "theory",
        "question": "What is a 'Super Key'?",
        "options": [
          "A primary key that contains more than 10 columns.",
          "Any set of one or more attributes that uniquely identifies a row in a table (including candidate keys and candidate keys combined with redundant attributes).",
          "An administrative database master key used for encryption.",
          "A key that can bypass foreign key checks."
        ],
        "correct": 1,
        "explanation": "A Super Key is any superset of attributes that uniquely identifies tuples. A Candidate Key is a minimal superkey (no proper subset is a superkey)."
      },
      {
        "id": 11,
        "difficulty": "medium",
        "type": "theory",
        "question": "When is 'ON DELETE SET NULL' NOT permissible on a foreign key definition?",
        "options": [
          "When the parent table has more than 1000 rows.",
          "When the child table's foreign key column is also declared as NOT NULL.",
          "When the parent table has an auto-incrementing key.",
          "When the database uses an InnoDB or HSQLDB storage engine."
        ],
        "correct": 1,
        "explanation": "If the child column is marked NOT NULL, setting its value to NULL on parent deletion triggers a NOT NULL constraint violation. Hence, ON DELETE SET NULL requires the foreign key column to be nullable."
      },
      {
        "id": 12,
        "difficulty": "medium",
        "type": "theory",
        "question": "Why should an application architect avoid using naturally volatile columns (such as phone_number or user_email) as Primary Keys?",
        "options": [
          "Database indexes cannot store alphabetic characters.",
          "If a user updates their email, the database must cascade updates across all foreign key child tables, locking rows and risking cascading inconsistencies.",
          "Email addresses automatically violate 1NF.",
          "Primary keys cannot exceed 10 characters in length."
        ],
        "correct": 1,
        "explanation": "Volatile keys cause update cascades across dependent tables when changed. Surrogate keys (like immutable UUIDs or auto-incrementing IDs) are preferred because they never mutate."
      },
      {
        "id": 13,
        "difficulty": "medium",
        "type": "theory",
        "question": "What happens if an INSERT statement attempts to insert a row where the CHECK constraint expression evaluates to UNKNOWN (due to a NULL value)?",
        "options": [
          "The INSERT is rejected because UNKNOWN is treated as FALSE.",
          "The INSERT succeeds because in SQL, CHECK constraints only reject rows when the expression evaluates explicitly to FALSE.",
          "The database terminates the transaction with a fatal exception.",
          "The column value is automatically converted to 0."
        ],
        "correct": 1,
        "explanation": "Crucial SQL interview gotcha: CHECK constraints reject rows ONLY if the condition evaluates to FALSE. If a value is NULL and the condition evaluates to UNKNOWN, the CHECK constraint passes! To prevent this, pair CHECK with NOT NULL."
      },
      {
        "id": 14,
        "difficulty": "medium",
        "type": "theory",
        "question": "What is a 'Surrogate Key' compared to a 'Natural Key'?",
        "options": [
          "A surrogate key is an artificial, system-generated identifier with no business meaning, whereas a natural key consists of real-world attributes (e.g. SSN).",
          "A natural key is always generated by the database sequence, while a surrogate key is provided by the end user.",
          "A surrogate key cannot have foreign key relationships.",
          "A surrogate key is only stored in RAM."
        ],
        "correct": 0,
        "explanation": "Natural keys exist in the business domain (e.g., passport number, tax ID). Surrogate keys are synthetic IDs (e.g., BIGINT AUTO_INCREMENT or UUID) created solely for database mechanics."
      },
      {
        "id": 15,
        "difficulty": "query",
        "type": "coding",
        "question": "Which SQL statement correctly creates a table with a Composite Primary Key on (order_id, item_id)?",
        "options": [
          "CREATE TABLE OrderItems (\n  order_id INT,\n  item_id INT,\n  quantity INT,\n  PRIMARY KEY (order_id, item_id)\n);",
          "CREATE TABLE OrderItems (\n  order_id INT PRIMARY KEY,\n  item_id INT PRIMARY KEY,\n  quantity INT\n);",
          "CREATE TABLE OrderItems (\n  order_id INT,\n  item_id INT,\n  COMPOSITE KEY (order_id, item_id)\n);",
          "CREATE TABLE OrderItems (\n  order_id INT NOT NULL,\n  item_id INT NOT NULL\n) WITH PRIMARY KEY;"
        ],
        "correct": 0,
        "explanation": "Composite primary keys must be declared at the table level using `PRIMARY KEY (col1, col2)`. Option B is a syntax error because inline `PRIMARY KEY` cannot be used more than once."
      },
      {
        "id": 16,
        "difficulty": "query",
        "type": "coding",
        "question": "Which SQL query correctly creates an Employees table with a CHECK constraint ensuring salary is greater than zero and hire_date is after '2000-01-01'?",
        "options": [
          "CREATE TABLE Employees (\n  emp_id INT PRIMARY KEY,\n  salary DECIMAL(10,2),\n  hire_date DATE,\n  CONSTRAINT chk_emp CHECK (salary > 0 AND hire_date >= '2000-01-01')\n);",
          "CREATE TABLE Employees (\n  emp_id INT PRIMARY KEY,\n  salary DECIMAL(10,2) WHERE salary > 0,\n  hire_date DATE WHERE hire_date >= '2000-01-01'\n);",
          "CREATE TABLE Employees (\n  emp_id INT PRIMARY KEY,\n  salary DECIMAL(10,2) VALIDATE (salary > 0)\n);",
          "ALTER TABLE Employees ENFORCE (salary > 0);"
        ],
        "correct": 0,
        "explanation": "Option A properly declares a named table-level CHECK constraint combining both conditions using the `AND` logical operator. Options B and C use invalid SQL syntax."
      },
      {
        "id": 17,
        "difficulty": "query",
        "type": "coding",
        "question": "How do you add a Foreign Key constraint named `fk_orders_customer` to an existing `Orders` table referencing `Customers(cust_id)` with cascading deletes?",
        "options": [
          "ALTER TABLE Orders\nADD CONSTRAINT fk_orders_customer\nFOREIGN KEY (cust_id) REFERENCES Customers(cust_id)\nON DELETE CASCADE;",
          "ALTER TABLE Orders\nMODIFY cust_id REFERENCES Customers(cust_id) CASCADE;",
          "UPDATE Orders\nSET cust_id = FOREIGN KEY(Customers.cust_id);",
          "CREATE FOREIGN KEY fk_orders_customer ON Orders(cust_id) TO Customers(cust_id);"
        ],
        "correct": 0,
        "explanation": "The standard SQL syntax to add a foreign key to an existing table is `ALTER TABLE ... ADD CONSTRAINT ... FOREIGN KEY (col) REFERENCES parent_table(parent_col) ON DELETE CASCADE`."
      },
      {
        "id": 18,
        "difficulty": "query",
        "type": "coding",
        "question": "Which query attempts to insert a record that will trigger a UNIQUE constraint violation on table `Users(id PK, email UNIQUE, username UNIQUE)`?",
        "options": [
          "INSERT INTO Users (id, email, username) VALUES (2, 'john@test.com', 'johnny')\n-- when a row with email 'john@test.com' already exists;",
          "INSERT INTO Users (id, email, username) VALUES (3, NULL, 'bob')\n-- when another row already has email as NULL;",
          "INSERT INTO Users (id, email, username) VALUES (4, 'sam@test.com', 'sam')\n-- with a new id and unique email;",
          "SELECT * FROM Users WHERE email = 'john@test.com';"
        ],
        "correct": 0,
        "explanation": "Attempting to insert a duplicate email when 'john@test.com' already exists violates the UNIQUE constraint on the email column. Option B is valid in most databases because NULL != NULL."
      },
      {
        "id": 19,
        "difficulty": "query",
        "type": "coding",
        "question": "How can you drop a constraint named `chk_min_price` from table `Products` in standard ANSI / HSQLDB SQL?",
        "options": [
          "ALTER TABLE Products DROP CONSTRAINT chk_min_price;",
          "DELETE CONSTRAINT chk_min_price FROM Products;",
          "DROP CHECK chk_min_price ON Products;",
          "REMOVE CONSTRAINT chk_min_price;"
        ],
        "correct": 0,
        "explanation": "In ANSI SQL, constraints are dropped using `ALTER TABLE <table_name> DROP CONSTRAINT <constraint_name>`."
      },
      {
        "id": 20,
        "difficulty": "query",
        "type": "coding",
        "question": "Which SQL query tests if any foreign key references in the `Orders` table point to non-existent `Customers` records (detecting broken integrity in legacy unconstrained data)?",
        "options": [
          "SELECT o.order_id, o.cust_id\nFROM Orders o\nLEFT JOIN Customers c ON o.cust_id = c.cust_id\nWHERE c.cust_id IS NULL AND o.cust_id IS NOT NULL;",
          "SELECT * FROM Orders WHERE cust_id = NULL;",
          "SELECT o.order_id FROM Orders o INNER JOIN Customers c ON o.cust_id = c.cust_id;",
          "SELECT COUNT(*) FROM Orders GROUP BY cust_id HAVING COUNT(*) = 0;"
        ],
        "correct": 0,
        "explanation": "A LEFT JOIN from child to parent with `WHERE parent.key IS NULL` identifies child rows with orphaned foreign keys that reference non-existent parent rows."
      }
    ]
  },
  "part3": {
    "title": "Chapter 3 Mastery Quiz: DDL · DML · TCL",
    "subtitle": "Test your mastery of Data Definition (CREATE, ALTER, DROP, TRUNCATE), Data Manipulation (INSERT, UPDATE, DELETE), and Transactions (COMMIT, ROLLBACK, SAVEPOINT).",
    "questions": [
      {
        "id": 1,
        "difficulty": "easy",
        "type": "theory",
        "question": "Which SQL sub-language category do commands like CREATE, ALTER, DROP, and TRUNCATE belong to?",
        "options": [
          "DML (Data Manipulation Language)",
          "DDL (Data Definition Language)",
          "TCL (Transaction Control Language)",
          "DCL (Data Control Language)"
        ],
        "correct": 1,
        "explanation": "DDL (Data Definition Language) commands define, alter, and destroy database structures/schemas (tables, indexes, views)."
      },
      {
        "id": 2,
        "difficulty": "easy",
        "type": "theory",
        "question": "Which statement permanently saves all transaction changes made during the current database session to disk?",
        "options": [
          "SAVE",
          "COMMIT",
          "CHECKPOINT",
          "PERSIST"
        ],
        "correct": 1,
        "explanation": "COMMIT is the standard TCL command that finalizes a transaction and permanently writes changes to the database storage."
      },
      {
        "id": 3,
        "difficulty": "easy",
        "type": "theory",
        "question": "What is the critical behavioral difference between TRUNCATE and DELETE in SQL?",
        "options": [
          "DELETE cannot delete all rows from a table.",
          "TRUNCATE is a DDL operation that deallocates data pages quickly without firing row-level triggers, whereas DELETE is a DML operation that deletes rows one-by-one and logs each deletion.",
          "TRUNCATE allows a WHERE clause, while DELETE does not.",
          "TRUNCATE deletes the table schema definition itself from the catalog."
        ],
        "correct": 1,
        "explanation": "TRUNCATE is a DDL command that resets the table by deallocating storage pages; it cannot take a WHERE clause and does not fire DELETE triggers. DELETE is DML, row-by-row, and fully logged."
      },
      {
        "id": 4,
        "difficulty": "easy",
        "type": "theory",
        "question": "Which TCL statement undoes all uncommitted DML modifications made in the current transaction?",
        "options": [
          "UNDO",
          "REVERT",
          "ROLLBACK",
          "RESET"
        ],
        "correct": 2,
        "explanation": "ROLLBACK restores database state to the beginning of the transaction or to a designated SAVEPOINT."
      },
      {
        "id": 5,
        "difficulty": "easy",
        "type": "theory",
        "question": "Which command completely removes a table and its entire schema structure from the database catalog?",
        "options": [
          "TRUNCATE TABLE",
          "DELETE TABLE",
          "DROP TABLE",
          "REMOVE TABLE"
        ],
        "correct": 2,
        "explanation": "DROP TABLE destroys both the table data and its schema definition. TRUNCATE and DELETE only remove data rows while keeping the empty table structure intact."
      },
      {
        "id": 6,
        "difficulty": "easy",
        "type": "theory",
        "question": "What happens if you execute an UPDATE statement without specifying a WHERE clause?",
        "options": [
          "The database throws a syntax error.",
          "Every single row in the table is updated with the new values.",
          "Only the first row in the table is updated.",
          "The database asks for interactive confirmation."
        ],
        "correct": 1,
        "explanation": "Without a WHERE clause, an UPDATE statement applies to every single row in the target table, often causing catastrophic accidental data overwrite."
      },
      {
        "id": 7,
        "difficulty": "easy",
        "type": "theory",
        "question": "What is the purpose of a SAVEPOINT in transaction management?",
        "options": [
          "To export database tables to CSV format.",
          "To mark a checkpoint within a transaction so you can roll back partial work without cancelling the entire transaction.",
          "To commit the transaction automatically after 5 minutes.",
          "To lock the database from reading."
        ],
        "correct": 1,
        "explanation": "SAVEPOINT creates an intermediate checkpoint within a transaction, allowing `ROLLBACK TO SAVEPOINT <name>` to undo only changes made after that point."
      },
      {
        "id": 8,
        "difficulty": "medium",
        "type": "theory",
        "question": "In most SQL engines (including Oracle, MySQL, and HSQLDB), what implicit action occurs when you execute a DDL command (such as ALTER TABLE or CREATE TABLE)?",
        "options": [
          "An implicit ROLLBACK of any pending transaction.",
          "An implicit COMMIT is issued, permanently locking in prior uncommitted DML changes.",
          "The transaction isolation level is lowered to READ UNCOMMITTED.",
          "All foreign keys in the database are disabled."
        ],
        "correct": 1,
        "explanation": "In most relational engines, DDL statements cause an automatic, implicit COMMIT. Any pending DML operations are committed immediately and cannot be rolled back."
      },
      {
        "id": 9,
        "difficulty": "medium",
        "type": "theory",
        "question": "Why does TRUNCATE TABLE fail if another table has a FOREIGN KEY referencing it, even if the referencing table is empty?",
        "options": [
          "Because TRUNCATE does not validate individual row constraints and would violate referential structure rules.",
          "Because TRUNCATE requires root database administrator credentials.",
          "Because foreign keys lock the metadata catalog indefinitely.",
          "Because TRUNCATE only works on temporary tables."
        ],
        "correct": 0,
        "explanation": "TRUNCATE bypasses row-level checks. To prevent referential integrity breaches, relational engines prohibit TRUNCATE on tables referenced by active foreign keys (unless foreign keys are dropped or CASCADE is supported)."
      },
      {
        "id": 10,
        "difficulty": "medium",
        "type": "theory",
        "question": "What is the result of executing: `BEGIN; INSERT INTO Logs VALUES(1); SAVEPOINT sp1; INSERT INTO Logs VALUES(2); ROLLBACK TO sp1; COMMIT;`?",
        "options": [
          "Both rows (1 and 2) are committed.",
          "Row 1 is committed, and Row 2 is discarded.",
          "Neither row is committed because a ROLLBACK was executed.",
          "The database raises a syntax error at COMMIT."
        ],
        "correct": 1,
        "explanation": "Rolling back to savepoint `sp1` cancels only work done after `sp1` (Row 2). The transaction remains active, and the subsequent `COMMIT` permanently saves Row 1."
      },
      {
        "id": 11,
        "difficulty": "medium",
        "type": "theory",
        "question": "What is the ACID property that guarantees all operations within a transaction succeed completely, or none of them take effect (all-or-nothing)?",
        "options": [
          "Atomicity",
          "Consistency",
          "Isolation",
          "Durability"
        ],
        "correct": 0,
        "explanation": "Atomicity ensures that a transaction is treated as a single atomic unit of work: either all operations execute, or the transaction is completely aborted and rolled back."
      },
      {
        "id": 12,
        "difficulty": "medium",
        "type": "theory",
        "question": "When should you use `DROP TABLE ... CASCADE` instead of plain `DROP TABLE`?",
        "options": [
          "When you want to delete the table and all foreign keys or dependent objects referencing it.",
          "When you want to delete only child records.",
          "When the table contains more than 1 million records.",
          "When you want to skip the transaction log."
        ],
        "correct": 0,
        "explanation": "`DROP TABLE ... CASCADE` automatically drops dependent objects (such as foreign key constraints in child tables or views) that would otherwise block the drop operation."
      },
      {
        "id": 13,
        "difficulty": "medium",
        "type": "theory",
        "question": "What is the difference between an 'explicit transaction' and 'autocommit mode'?",
        "options": [
          "Autocommit mode only allows SELECT queries.",
          "In autocommit mode, every individual SQL statement is treated as an independent transaction and committed immediately; explicit transactions require an explicit COMMIT to persist changes.",
          "Explicit transactions can only be run from stored procedures.",
          "Autocommit disables indexes."
        ],
        "correct": 1,
        "explanation": "When autocommit is ON (default in many interactive clients), each statement commits immediately upon execution. Explicit transactions (via `BEGIN TRANSACTION` / `START TRANSACTION`) group multiple statements until an explicit `COMMIT`."
      },
      {
        "id": 14,
        "difficulty": "medium",
        "type": "theory",
        "question": "Can a `TRUNCATE TABLE` command be rolled back in standard relational engines?",
        "options": [
          "Never in any relational database under any circumstances.",
          "In transaction-aware systems like PostgreSQL and SQL Server, TRUNCATE can be rolled back if run inside an explicit transaction; in MySQL and Oracle, it issues an implicit commit and cannot be rolled back.",
          "Always, exactly like DELETE.",
          "Only if the backup server is online."
        ],
        "correct": 1,
        "explanation": "RDBMS architecture variance: SQL Server and PostgreSQL support transactional DDL, allowing TRUNCATE to be rolled back within a transaction. MySQL and Oracle perform implicit commits on DDL, making TRUNCATE irreversible."
      },
      {
        "id": 15,
        "difficulty": "query",
        "type": "coding",
        "question": "Which SQL query correctly inserts multiple rows into a `Departments` table in a single atomic statement?",
        "options": [
          "INSERT INTO Departments (dept_id, dept_name)\nVALUES (10, 'Engineering'), (20, 'Marketing'), (30, 'Finance');",
          "INSERT INTO Departments VALUES (10, 'Engineering') AND (20, 'Marketing');",
          "INSERT ALL INTO Departments VALUES (10, 'Engineering') VALUES (20, 'Marketing');",
          "ADD TO Departments (10, 'Engineering'), (20, 'Marketing');"
        ],
        "correct": 0,
        "explanation": "ANSI SQL standard supports multi-row `INSERT INTO ... VALUES (...), (...), (...)` to insert several rows in a single batch statement."
      },
      {
        "id": 16,
        "difficulty": "query",
        "type": "coding",
        "question": "Which SQL statement increases the salary of employees in department 10 by 15%, but only if their current salary is under $60,000?",
        "options": [
          "UPDATE Employees\nSET salary = salary * 1.15\nWHERE dept_id = 10 AND salary < 60000;",
          "UPDATE Employees\nSET salary = salary + 15%\nWHERE dept_id = 10;",
          "MODIFY Employees.salary = salary * 1.15\nWHERE dept_id = 10;",
          "SELECT salary * 1.15 FROM Employees WHERE salary < 60000;"
        ],
        "correct": 0,
        "explanation": "Standard `UPDATE ... SET salary = salary * 1.15 WHERE dept_id = 10 AND salary < 60000` accurately applies the 15% increase only to eligible matching rows."
      },
      {
        "id": 17,
        "difficulty": "query",
        "type": "coding",
        "question": "How do you add a new column `status VARCHAR(20) DEFAULT 'ACTIVE' NOT NULL` to an existing `Accounts` table?",
        "options": [
          "ALTER TABLE Accounts\nADD status VARCHAR(20) DEFAULT 'ACTIVE' NOT NULL;",
          "ALTER TABLE Accounts\nINSERT COLUMN status VARCHAR(20) DEFAULT 'ACTIVE';",
          "UPDATE TABLE Accounts\nADD status VARCHAR(20);",
          "CREATE COLUMN status VARCHAR(20) ON Accounts;"
        ],
        "correct": 0,
        "explanation": "`ALTER TABLE <table_name> ADD <column_name> <data_type> [constraints]` is the ANSI standard DDL syntax to add a column."
      },
      {
        "id": 18,
        "difficulty": "query",
        "type": "coding",
        "question": "Which query deletes all orders from the `Orders` table placed before '2023-01-01' with a status of 'CANCELLED'?",
        "options": [
          "DELETE FROM Orders\nWHERE order_date < '2023-01-01' AND status = 'CANCELLED';",
          "TRUNCATE Orders\nWHERE order_date < '2023-01-01' AND status = 'CANCELLED';",
          "DROP FROM Orders\nWHERE order_date < '2023-01-01';",
          "REMOVE FROM Orders WHERE status = 'CANCELLED';"
        ],
        "correct": 0,
        "explanation": "`DELETE FROM <table_name> WHERE <conditions>` removes specific rows matching the filtering criteria. TRUNCATE cannot filter with WHERE."
      },
      {
        "id": 19,
        "difficulty": "query",
        "type": "coding",
        "question": "Which transaction script transfers $500 from Account 1 to Account 2 safely using TCL commands?",
        "options": [
          "BEGIN TRANSACTION;\nUPDATE Accounts SET balance = balance - 500 WHERE account_id = 1;\nUPDATE Accounts SET balance = balance + 500 WHERE account_id = 2;\nCOMMIT;",
          "START TRANSACTION;\nUPDATE Accounts SET balance = balance - 500 WHERE account_id = 1;\nROLLBACK;\nUPDATE Accounts SET balance = balance + 500 WHERE account_id = 2;",
          "COMMIT TRANSACTION;\nUPDATE Accounts SET balance = balance - 500;\nEND;",
          "UPDATE Accounts SET balance = balance - 500 WHERE account_id = 1 AND balance + 500 WHERE account_id = 2;"
        ],
        "correct": 0,
        "explanation": "Wrapping both debit and credit updates between `BEGIN TRANSACTION` and `COMMIT` guarantees that both balance updates either succeed together or fail together (Atomicity)."
      },
      {
        "id": 20,
        "difficulty": "query",
        "type": "coding",
        "question": "How do you rename an existing column `emp_fname` to `first_name` in ANSI / modern SQL?",
        "options": [
          "ALTER TABLE Employees RENAME COLUMN emp_fname TO first_name;",
          "UPDATE Employees RENAME emp_fname AS first_name;",
          "MODIFY TABLE Employees COLUMN emp_fname = first_name;",
          "ALTER TABLE Employees CHANGE NAME emp_fname first_name;"
        ],
        "correct": 0,
        "explanation": "The standard SQL syntax supported across modern RDBMS is `ALTER TABLE <table_name> RENAME COLUMN <old_name> TO <new_name>`."
      }
    ]
  },
  "part4": {
    "title": "Chapter 4 Mastery Quiz: SELECT · WHERE · ORDER BY",
    "subtitle": "Master data retrieval, conditional filtering, logical precedence (AND/OR/NOT), pattern matching (LIKE), and sorting mechanics.",
    "questions": [
      {
        "id": 1,
        "difficulty": "easy",
        "type": "theory",
        "question": "What is the purpose of the `DISTINCT` keyword in a `SELECT` statement?",
        "options": [
          "To sort query results in ascending alphabetical order.",
          "To eliminate duplicate rows from the query output.",
          "To count the total number of records.",
          "To enforce a UNIQUE constraint on the table."
        ],
        "correct": 1,
        "explanation": "`SELECT DISTINCT` filters the query projection so that duplicate rows are removed, returning only unique value combinations."
      },
      {
        "id": 2,
        "difficulty": "easy",
        "type": "theory",
        "question": "In SQL `LIKE` pattern matching, what does the `%` (percent) wildcard represent?",
        "options": [
          "Exactly one single character.",
          "Zero, one, or multiple characters.",
          "Only numeric digits.",
          "An escaped backslash."
        ],
        "correct": 1,
        "explanation": "`%` matches any sequence of zero or more characters. The underscore `_` matches exactly one character."
      },
      {
        "id": 3,
        "difficulty": "easy",
        "type": "theory",
        "question": "In SQL `LIKE` pattern matching, what does the `_` (underscore) wildcard represent?",
        "options": [
          "Any number of spaces.",
          "Exactly one single character.",
          "Case-insensitive matching.",
          "End of the string."
        ],
        "correct": 1,
        "explanation": "The underscore `_` wildcard matches exactly one single character in any position."
      },
      {
        "id": 4,
        "difficulty": "easy",
        "type": "theory",
        "question": "What is the default sort direction when `ORDER BY` is specified without ASC or DESC?",
        "options": [
          "DESC (Descending)",
          "ASC (Ascending)",
          "Random order",
          "Primary key order"
        ],
        "correct": 1,
        "explanation": "In SQL, `ORDER BY column` defaults to `ASC` (ascending order: A-Z, smallest to largest number)."
      },
      {
        "id": 5,
        "difficulty": "easy",
        "type": "theory",
        "question": "Which operator tests whether a value falls within an inclusive numerical or date range?",
        "options": [
          "IN",
          "BETWEEN ... AND ...",
          "WITHIN",
          "INSIDE"
        ],
        "correct": 1,
        "explanation": "`BETWEEN val1 AND val2` tests if a value is greater than or equal to `val1` AND less than or equal to `val2` (inclusive range)."
      },
      {
        "id": 6,
        "difficulty": "easy",
        "type": "theory",
        "question": "Which operator checks if a column value matches any element in a predefined list of literals or subquery results?",
        "options": [
          "EXISTS",
          "IN",
          "LIKE",
          "MATCH"
        ],
        "correct": 1,
        "explanation": "The `IN (val1, val2, ...)` operator checks whether a candidate value equals any element in the specified list."
      },
      {
        "id": 7,
        "difficulty": "easy",
        "type": "theory",
        "question": "What is the logical order of operator precedence in a SQL WHERE clause containing NOT, AND, and OR (without parentheses)?",
        "options": [
          "OR, followed by AND, followed by NOT",
          "NOT (highest), followed by AND, followed by OR (lowest)",
          "Left-to-right evaluation equally",
          "AND (highest), followed by NOT, followed by OR"
        ],
        "correct": 1,
        "explanation": "Operator precedence in SQL is: 1) `NOT`, 2) `AND`, 3) `OR`. Because `AND` has higher precedence than `OR`, expressions like `A OR B AND C` evaluate as `A OR (B AND C)`."
      },
      {
        "id": 8,
        "difficulty": "medium",
        "type": "theory",
        "question": "Why does the condition `WHERE salary = NULL` return 0 rows, even if rows with NULL salary exist in the table?",
        "options": [
          "Because NULL in SQL represents an unknown state, and comparing anything to NULL with '=' evaluates to UNKNOWN (which WHERE treats as false).",
          "Because the salary column must be converted to VARCHAR first.",
          "Because SQL automatically deletes rows with NULL salary.",
          "Because '=' only works on strings."
        ],
        "correct": 0,
        "explanation": "In SQL three-valued logic, `NULL = NULL` is UNKNOWN, not TRUE. To test for nullness, you must use `IS NULL` or `IS NOT NULL`."
      },
      {
        "id": 9,
        "difficulty": "medium",
        "type": "theory",
        "question": "In what order are the major SQL query clauses logically processed by the relational query engine?",
        "options": [
          "SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY",
          "FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT/OFFSET",
          "WHERE → FROM → SELECT → ORDER BY",
          "ORDER BY → SELECT → FROM → WHERE"
        ],
        "correct": 1,
        "explanation": "Logical query execution order: 1. `FROM` (table scan/joins) → 2. `WHERE` (filter) → 3. `GROUP BY` (aggregate) → 4. `HAVING` (group filter) → 5. `SELECT` (projections) → 6. `ORDER BY` (sort) → 7. `LIMIT/OFFSET`."
      },
      {
        "id": 10,
        "difficulty": "medium",
        "type": "theory",
        "question": "Consider: `SELECT * FROM Employees WHERE dept_id = 10 OR dept_id = 20 AND salary > 50000;`. How does the database interpret this condition?",
        "options": [
          "`(dept_id = 10 OR dept_id = 20) AND salary > 50000`",
          "`dept_id = 10 OR (dept_id = 20 AND salary > 50000)`",
          "All employees with salary > 50000 regardless of department",
          "The query throws an ambiguous precedence exception"
        ],
        "correct": 1,
        "explanation": "Because `AND` binds tighter than `OR`, the query returns everyone in department 10 (regardless of their salary!), plus anyone in department 20 earning over $50,000."
      },
      {
        "id": 11,
        "difficulty": "medium",
        "type": "theory",
        "question": "How does `ORDER BY col DESC NULLS LAST` behave in ANSI SQL?",
        "options": [
          "It places all NULL values at the very top of the sorted output.",
          "It sorts values from highest to lowest, and places any NULL values at the very bottom.",
          "It converts all NULL values to 0 before sorting.",
          "It drops NULL rows from the output."
        ],
        "correct": 1,
        "explanation": "`ORDER BY col DESC NULLS LAST` sorts non-null values descending, while forcing null values to the end/bottom of the result set."
      },
      {
        "id": 12,
        "difficulty": "medium",
        "type": "theory",
        "question": "What does the query `SELECT * FROM Products WHERE price NOT BETWEEN 10 AND 50;` return?",
        "options": [
          "Products with price < 10 OR price > 50",
          "Products with price >= 10 AND price <= 50",
          "Products with price = 10 or price = 50 only",
          "Products with price IS NULL only"
        ],
        "correct": 0,
        "explanation": "`NOT BETWEEN 10 AND 50` is logically equivalent to `price < 10 OR price > 50` (excluding the values between 10 and 50 inclusive)."
      },
      {
        "id": 13,
        "difficulty": "medium",
        "type": "theory",
        "question": "Can you use a column alias defined in the SELECT clause directly in the WHERE clause of the same query?",
        "options": [
          "Yes, aliases are always available anywhere in the query.",
          "No, because the WHERE clause is logically evaluated before the SELECT clause projection occurs.",
          "Yes, but only if the alias is enclosed in double quotes.",
          "Only in PostgreSQL, but never in MySQL."
        ],
        "correct": 1,
        "explanation": "Because `WHERE` filters rows before `SELECT` computes column aliases, referring to an alias in `WHERE` triggers an 'Unknown column' error. (You must repeat the expression or wrap it in a subquery/CTE)."
      },
      {
        "id": 14,
        "difficulty": "medium",
        "type": "theory",
        "question": "What is the difference between `OFFSET 10 LIMIT 5` vs `LIMIT 10 OFFSET 5`?",
        "options": [
          "They produce identical output.",
          "`OFFSET 10 LIMIT 5` skips 10 rows and returns the next 5 rows; `LIMIT 10 OFFSET 5` skips 5 rows and returns the next 10 rows.",
          "LIMIT cannot be used after OFFSET.",
          "OFFSET is only allowed in SQL Server."
        ],
        "correct": 1,
        "explanation": "OFFSET specifies how many rows to skip from the beginning of the result set, and LIMIT (or FETCH FIRST) specifies the maximum number of rows to return."
      },
      {
        "id": 15,
        "difficulty": "query",
        "type": "coding",
        "question": "Which SQL query finds all customers whose last name starts with 'Sm' and ends with 'h' (e.g., 'Smith', 'Smyth')?",
        "options": [
          "SELECT * FROM Customers WHERE last_name LIKE 'Sm%h';",
          "SELECT * FROM Customers WHERE last_name = 'Sm*h';",
          "SELECT * FROM Customers WHERE last_name LIKE 'Sm_h';",
          "SELECT * FROM Customers WHERE last_name IN ('Sm', 'h');"
        ],
        "correct": 0,
        "explanation": "`LIKE 'Sm%h'` matches strings starting with 'Sm', followed by any sequence of characters (`%`), ending with 'h'."
      },
      {
        "id": 16,
        "difficulty": "query",
        "type": "coding",
        "question": "Which query correctly returns the top 3 highest-earning employees in Department 10, sorting ties by hire_date ascending?",
        "options": [
          "SELECT * FROM Employees\nWHERE dept_id = 10\nORDER BY salary DESC, hire_date ASC\nLIMIT 3;",
          "SELECT * FROM Employees\nWHERE dept_id = 10\nORDER BY salary ASC, hire_date DESC\nLIMIT 3;",
          "SELECT TOP 3 * FROM Employees\nWHERE dept_id = 10\nSORT BY salary DESC;",
          "SELECT * FROM Employees\nORDER BY dept_id = 10\nLIMIT 3;"
        ],
        "correct": 0,
        "explanation": "Option A filters by `dept_id = 10`, orders primary sort by `salary DESC`, secondary sort by `hire_date ASC`, and limits output to 3 rows."
      },
      {
        "id": 17,
        "difficulty": "query",
        "type": "coding",
        "question": "Which SQL query retrieves all products where the product code has exactly 4 characters, starting with 'A' and ending with a digit (e.g., 'A123', 'AB89')?",
        "options": [
          "SELECT * FROM Products WHERE product_code LIKE 'A__%' AND product_code REGEXP '[0-9]$';",
          "SELECT * FROM Products WHERE product_code LIKE 'A___';",
          "SELECT * FROM Products WHERE product_code LIKE 'A%_';",
          "SELECT * FROM Products WHERE LENGTH(product_code) = 4 AND product_code LIKE 'A%[0-9]';"
        ],
        "correct": 3,
        "explanation": "Checking `LENGTH(product_code) = 4` with `LIKE 'A%[0-9]'` (or checking exact character count with wildcards) guarantees the 4-character length and starting/ending character constraints."
      },
      {
        "id": 18,
        "difficulty": "query",
        "type": "coding",
        "question": "Which query retrieves active users located in either 'NY', 'CA', or 'TX' who registered in the year 2023?",
        "options": [
          "SELECT * FROM Users\nWHERE status = 'ACTIVE'\n  AND state IN ('NY', 'CA', 'TX')\n  AND registration_date BETWEEN '2023-01-01' AND '2023-12-31';",
          "SELECT * FROM Users\nWHERE status = 'ACTIVE' OR state IN ('NY', 'CA', 'TX') AND registration_date = '2023';",
          "SELECT * FROM Users\nWHERE state = 'NY', 'CA', 'TX' AND status = 'ACTIVE';",
          "SELECT * FROM Users\nWHERE state LIKE 'NY|CA|TX' AND registration_date = 2023;"
        ],
        "correct": 0,
        "explanation": "Option A uses `AND` to combine all conditions, `IN ('NY', 'CA', 'TX')` for multi-value state matching, and `BETWEEN` for the full 2023 date window."
      },
      {
        "id": 19,
        "difficulty": "query",
        "type": "coding",
        "question": "Which query correctly escapes an actual underscore character `_` to search for items with discount code like 'SAVE_10'?",
        "options": [
          "SELECT * FROM Discounts WHERE code LIKE 'SAVE\\_10' ESCAPE '\\';",
          "SELECT * FROM Discounts WHERE code LIKE 'SAVE_10';",
          "SELECT * FROM Discounts WHERE code = 'SAVE%10';",
          "SELECT * FROM Discounts WHERE code LIKE 'SAVE[_]10';"
        ],
        "correct": 0,
        "explanation": "In ANSI SQL, using `ESCAPE '\\'` tells the parser that `\\_` is a literal underscore rather than the single-character wildcard."
      },
      {
        "id": 20,
        "difficulty": "query",
        "type": "coding",
        "question": "Which query implements pagination to display 'Page 3' of an employee directory with 20 items per page, sorted by last_name?",
        "options": [
          "SELECT * FROM Employees\nORDER BY last_name ASC\nOFFSET 40 ROWS FETCH NEXT 20 ROWS ONLY;",
          "SELECT * FROM Employees\nORDER BY last_name ASC\nLIMIT 20 OFFSET 60;",
          "SELECT * FROM Employees\nORDER BY last_name ASC\nPAGE 3 SIZE 20;",
          "SELECT * FROM Employees\nWHERE ROW_NUMBER = 3\nLIMIT 20;"
        ],
        "correct": 0,
        "explanation": "For Page 3 with Page Size 20, the offset is `(Page - 1) * Size = (3 - 1) * 20 = 40`. `OFFSET 40 ROWS FETCH NEXT 20 ROWS ONLY` (or `LIMIT 20 OFFSET 40`) fetches records 41–60."
      }
    ]
  },
  "part5": {
    "title": "Chapter 5 Mastery Quiz: NULL · Functions · CAST",
    "subtitle": "Master SQL Three-Valued Logic, NULL handling (COALESCE, NVL, NULLIF), String, Math, Date functions, and type conversions.",
    "questions": [
      {
        "id": 1,
        "difficulty": "easy",
        "type": "theory",
        "question": "What are the three logical truth values in SQL Three-Valued Logic (3VL)?",
        "options": [
          "TRUE, FALSE, and UNKNOWN",
          "TRUE, FALSE, and VOID",
          "1, 0, and -1",
          "YES, NO, and MAYBE"
        ],
        "correct": 0,
        "explanation": "SQL uses Three-Valued Logic where boolean expressions evaluate to TRUE, FALSE, or UNKNOWN (resulting from comparisons involving NULL)."
      },
      {
        "id": 2,
        "difficulty": "easy",
        "type": "theory",
        "question": "What does the function `COALESCE(val1, val2, val3)` return?",
        "options": [
          "The count of all non-null values.",
          "The first non-null expression from the evaluated list, or NULL if all arguments are NULL.",
          "The concatenated string of all values.",
          "The highest numerical value."
        ],
        "correct": 1,
        "explanation": "COALESCE evaluates arguments in sequence and returns the first non-null value encountered. If all arguments are null, it returns NULL."
      },
      {
        "id": 3,
        "difficulty": "easy",
        "type": "theory",
        "question": "What does `NULLIF(arg1, arg2)` return if arg1 is equal to arg2?",
        "options": [
          "arg1",
          "0",
          "NULL",
          "TRUE"
        ],
        "correct": 2,
        "explanation": "NULLIF returns NULL if its two arguments are equal; otherwise, it returns the first argument. It is commonly used to prevent division-by-zero errors."
      },
      {
        "id": 4,
        "difficulty": "easy",
        "type": "theory",
        "question": "Which ANSI SQL function converts a string to all uppercase characters?",
        "options": [
          "CAPITALIZE()",
          "TO_UPPER()",
          "UPPER()",
          "UCASE_ALL()"
        ],
        "correct": 2,
        "explanation": "UPPER() is the standard ANSI SQL string function that converts all characters in a string to uppercase."
      },
      {
        "id": 5,
        "difficulty": "easy",
        "type": "theory",
        "question": "Which SQL function returns the character length of a string?",
        "options": [
          "COUNT()",
          "LENGTH()",
          "SIZE()",
          "STR_CHARS()"
        ],
        "correct": 1,
        "explanation": "LENGTH() (or LEN() in SQL Server) returns the number of characters in a given string expression."
      },
      {
        "id": 6,
        "difficulty": "easy",
        "type": "theory",
        "question": "What is the purpose of the `CAST(expression AS data_type)` function?",
        "options": [
          "To explicitly convert an expression from one data type to another.",
          "To broadcast changes to read replicas.",
          "To format dates into HTML.",
          "To encrypt sensitive data."
        ],
        "correct": 0,
        "explanation": "CAST is the standard SQL function used for explicit type conversion (e.g. `CAST('2023-01-01' AS DATE)` or `CAST(score AS DECIMAL(5,2))`."
      },
      {
        "id": 7,
        "difficulty": "easy",
        "type": "theory",
        "question": "What does `SELECT NULL + 10;` evaluate to in ANSI SQL?",
        "options": [
          "10",
          "0",
          "NULL",
          "Throws an arithmetic error"
        ],
        "correct": 2,
        "explanation": "In SQL arithmetic, any operation involving NULL yields NULL (representing an unknown quantity: unknown + 10 = unknown)."
      },
      {
        "id": 8,
        "difficulty": "medium",
        "type": "theory",
        "question": "Table Users has status values 'ACTIVE', 'SUSPENDED', and NULL. Why does `SELECT * FROM Users WHERE status <> 'ACTIVE'` NOT return rows where status is NULL?",
        "options": [
          "Because status <> 'ACTIVE' evaluates to UNKNOWN for NULL rows, and WHERE only accepts rows that evaluate strictly to TRUE.",
          "Because NULL values are automatically converted to 'ACTIVE'.",
          "Because <> does not work on text columns.",
          "Because the query optimizer skips unindexed rows."
        ],
        "correct": 0,
        "explanation": "Classic SQL trap: `NULL <> 'ACTIVE'` evaluates to UNKNOWN. The WHERE clause filters out both FALSE and UNKNOWN results. To include NULLs, use `WHERE status <> 'ACTIVE' OR status IS NULL`."
      },
      {
        "id": 9,
        "difficulty": "medium",
        "type": "theory",
        "question": "How does `COALESCE` differ from dialect-specific `NVL(a, b)` or `IFNULL(a, b)`?",
        "options": [
          "COALESCE can only take two arguments.",
          "COALESCE is ANSI SQL compliant, supports arbitrary argument counts, and short-circuits (stops evaluating as soon as a non-null is found).",
          "NVL supports short-circuiting while COALESCE evaluates all expressions.",
          "COALESCE only works on integers."
        ],
        "correct": 1,
        "explanation": "COALESCE is the standard ANSI SQL solution. It accepts 2 or more arguments and short-circuits. In contrast, Oracle's NVL takes exactly two arguments and evaluates both arguments unconditionally."
      },
      {
        "id": 10,
        "difficulty": "medium",
        "type": "theory",
        "question": "What is the mathematical difference between `ROUND(15.786, 2)` and `TRUNC(15.786, 2)`?",
        "options": [
          "ROUND produces 15.79 (rounds to nearest fractional increment), while TRUNC produces 15.78 (chops off digits without rounding).",
          "ROUND deletes the fractional part entirely.",
          "TRUNC rounds upwards to the nearest integer.",
          "They produce identical results."
        ],
        "correct": 0,
        "explanation": "ROUND rounds mathematically to the nearest precision point (15.79), whereas TRUNC (or TRUNCATE) simply discards fractional digits past the specified precision (15.78)."
      },
      {
        "id": 11,
        "difficulty": "medium",
        "type": "theory",
        "question": "Why is `SELECT total / NULLIF(item_count, 0) FROM Sales;` superior to plain `SELECT total / item_count FROM Sales;`?",
        "options": [
          "It speeds up arithmetic operations using GPU acceleration.",
          "It prevents fatal 'division by zero' runtime errors by turning divisor 0 into NULL, which cleanly yields NULL.",
          "It converts integer division into floating point division automatically.",
          "It rounds the answer to 2 decimal places."
        ],
        "correct": 1,
        "explanation": "If item_count is 0, `NULLIF(item_count, 0)` returns NULL. In SQL, `total / NULL` evaluates cleanly to NULL instead of crashing the query with a fatal division-by-zero exception."
      },
      {
        "id": 12,
        "difficulty": "medium",
        "type": "theory",
        "question": "What does the expression `SUBSTRING('DATABASE_SYSTEM', 5, 4)` return in 1-indexed ANSI SQL?",
        "options": [
          "'BASE'",
          "'ATAB'",
          "'ASE_'",
          "'BASE_'"
        ],
        "correct": 0,
        "explanation": "In standard SQL, string indexes are 1-based. Starting at position 5 ('B') for a length of 4 characters extracts 'B-A-S-E'."
      },
      {
        "id": 13,
        "difficulty": "medium",
        "type": "theory",
        "question": "What is the difference between explicit type casting with `CAST()` vs implicit type conversion?",
        "options": [
          "Implicit conversion is faster and guaranteed to be error-free.",
          "Implicit conversion relies on RDBMS coercion rules that can cause silent performance degradation (index invalidation) or conversion failures; CAST ensures deterministic types.",
          "CAST is only permitted in stored procedures.",
          "Implicit conversion converts everything to VARCHAR."
        ],
        "correct": 1,
        "explanation": "Implicit type conversion (e.g. comparing a VARCHAR column to an INT literal) can prevent the optimizer from using B-Tree indexes (index suppression) and cause unexpected runtime conversion failures."
      },
      {
        "id": 14,
        "difficulty": "medium",
        "type": "theory",
        "question": "What does `SELECT CASE WHEN NULL = NULL THEN 'EQUAL' ELSE 'NOT EQUAL' END;` return?",
        "options": [
          "'EQUAL'",
          "'NOT EQUAL'",
          "NULL",
          "Syntax Error"
        ],
        "correct": 1,
        "explanation": "`NULL = NULL` evaluates to UNKNOWN. In a CASE statement, `WHEN` triggers only if the condition evaluates to TRUE. Since it is UNKNOWN, control flows to the `ELSE` branch, returning 'NOT EQUAL'."
      },
      {
        "id": 15,
        "difficulty": "query",
        "type": "coding",
        "question": "Which query calculates total compensation by safely adding salary and bonus, treating NULL bonus as $0?",
        "options": [
          "SELECT emp_name, salary + COALESCE(bonus, 0) AS total_comp FROM Employees;",
          "SELECT emp_name, salary + bonus AS total_comp FROM Employees;",
          "SELECT emp_name, IF(bonus IS NULL, salary, salary + bonus) FROM Employees;",
          "SELECT emp_name, SUM(salary, bonus) FROM Employees;"
        ],
        "correct": 0,
        "explanation": "If bonus is NULL, `salary + bonus` produces NULL. `COALESCE(bonus, 0)` replaces NULL with 0, ensuring `salary + 0 = salary`."
      },
      {
        "id": 16,
        "difficulty": "query",
        "type": "coding",
        "question": "Which SQL query extracts just the domain name from an email column (e.g. 'alice@company.com' -> 'company.com') using ANSI functions?",
        "options": [
          "SELECT SUBSTRING(email FROM POSITION('@' IN email) + 1) AS domain FROM Users;",
          "SELECT EXTRACT(DOMAIN FROM email) FROM Users;",
          "SELECT SPLIT(email, '@')[1] FROM Users;",
          "SELECT TRIM('@' FROM email) FROM Users;"
        ],
        "correct": 0,
        "explanation": "`POSITION('@' IN email)` finds the index of '@'. `SUBSTRING(email FROM POSITION('@' IN email) + 1)` slices from the character immediately following '@' to the end."
      },
      {
        "id": 17,
        "difficulty": "query",
        "type": "coding",
        "question": "Which query safely formats a numeric price column `149.9` into formatted currency string '$149.90'?",
        "options": [
          "SELECT CONCAT('$', CAST(ROUND(price, 2) AS DECIMAL(10,2))) FROM Products;",
          "SELECT '$' + price FROM Products;",
          "SELECT FORMAT_MONEY(price) FROM Products;",
          "SELECT price AS '$0.00' FROM Products;"
        ],
        "correct": 0,
        "explanation": "Using CONCAT with explicit DECIMAL casting and rounding provides portable string formatting across SQL dialects."
      },
      {
        "id": 18,
        "difficulty": "query",
        "type": "coding",
        "question": "Which query masks a credit card number `card_num` ('1234567812345678') to show only the last 4 digits (e.g. '************5678')?",
        "options": [
          "SELECT CONCAT('************', SUBSTRING(card_num FROM LENGTH(card_num) - 3)) FROM Cards;",
          "SELECT MASK(card_num, 4) FROM Cards;",
          "SELECT HIDE(card_num) + RIGHT(card_num, 4) FROM Cards;",
          "SELECT card_num LIKE '%5678' FROM Cards;"
        ],
        "correct": 0,
        "explanation": "Concatenating 12 asterisks with `SUBSTRING(card_num FROM LENGTH(card_num) - 3)` extracts the final 4 characters."
      },
      {
        "id": 19,
        "difficulty": "query",
        "type": "coding",
        "question": "Which query categorizes employee performance scores into tiers: 'High' (score >= 90), 'Medium' (score >= 70), 'Low' (score < 70), or 'Unrated' (if score IS NULL)?",
        "options": [
          "SELECT emp_name,\n  CASE\n    WHEN score >= 90 THEN 'High'\n    WHEN score >= 70 THEN 'Medium'\n    WHEN score < 70  THEN 'Low'\n    ELSE 'Unrated'\n  END AS performance_tier\nFROM Evaluations;",
          "SELECT emp_name, IF(score >= 90, 'High', 'Medium', 'Low') FROM Evaluations;",
          "SELECT emp_name, CHOOSE(score, 'High', 'Medium', 'Low') FROM Evaluations;",
          "SELECT emp_name, SWITCH(score) FROM Evaluations;"
        ],
        "correct": 0,
        "explanation": "A searched `CASE` expression evaluates conditions in order. If score is NULL, all comparison conditions evaluate to UNKNOWN, cleanly triggering the `ELSE 'Unrated'` fallback."
      },
      {
        "id": 20,
        "difficulty": "query",
        "type": "coding",
        "question": "Which query checks whether an order was placed within the last 30 days relative to `CURRENT_DATE`?",
        "options": [
          "SELECT * FROM Orders WHERE order_date >= CURRENT_DATE - INTERVAL '30' DAY;",
          "SELECT * FROM Orders WHERE order_date = LAST_30_DAYS();",
          "SELECT * FROM Orders WHERE DATEDIFF(order_date, 30);",
          "SELECT * FROM Orders WHERE order_date > '30 DAYS';"
        ],
        "correct": 0,
        "explanation": "Standard ANSI SQL date arithmetic uses `CURRENT_DATE - INTERVAL '30' DAY` (or `DATE_SUB` in MySQL) to compute the cutoff timestamp."
      }
    ]
  },
  "part6": {
    "title": "Chapter 6 Mastery Quiz: GROUP BY · HAVING",
    "subtitle": "Master SQL aggregation functions (COUNT, SUM, AVG, MIN, MAX), multi-column grouping, and the critical distinction between WHERE and HAVING.",
    "questions": [
      {
        "id": 1,
        "difficulty": "easy",
        "type": "theory",
        "question": "What is the primary role of the `GROUP BY` clause in SQL?",
        "options": [
          "To sort query output in descending order.",
          "To collapse multiple rows sharing the same values into summary groups for aggregation.",
          "To join two tables together without keys.",
          "To delete duplicate rows from disk."
        ],
        "correct": 1,
        "explanation": "`GROUP BY` collects rows with identical values in specified columns into summary rows, enabling aggregate functions (COUNT, SUM, AVG) to calculate metrics per group."
      },
      {
        "id": 2,
        "difficulty": "easy",
        "type": "theory",
        "question": "What is the key difference between `COUNT(*)` and `COUNT(column_name)`?",
        "options": [
          "COUNT(*) only counts primary keys.",
          "COUNT(*) counts all rows including those with NULLs, whereas COUNT(column_name) counts only rows where that specific column is NOT NULL.",
          "COUNT(column_name) is twice as fast as COUNT(*).",
          "COUNT(*) counts duplicate rows, while COUNT(column_name) automatically eliminates duplicates."
        ],
        "correct": 1,
        "explanation": "`COUNT(*)` counts the total number of rows in the table/group regardless of NULLs. `COUNT(col)` ignores rows where `col` is NULL."
      },
      {
        "id": 3,
        "difficulty": "easy",
        "type": "theory",
        "question": "Which clause filters individual rows BEFORE grouping and aggregation occur?",
        "options": [
          "HAVING",
          "WHERE",
          "FILTER",
          "LIMIT"
        ],
        "correct": 1,
        "explanation": "`WHERE` filters source rows before groups are formed. `HAVING` filters aggregated groups after `GROUP BY` has evaluated."
      },
      {
        "id": 4,
        "difficulty": "easy",
        "type": "theory",
        "question": "Which clause filters summary groups AFTER aggregation has taken place?",
        "options": [
          "HAVING",
          "WHERE",
          "QUALIFY",
          "ORDER BY"
        ],
        "correct": 0,
        "explanation": "`HAVING` applies filtering conditions to the aggregated result groups generated by `GROUP BY`."
      },
      {
        "id": 5,
        "difficulty": "easy",
        "type": "theory",
        "question": "Which aggregate function calculates the arithmetic average of numeric values in a group?",
        "options": [
          "MEAN()",
          "AVG()",
          "MEDIAN()",
          "AVERAGE()"
        ],
        "correct": 1,
        "explanation": "`AVG()` is the standard ANSI SQL aggregate function that computes the arithmetic mean of non-null values."
      },
      {
        "id": 6,
        "difficulty": "easy",
        "type": "theory",
        "question": "What does `SUM(salary)` return if every row in a group has a NULL salary?",
        "options": [
          "0",
          "NULL",
          "An exception is thrown",
          "-1"
        ],
        "correct": 1,
        "explanation": "ANSI SQL standard mandates that aggregate functions (except COUNT) return NULL if the group contains no non-null values."
      },
      {
        "id": 7,
        "difficulty": "easy",
        "type": "theory",
        "question": "Can the `HAVING` clause be used in a query that has NO `GROUP BY` clause?",
        "options": [
          "No, HAVING is a syntax error without GROUP BY.",
          "Yes, the query treats the entire table as a single aggregate group.",
          "Only if the table has fewer than 100 rows.",
          "Only in MySQL, never in PostgreSQL."
        ],
        "correct": 1,
        "explanation": "In SQL, a query with aggregate functions and a HAVING clause without GROUP BY is valid; it treats the entire dataset as one single group."
      },
      {
        "id": 8,
        "difficulty": "medium",
        "type": "theory",
        "question": "Why does `SELECT dept_id, emp_name, AVG(salary) FROM Employees GROUP BY dept_id;` fail in standard SQL?",
        "options": [
          "AVG() cannot be used with integers.",
          "emp_name is neither present in the GROUP BY clause nor enclosed within an aggregate function, creating an ambiguous 1-to-many projection.",
          "dept_id must be indexed first.",
          "The query requires a HAVING clause."
        ],
        "correct": 1,
        "explanation": "SQL Single-Value Rule: every column in the SELECT projection must either appear in the GROUP BY clause or be inside an aggregate function. Since a department has multiple employee names, SQL cannot determine which single name to display."
      },
      {
        "id": 9,
        "difficulty": "medium",
        "type": "theory",
        "question": "Why does `SELECT dept_id, SUM(salary) FROM Employees WHERE SUM(salary) > 100000 GROUP BY dept_id;` produce a syntax error?",
        "options": [
          "WHERE clauses cannot contain aggregate functions because WHERE executes before rows are grouped and aggregated.",
          "SUM() only works with HAVING in Oracle.",
          "dept_id cannot be combined with SUM.",
          "100000 must be in quotes."
        ],
        "correct": 0,
        "explanation": "Because `WHERE` executes before groups are formed, aggregates do not exist yet during WHERE evaluation. To filter on aggregate conditions, use `HAVING SUM(salary) > 100000`."
      },
      {
        "id": 10,
        "difficulty": "medium",
        "type": "theory",
        "question": "How does `GROUP BY` handle NULL values in the grouping column?",
        "options": [
          "Rows with NULL are ignored and dropped from the output.",
          "All rows with NULL in the grouping column are gathered together into a single group.",
          "Each NULL creates its own separate individual group.",
          "The query throws a NullPointerException."
        ],
        "correct": 1,
        "explanation": "For the purposes of `GROUP BY`, all NULL values are considered equal and grouped together into a single summary row."
      },
      {
        "id": 11,
        "difficulty": "medium",
        "type": "theory",
        "question": "From a performance standpoint, when should a filter be placed in `WHERE` rather than `HAVING`?",
        "options": [
          "Always in HAVING for cleaner code.",
          "Whenever the filter condition applies to individual unaggregated columns, place it in WHERE so the database discards unwanted rows early before expensive grouping and aggregation.",
          "WHERE and HAVING have identical performance in all cases.",
          "Only when using indexes."
        ],
        "correct": 1,
        "explanation": "Performance best practice: filter as early as possible in `WHERE` to minimize the number of rows that must be sorted and aggregated in memory."
      },
      {
        "id": 12,
        "difficulty": "medium",
        "type": "theory",
        "question": "What does `COUNT(DISTINCT category)` compute?",
        "options": [
          "The total number of rows in the table.",
          "The number of unique, non-null values present in the category column.",
          "The number of duplicate categories.",
          "The maximum category length."
        ],
        "correct": 1,
        "explanation": "`COUNT(DISTINCT col)` counts each unique non-null value exactly once, ignoring duplicates and nulls."
      },
      {
        "id": 13,
        "difficulty": "medium",
        "type": "theory",
        "question": "When grouping by multiple columns: `GROUP BY department, job_title`, what does each output row represent?",
        "options": [
          "A separate row for each department, ignoring job title.",
          "A unique combination of both department and job_title.",
          "A Cartesian cross product of unrelated columns.",
          "Two separate result sets merged."
        ],
        "correct": 1,
        "explanation": "Multi-column grouping forms groups based on the unique combination of values across all specified grouping columns."
      },
      {
        "id": 14,
        "difficulty": "medium",
        "type": "theory",
        "question": "What does `SELECT department, COUNT(*) FROM Employees GROUP BY department HAVING COUNT(*) = 1;` find?",
        "options": [
          "Departments with only 1 employee (singletons).",
          "The first department in alphabetical order.",
          "All employees who joined in year 1.",
          "Departments with zero employees."
        ],
        "correct": 0,
        "explanation": "Grouping by department and filtering with `HAVING COUNT(*) = 1` isolates departments that have exactly one single employee."
      },
      {
        "id": 15,
        "difficulty": "query",
        "type": "coding",
        "question": "Which SQL query finds departments with more than 5 employees and an average salary greater than $60,000?",
        "options": [
          "SELECT dept_id, COUNT(*) AS emp_count, AVG(salary) AS avg_sal\nFROM Employees\nGROUP BY dept_id\nHAVING COUNT(*) > 5 AND AVG(salary) > 60000;",
          "SELECT dept_id, COUNT(*), AVG(salary)\nFROM Employees\nWHERE COUNT(*) > 5 AND AVG(salary) > 60000\nGROUP BY dept_id;",
          "SELECT dept_id FROM Employees\nGROUP BY dept_id\nWHERE AVG(salary) > 60000;",
          "SELECT dept_id, AVG(salary) FROM Employees\nHAVING COUNT(*) > 5;"
        ],
        "correct": 0,
        "explanation": "Option A properly groups by `dept_id` and uses `HAVING` with logical `AND` to filter on both aggregate metrics (`COUNT(*) > 5` and `AVG(salary) > 60000`)."
      },
      {
        "id": 16,
        "difficulty": "query",
        "type": "coding",
        "question": "Which query calculates total sales revenue per region, but only counts completed orders placed in 2023?",
        "options": [
          "SELECT region, SUM(amount) AS total_revenue\nFROM Orders\nWHERE status = 'COMPLETED' AND order_date BETWEEN '2023-01-01' AND '2023-12-31'\nGROUP BY region;",
          "SELECT region, SUM(amount) AS total_revenue\nFROM Orders\nGROUP BY region\nHAVING status = 'COMPLETED';",
          "SELECT region, SUM(amount) FROM Orders\nWHERE SUM(amount) > 0\nGROUP BY region;",
          "SELECT region, TOTAL(amount) FROM Orders\nGROUP BY region;"
        ],
        "correct": 0,
        "explanation": "Option A uses `WHERE` to pre-filter rows before grouping by `region`, which is both syntactically correct and optimal for performance."
      },
      {
        "id": 17,
        "difficulty": "query",
        "type": "coding",
        "question": "Which query identifies duplicate email addresses in a `Customers` table, showing the email and how many times it appears?",
        "options": [
          "SELECT email, COUNT(*) AS duplicate_count\nFROM Customers\nGROUP BY email\nHAVING COUNT(*) > 1;",
          "SELECT DISTINCT email, COUNT(*) FROM Customers;",
          "SELECT email FROM Customers WHERE COUNT(email) > 1;",
          "SELECT email FROM Customers GROUP BY email WHERE duplicate = TRUE;"
        ],
        "correct": 0,
        "explanation": "The standard SQL pattern to isolate duplicates is `GROUP BY <column> HAVING COUNT(*) > 1`."
      },
      {
        "id": 18,
        "difficulty": "query",
        "type": "coding",
        "question": "Which query finds the minimum and maximum salary in each department, ordered by the salary difference (spread) descending?",
        "options": [
          "SELECT dept_id, MIN(salary) AS min_sal, MAX(salary) AS max_sal,\n       (MAX(salary) - MIN(salary)) AS salary_spread\nFROM Employees\nGROUP BY dept_id\nORDER BY salary_spread DESC;",
          "SELECT dept_id, SPREAD(salary) FROM Employees GROUP BY dept_id;",
          "SELECT dept_id, MIN(salary), MAX(salary) FROM Employees ORDER BY MAX(salary) - MIN(salary);",
          "SELECT dept_id, MAX(salary) - MIN(salary) FROM Employees;"
        ],
        "correct": 0,
        "explanation": "Option A groups by `dept_id`, computes both `MIN` and `MAX`, and calculates the arithmetic difference in the SELECT/ORDER BY projection."
      },
      {
        "id": 19,
        "difficulty": "query",
        "type": "coding",
        "question": "Which query calculates the count of products and average price for each category, but excludes categories that have fewer than 3 products?",
        "options": [
          "SELECT category, COUNT(*) AS total_products, AVG(price) AS avg_price\nFROM Products\nGROUP BY category\nHAVING COUNT(*) >= 3;",
          "SELECT category, COUNT(*), AVG(price) FROM Products\nWHERE COUNT(*) >= 3\nGROUP BY category;",
          "SELECT category, COUNT(*) FROM Products\nGROUP BY category\nHAVING price >= 3;",
          "SELECT category FROM Products GROUP BY category LIMIT 3;"
        ],
        "correct": 0,
        "explanation": "Using `GROUP BY category HAVING COUNT(*) >= 3` properly eliminates small categories with under 3 items."
      },
      {
        "id": 20,
        "difficulty": "query",
        "type": "coding",
        "question": "Which query groups sales by both Year and Quarter, sorting chronologically?",
        "options": [
          "SELECT EXTRACT(YEAR FROM sale_date) AS yr,\n       EXTRACT(QUARTER FROM sale_date) AS qtr,\n       SUM(amount) AS total_sales\nFROM Sales\nGROUP BY EXTRACT(YEAR FROM sale_date), EXTRACT(QUARTER FROM sale_date)\nORDER BY yr ASC, qtr ASC;",
          "SELECT sale_date, SUM(amount) FROM Sales GROUP BY YEAR, QUARTER;",
          "SELECT YEAR(sale_date), QUARTER(sale_date) FROM Sales ORDER BY sale_date;",
          "SELECT sale_date FROM Sales GROUP BY ALL;"
        ],
        "correct": 0,
        "explanation": "Multi-column grouping by year and quarter extracts both temporal units and orders output chronologically."
      }
    ]
  },
  "part7": {
    "title": "Chapter 7 Mastery Quiz: All SQL Joins · Self Join",
    "subtitle": "Master relational table connections: INNER JOIN, LEFT/RIGHT OUTER JOIN, FULL OUTER JOIN, CROSS JOIN, and recursive SELF JOINs.",
    "questions": [
      {
        "id": 1,
        "difficulty": "easy",
        "type": "theory",
        "question": "What does an `INNER JOIN` between Table A and Table B return?",
        "options": [
          "All rows from Table A, regardless of matches in Table B.",
          "Only rows where there is a matching value in both Table A and Table B based on the join predicate.",
          "A Cartesian cross product of both tables.",
          "All rows from both tables, filling missing sides with NULL."
        ],
        "correct": 1,
        "explanation": "An INNER JOIN returns only rows where the join predicate is satisfied in both participating tables. Unmatched rows from either table are omitted."
      },
      {
        "id": 2,
        "difficulty": "easy",
        "type": "theory",
        "question": "What does a `LEFT JOIN` (Left Outer Join) produce when a row in the left table has no matching row in the right table?",
        "options": [
          "The left row is dropped from the result set.",
          "The left row is included, with NULL values in all columns corresponding to the right table.",
          "The database throws a Foreign Key mismatch error.",
          "The query halts with an exception."
        ],
        "correct": 1,
        "explanation": "A LEFT JOIN preserves every row from the left table. If no match exists in the right table, columns from the right table are filled with NULL."
      },
      {
        "id": 3,
        "difficulty": "easy",
        "type": "theory",
        "question": "What is a `CROSS JOIN`?",
        "options": [
          "A join that matches records across different databases.",
          "A join that produces the Cartesian Product, pairing every row from Table A with every row from Table B.",
          "A join that only works on intersecting primary keys.",
          "A join that automatically filters duplicate rows."
        ],
        "correct": 1,
        "explanation": "A CROSS JOIN produces a Cartesian product: if Table A has M rows and Table B has N rows, the result has M × N rows."
      },
      {
        "id": 4,
        "difficulty": "easy",
        "type": "theory",
        "question": "What is a `SELF JOIN`?",
        "options": [
          "A join between a table and its own backup copy.",
          "A regular join where a table is joined with itself using distinct table aliases.",
          "A query that joins every column to every other column in the same row.",
          "An automated index defragmentation command."
        ],
        "correct": 1,
        "explanation": "A SELF JOIN is a regular join in which a table is joined to itself (for example, matching employees to their managers within a single `Employees` table) using distinct table aliases."
      },
      {
        "id": 5,
        "difficulty": "easy",
        "type": "theory",
        "question": "Which join returns all rows from both tables, matching rows where possible and supplying NULL for unmatched rows on either side?",
        "options": [
          "FULL OUTER JOIN",
          "INNER JOIN",
          "CROSS JOIN",
          "NATURAL JOIN"
        ],
        "correct": 0,
        "explanation": "A FULL OUTER JOIN preserves all rows from both participating tables, filling missing matching data with NULLs on whichever side lacks a counterpart."
      },
      {
        "id": 6,
        "difficulty": "easy",
        "type": "theory",
        "question": "Why are table aliases (e.g. `FROM Customers c JOIN Orders o ON c.id = o.cust_id`) strongly recommended when joining tables?",
        "options": [
          "Table aliases are mandatory by the SQL parser.",
          "They make queries concise and disambiguate identically named columns between tables.",
          "They force the database to use index lookups.",
          "They bypass table-level read locks."
        ],
        "correct": 1,
        "explanation": "Aliases simplify long table names and prevent 'ambiguous column name' errors when both tables contain columns with the same name (such as `id` or `created_at`)."
      },
      {
        "id": 7,
        "difficulty": "easy",
        "type": "theory",
        "question": "What is a `RIGHT JOIN` logically equivalent to?",
        "options": [
          "An INNER JOIN.",
          "A LEFT JOIN with the table positions swapped.",
          "A CROSS JOIN.",
          "A FULL JOIN without NULLs."
        ],
        "correct": 1,
        "explanation": "`A RIGHT JOIN B` returns all rows from B and matching rows from A. This is logically identical to `B LEFT JOIN A`."
      },
      {
        "id": 8,
        "difficulty": "medium",
        "type": "theory",
        "question": "Critical interview trap: What is the difference between placing a filter in the `ON` clause vs in the `WHERE` clause during a `LEFT JOIN`?",
        "options": [
          "They are completely identical in all scenarios.",
          "Placing the filter in the ON clause filters the right table BEFORE the join, preserving all left rows; placing it in the WHERE clause filters AFTER the join, which can inadvertently convert the LEFT JOIN into an INNER JOIN by discarding rows where the right column is NULL.",
          "Filters are never allowed in an ON clause.",
          "WHERE filters before joining, while ON filters after."
        ],
        "correct": 1,
        "explanation": "In a LEFT JOIN, conditions in the ON clause dictate what gets joined from the right table without discarding left table rows. A condition like `WHERE right_table.status = 'ACTIVE'` evaluates after the join and drops all rows with NULL, effectively converting the query into an INNER JOIN!"
      },
      {
        "id": 9,
        "difficulty": "medium",
        "type": "theory",
        "question": "Why is `NATURAL JOIN` widely considered an anti-pattern in production database development?",
        "options": [
          "Because it is not supported in ANSI SQL.",
          "Because it implicitly joins on ALL columns that share identical names between two tables; if a schema migration adds a common column (like `updated_at`), the join condition silently changes and breaks query logic.",
          "Because it executes in O(N^3) time.",
          "Because it requires tables to be in BCNF."
        ],
        "correct": 1,
        "explanation": "A NATURAL JOIN automatically matches every column with the same name across both tables. Adding common audit columns (e.g., `created_at` or `status`) causes the database to join on those columns as well, breaking existing application queries."
      },
      {
        "id": 10,
        "difficulty": "medium",
        "type": "theory",
        "question": "If Table A has 5 rows containing the value 1, and Table B has 4 rows containing the value 1, how many rows does `SELECT * FROM A INNER JOIN B ON A.val = B.val;` return?",
        "options": [
          "5 rows",
          "4 rows",
          "9 rows",
          "20 rows"
        ],
        "correct": 3,
        "explanation": "Relational joins match all combinations: 5 rows × 4 rows = 20 rows. Non-unique join keys can lead to unexpected 'row explosion' (Cartesian multiplication)."
      },
      {
        "id": 11,
        "difficulty": "medium",
        "type": "theory",
        "question": "How do two NULL values behave in a standard SQL join `ON a.col = b.col`?",
        "options": [
          "They match because NULL equals NULL in joins.",
          "They do NOT match because `NULL = NULL` evaluates to UNKNOWN in SQL.",
          "They trigger a runtime warning.",
          "They match only if both columns have identical data types."
        ],
        "correct": 1,
        "explanation": "In SQL three-valued logic, `NULL = NULL` evaluates to UNKNOWN. Therefore, rows where join columns are both NULL will never join together in an equality join predicate."
      },
      {
        "id": 12,
        "difficulty": "medium",
        "type": "theory",
        "question": "What is an 'Anti-Join' and how is it most commonly implemented using SQL joins?",
        "options": [
          "Joining tables with opposite primary keys.",
          "Returning rows from Table A that have NO match in Table B, typically implemented via `A LEFT JOIN B ON ... WHERE B.key IS NULL`.",
          "A CROSS JOIN followed by an EXCEPT operation.",
          "A join that reverses the primary key sequence."
        ],
        "correct": 1,
        "explanation": "An Anti-Join returns rows from the first table that do not exist in the second table. The canonical implementation is `LEFT JOIN ... WHERE right_table.key IS NULL`."
      },
      {
        "id": 13,
        "difficulty": "medium",
        "type": "theory",
        "question": "In an employee-manager hierarchy stored in `Employees(emp_id, emp_name, manager_id)`, what type of join ensures that the CEO (who has manager_id = NULL) is still returned?",
        "options": [
          "An INNER JOIN of Employees with itself.",
          "A LEFT JOIN of Employees (as employees) with Employees (as managers).",
          "A CROSS JOIN.",
          "A NATURAL JOIN."
        ],
        "correct": 1,
        "explanation": "An `INNER JOIN` drops the CEO because their `manager_id` is NULL. A `LEFT JOIN` preserves the CEO row, leaving their manager's name as NULL."
      },
      {
        "id": 14,
        "difficulty": "medium",
        "type": "theory",
        "question": "How can you emulate a `FULL OUTER JOIN` in database systems (like MySQL) that do not natively support the FULL OUTER JOIN syntax?",
        "options": [
          "`SELECT * FROM A CROSS JOIN B;`",
          "`(SELECT * FROM A LEFT JOIN B ON ...) UNION (SELECT * FROM A RIGHT JOIN B ON ...)`",
          "`SELECT * FROM A INNER JOIN B;`",
          "`SELECT * FROM A, B;`"
        ],
        "correct": 1,
        "explanation": "Taking the UNION (which eliminates duplicates) of a LEFT JOIN and a RIGHT JOIN produces the exact mathematical equivalent of a FULL OUTER JOIN."
      },
      {
        "id": 15,
        "difficulty": "query",
        "type": "coding",
        "question": "Which SQL query finds all customers who have NEVER placed any order (Anti-Join)?",
        "options": [
          "SELECT c.cust_id, c.cust_name\nFROM Customers c\nLEFT JOIN Orders o ON c.cust_id = o.cust_id\nWHERE o.order_id IS NULL;",
          "SELECT c.cust_id, c.cust_name\nFROM Customers c\nINNER JOIN Orders o ON c.cust_id = o.cust_id\nWHERE o.order_id IS NULL;",
          "SELECT * FROM Customers WHERE order_id = 0;",
          "SELECT c.cust_id FROM Customers c, Orders o WHERE c.cust_id != o.cust_id;"
        ],
        "correct": 0,
        "explanation": "A LEFT JOIN preserves all customers. For customers with zero orders, `o.order_id` is NULL. Filtering with `WHERE o.order_id IS NULL` isolates customers who have never ordered."
      },
      {
        "id": 16,
        "difficulty": "query",
        "type": "coding",
        "question": "Which query uses a Self-Join to display each employee's name alongside their manager's name from table `Employees(emp_id, name, manager_id)`?",
        "options": [
          "SELECT e.name AS employee_name, m.name AS manager_name\nFROM Employees e\nLEFT JOIN Employees m ON e.manager_id = m.emp_id;",
          "SELECT e.name, m.name FROM Employees e, Employees m WHERE e.emp_id = m.emp_id;",
          "SELECT name, manager_id FROM Employees;",
          "SELECT e.name, m.name FROM Employees e INNER JOIN Employees m ON e.emp_id = m.manager_id;"
        ],
        "correct": 0,
        "explanation": "Aliasing the table as `e` (employee) and `m` (manager) and joining `ON e.manager_id = m.emp_id` accurately matches each employee to their supervisor."
      },
      {
        "id": 17,
        "difficulty": "query",
        "type": "coding",
        "question": "Which query correctly joins three tables (`Customers`, `Orders`, `OrderItems`) to calculate total spending per customer?",
        "options": [
          "SELECT c.cust_name, SUM(oi.quantity * oi.unit_price) AS total_spent\nFROM Customers c\nJOIN Orders o ON c.cust_id = o.cust_id\nJOIN OrderItems oi ON o.order_id = oi.order_id\nGROUP BY c.cust_id, c.cust_name;",
          "SELECT c.cust_name, SUM(oi.unit_price) FROM Customers c, Orders o, OrderItems oi;",
          "SELECT c.cust_name FROM Customers c JOIN Orders o ON c.cust_id = o.cust_id;",
          "SELECT cust_name, SUM(quantity) FROM Customers NATURAL JOIN Orders NATURAL JOIN OrderItems;"
        ],
        "correct": 0,
        "explanation": "Chaining two explicit `JOIN` clauses connects Customers to Orders and Orders to OrderItems, allowing grouped aggregation on customer ID."
      },
      {
        "id": 18,
        "difficulty": "query",
        "type": "coding",
        "question": "Which query pairs all available shirts from `Shirts(color)` with all available sizes from `Sizes(size_label)` to generate all inventory SKUs?",
        "options": [
          "SELECT s.color, sz.size_label\nFROM Shirts s\nCROSS JOIN Sizes sz;",
          "SELECT s.color, sz.size_label\nFROM Shirts s\nINNER JOIN Sizes sz ON s.color = sz.size_label;",
          "SELECT * FROM Shirts UNION SELECT * FROM Sizes;",
          "SELECT s.color FROM Shirts s LEFT JOIN Sizes sz ON s.color IS NOT NULL;"
        ],
        "correct": 0,
        "explanation": "A `CROSS JOIN` creates the complete Cartesian product of colors and sizes, generating all possible color-size product variants."
      },
      {
        "id": 19,
        "difficulty": "query",
        "type": "coding",
        "question": "Which query displays all departments and their employee count, including departments that currently have 0 employees?",
        "options": [
          "SELECT d.dept_name, COUNT(e.emp_id) AS total_employees\nFROM Departments d\nLEFT JOIN Employees e ON d.dept_id = e.dept_id\nGROUP BY d.dept_id, d.dept_name;",
          "SELECT d.dept_name, COUNT(*) FROM Departments d\nINNER JOIN Employees e ON d.dept_id = e.dept_id\nGROUP BY d.dept_id, d.dept_name;",
          "SELECT d.dept_name, COUNT(*) FROM Departments d LEFT JOIN Employees e ON d.dept_id = e.dept_id;",
          "SELECT dept_name, (SELECT COUNT(*) FROM Employees) FROM Departments;"
        ],
        "correct": 0,
        "explanation": "Crucial detail: `LEFT JOIN` preserves departments with zero employees. Using `COUNT(e.emp_id)` correctly yields 0 for empty departments, whereas `COUNT(*)` would incorrectly return 1 (because the joined row contains NULLs)."
      },
      {
        "id": 20,
        "difficulty": "query",
        "type": "coding",
        "question": "Which Self-Join query finds distinct pairs of employees who work in the same department, avoiding duplicate swapped pairs (e.g. showing (Alice, Bob) but not (Bob, Alice))?",
        "options": [
          "SELECT e1.name AS emp1, e2.name AS emp2\nFROM Employees e1\nJOIN Employees e2 ON e1.dept_id = e2.dept_id AND e1.emp_id < e2.emp_id;",
          "SELECT e1.name, e2.name FROM Employees e1 JOIN Employees e2 ON e1.dept_id = e2.dept_id;",
          "SELECT e1.name, e2.name FROM Employees e1 JOIN Employees e2 ON e1.name != e2.name;",
          "SELECT DISTINCT name FROM Employees GROUP BY dept_id;"
        ],
        "correct": 0,
        "explanation": "Condition `e1.emp_id < e2.emp_id` simultaneously prevents an employee from pairing with themselves (`e1.emp_id = e2.emp_id`) AND prevents reversed duplicate pairs (`(Bob, Alice)` vs `(Alice, Bob)`)."
      }
    ]
  },
  "part8": {
    "title": "Chapter 8 Mastery Quiz: Subqueries · Set Ops",
    "subtitle": "Master Scalar & Correlated Subqueries, EXISTS vs IN, Subqueries in FROM/SELECT/WHERE, and Set Operations (UNION, INTERSECT, EXCEPT).",
    "questions": [
      {
        "id": 1,
        "difficulty": "easy",
        "type": "theory",
        "question": "What is a 'Scalar Subquery'?",
        "options": [
          "A subquery that runs on multiple database nodes in parallel.",
          "A subquery that returns exactly one single value (one row and one column).",
          "A subquery that returns a list of primary keys.",
          "A subquery that modifies table data."
        ],
        "correct": 1,
        "explanation": "A Scalar Subquery returns exactly one row with one column (a single atomic scalar value). It can be used anywhere a literal expression or column value is accepted."
      },
      {
        "id": 2,
        "difficulty": "easy",
        "type": "theory",
        "question": "What is the critical difference between `UNION` and `UNION ALL` in SQL?",
        "options": [
          "UNION ALL only works on integer columns.",
          "`UNION` removes duplicate rows from the combined result set (requiring an internal sort/hash), whereas `UNION ALL` retains all rows including duplicates and is significantly faster.",
          "UNION cannot combine results from different tables.",
          "UNION ALL can only combine two queries."
        ],
        "correct": 1,
        "explanation": "`UNION` merges datasets and performs duplicate elimination. `UNION ALL` simply concatenates result sets without deduplication, making it much more performant."
      },
      {
        "id": 3,
        "difficulty": "easy",
        "type": "theory",
        "question": "What does the `EXISTS` operator test?",
        "options": [
          "Whether a table exists in the database schema.",
          "Whether the subquery returns at least one row (evaluating to TRUE as soon as a single match is found).",
          "Whether all values in a column are non-null.",
          "Whether a disk file exists."
        ],
        "correct": 1,
        "explanation": "`EXISTS (subquery)` checks for the existence of rows. It returns TRUE as soon as the subquery produces at least one row, and FALSE if the subquery returns zero rows."
      },
      {
        "id": 4,
        "difficulty": "easy",
        "type": "theory",
        "question": "What does the `INTERSECT` set operator return?",
        "options": [
          "All rows from both queries.",
          "Only the distinct rows that are present in BOTH query results.",
          "Rows from the first query that do not exist in the second query.",
          "A Cartesian cross product."
        ],
        "correct": 1,
        "explanation": "`INTERSECT` returns only rows that appear in both the first and second query result sets."
      },
      {
        "id": 5,
        "difficulty": "easy",
        "type": "theory",
        "question": "What does the `EXCEPT` (or `MINUS` in Oracle) set operator return?",
        "options": [
          "Rows that exist in the first query result, but do NOT exist in the second query result.",
          "Rows that exist in either query but not both.",
          "All rows with syntax exceptions.",
          "Only rows that contain NULL values."
        ],
        "correct": 0,
        "explanation": "`EXCEPT` (or `MINUS`) performs set difference: it returns distinct rows that appear in Query 1, excluding any rows that appear in Query 2."
      },
      {
        "id": 6,
        "difficulty": "easy",
        "type": "theory",
        "question": "What structural requirement must queries satisfy to be combined with set operators (`UNION`, `INTERSECT`, `EXCEPT`)?",
        "options": [
          "Both queries must select from the same table name.",
          "Both queries must have the exact same number of columns in the same order, with compatible data types.",
          "Both tables must have identical primary keys.",
          "Both queries must have WHERE clauses."
        ],
        "correct": 1,
        "explanation": "Set operations require Union-Compatibility: each SELECT list must have the same number of columns, and corresponding columns must have compatible data types."
      },
      {
        "id": 7,
        "difficulty": "easy",
        "type": "theory",
        "question": "What is a subquery placed inside the `FROM` clause commonly called?",
        "options": [
          "A Scalar Subquery",
          "A Derived Table (or Inline View)",
          "A Recursive Trigger",
          "A Stored Procedure"
        ],
        "correct": 1,
        "explanation": "A subquery in the `FROM` clause acts as a temporary virtual table for the outer query and is known as a Derived Table (or Inline View). Standard SQL requires derived tables to have an alias."
      },
      {
        "id": 8,
        "difficulty": "medium",
        "type": "theory",
        "question": "What defines a 'Correlated Subquery'?",
        "options": [
          "A subquery that can run independently of the outer query.",
          "A subquery that references one or more columns from the outer query, causing it to be evaluated conceptually once for each row processed by the outer query.",
          "A subquery that runs in a separate thread.",
          "A subquery that only joins on foreign keys."
        ],
        "correct": 1,
        "explanation": "In a Correlated Subquery, the inner query references columns from the outer query. It cannot execute on its own because its evaluation depends on the current outer row."
      },
      {
        "id": 9,
        "difficulty": "medium",
        "type": "theory",
        "question": "Critical SQL trap: What happens when you execute `WHERE col NOT IN (SELECT other_col FROM TableB)` if `TableB` contains even a single NULL value in `other_col`?",
        "options": [
          "The query runs normally and ignores the NULL.",
          "The entire NOT IN expression evaluates to UNKNOWN for every single row, causing the query to return ZERO rows!",
          "The database throws a NullPointerException.",
          "The NULL is treated as 0."
        ],
        "correct": 1,
        "explanation": "Major SQL Gotcha: `NOT IN (1, 2, NULL)` expands to `col <> 1 AND col <> 2 AND col <> NULL`. Since `col <> NULL` is always UNKNOWN, the `AND` chain can never be TRUE. Consequently, `NOT IN` returns zero rows if the subquery contains any NULL! Use `NOT EXISTS` instead."
      },
      {
        "id": 10,
        "difficulty": "medium",
        "type": "theory",
        "question": "Why is `EXISTS` generally preferred over `IN` when evaluating subqueries against large tables?",
        "options": [
          "`IN` cannot be used with subqueries.",
          "`EXISTS` uses short-circuit evaluation (stops scanning as soon as the first matching row is found) and is immune to the NULL value trap of `NOT IN`.",
          "`EXISTS` stores results in a temporary hash table automatically.",
          "`EXISTS` requires less RAM."
        ],
        "correct": 1,
        "explanation": "`EXISTS` short-circuits on the first matching tuple and handles NULLs predictably. Furthermore, modern optimizers can efficiently decorrelate EXISTS into semi-joins."
      },
      {
        "id": 11,
        "difficulty": "medium",
        "type": "theory",
        "question": "How does the `ANY` (or `SOME`) operator behave when comparing with a subquery: `WHERE salary > ANY (SELECT salary FROM ...)`?",
        "options": [
          "The condition is true if salary is greater than the MINIMUM value returned by the subquery.",
          "The condition is true if salary is greater than every single value returned by the subquery.",
          "The condition is true only if salary matches the average.",
          "The subquery must return only 1 row."
        ],
        "correct": 0,
        "explanation": "`> ANY` means greater than at least one element in the set, which is logically equivalent to `> MIN(...)`. Conversely, `> ALL` means greater than every element, which is logically equivalent to `> MAX(...)`."
      },
      {
        "id": 12,
        "difficulty": "medium",
        "type": "theory",
        "question": "Where can an `ORDER BY` clause be placed in a compound query that combines results using `UNION`?",
        "options": [
          "Inside each individual SELECT statement.",
          "Only at the very end of the entire compound query, sorting the final combined result set.",
          "ORDER BY is forbidden in queries that use UNION.",
          "Only inside the first SELECT query."
        ],
        "correct": 1,
        "explanation": "In ANSI SQL, individual queries in a `UNION` cannot have their own `ORDER BY` clauses (unless wrapped in subqueries). The `ORDER BY` clause must appear at the very end to sort the combined result."
      },
      {
        "id": 13,
        "difficulty": "medium",
        "type": "theory",
        "question": "What happens if a Scalar Subquery placed in a `SELECT` projection returns MORE than one row at runtime?",
        "options": [
          "The database automatically takes the first row.",
          "The database throws a runtime error: 'Subquery returned more than 1 value'.",
          "The subquery converts the results into a comma-separated string.",
          "The query hangs indefinitely."
        ],
        "correct": 1,
        "explanation": "A scalar subquery in a SELECT projection or comparison expression must return strictly zero or one row. Returning 2 or more rows causes a runtime cardinality violation error."
      },
      {
        "id": 14,
        "difficulty": "medium",
        "type": "theory",
        "question": "Which clause names a reusable named subquery block at the beginning of a statement (Common Table Expression)?",
        "options": [
          "LET",
          "WITH",
          "DECLARE",
          "CTE"
        ],
        "correct": 1,
        "explanation": "The `WITH` clause defines a Common Table Expression (CTE), creating a temporary named result set that can be referenced multiple times within the subsequent query."
      },
      {
        "id": 15,
        "difficulty": "query",
        "type": "coding",
        "question": "Which Correlated Subquery finds all employees who earn strictly MORE than the average salary of their own department?",
        "options": [
          "SELECT e.emp_id, e.name, e.salary, e.dept_id\nFROM Employees e\nWHERE e.salary > (\n  SELECT AVG(sub.salary)\n  FROM Employees sub\n  WHERE sub.dept_id = e.dept_id\n);",
          "SELECT * FROM Employees WHERE salary > AVG(salary);",
          "SELECT e.emp_id, e.salary FROM Employees e WHERE e.salary > (SELECT AVG(salary) FROM Employees);",
          "SELECT e.emp_id FROM Employees e GROUP BY e.dept_id HAVING e.salary > AVG(salary);"
        ],
        "correct": 0,
        "explanation": "Option A correlates the inner query to the outer query via `sub.dept_id = e.dept_id`. For each employee, the inner query computes the average salary of their specific department."
      },
      {
        "id": 16,
        "difficulty": "query",
        "type": "coding",
        "question": "Which query finds the second-highest salary in an `Employees` table without using window functions?",
        "options": [
          "SELECT MAX(salary) AS second_highest\nFROM Employees\nWHERE salary < (\n  SELECT MAX(salary)\n  FROM Employees\n);",
          "SELECT salary FROM Employees ORDER BY salary DESC LIMIT 1 OFFSET 2;",
          "SELECT MIN(salary) FROM Employees WHERE salary > 2;",
          "SELECT MAX(salary) - 1 FROM Employees;"
        ],
        "correct": 0,
        "explanation": "The inner query finds the absolute highest salary. The outer query finds the maximum salary strictly less than that maximum, yielding the true second highest salary (and handling ties cleanly)."
      },
      {
        "id": 17,
        "difficulty": "query",
        "type": "coding",
        "question": "Which query retrieves customers who have placed at least one order using `EXISTS`?",
        "options": [
          "SELECT c.cust_id, c.cust_name\nFROM Customers c\nWHERE EXISTS (\n  SELECT 1\n  FROM Orders o\n  WHERE o.cust_id = c.cust_id\n);",
          "SELECT c.cust_id FROM Customers c WHERE EXISTS (SELECT * FROM Orders);",
          "SELECT c.cust_id FROM Customers c WHERE c.cust_id EXISTS (Orders.cust_id);",
          "SELECT c.cust_id FROM Customers c WHERE (SELECT COUNT(*) FROM Orders) > 0;"
        ],
        "correct": 0,
        "explanation": "The correlated condition `o.cust_id = c.cust_id` inside `EXISTS` ensures that the outer customer row is kept if and only if that specific customer has matching order records."
      },
      {
        "id": 18,
        "difficulty": "query",
        "type": "coding",
        "question": "Which query combines customer names from `US_Clients` and `EU_Clients` and removes duplicate entries?",
        "options": [
          "SELECT client_name, email FROM US_Clients\nUNION\nSELECT client_name, email FROM EU_Clients;",
          "SELECT client_name FROM US_Clients UNION ALL SELECT client_name FROM EU_Clients;",
          "SELECT client_name FROM US_Clients JOIN EU_Clients ON client_name;",
          "SELECT client_name FROM US_Clients INTERSECT SELECT client_name FROM EU_Clients;"
        ],
        "correct": 0,
        "explanation": "`UNION` merges the two result sets and removes duplicate rows across regions. `UNION ALL` would retain duplicates."
      },
      {
        "id": 19,
        "difficulty": "query",
        "type": "coding",
        "question": "Which query finds product IDs that appear in `CurrentCatalog` but do NOT appear in `DiscontinuedCatalog` using set operations?",
        "options": [
          "SELECT product_id FROM CurrentCatalog\nEXCEPT\nSELECT product_id FROM DiscontinuedCatalog;",
          "SELECT product_id FROM CurrentCatalog INTERSECT SELECT product_id FROM DiscontinuedCatalog;",
          "SELECT product_id FROM CurrentCatalog UNION SELECT product_id FROM DiscontinuedCatalog;",
          "SELECT product_id FROM CurrentCatalog WHERE product_id != DiscontinuedCatalog;"
        ],
        "correct": 0,
        "explanation": "`EXCEPT` (or `MINUS` in Oracle) subtracts the second dataset from the first, leaving only products exclusive to `CurrentCatalog`."
      },
      {
        "id": 20,
        "difficulty": "query",
        "type": "coding",
        "question": "Which query uses a Derived Table in the `FROM` clause to find the average of department total salaries?",
        "options": [
          "SELECT AVG(dept_total) AS avg_dept_spend\nFROM (\n  SELECT dept_id, SUM(salary) AS dept_total\n  FROM Employees\n  GROUP BY dept_id\n) AS dept_summaries;",
          "SELECT AVG(SUM(salary)) FROM Employees GROUP BY dept_id;",
          "SELECT dept_id, AVG(salary) FROM Employees GROUP BY dept_id;",
          "SELECT AVG(salary) FROM (SELECT salary FROM Employees);"
        ],
        "correct": 0,
        "explanation": "SQL does not allow nested aggregate functions like `AVG(SUM(salary))`. Using a derived table `dept_summaries` in the `FROM` clause pre-calculates the department totals, enabling the outer query to compute their average."
      }
    ]
  }
};
