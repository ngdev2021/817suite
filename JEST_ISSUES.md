# Jest Test Issues

## Summary
The Jest test suite is currently facing issues related to asynchronous operations and server cleanup. These problems are preventing the tests from completing successfully.

---

## Observed Issues

### 1. **Timeout Errors**
- **Description**: Tests exceed the default timeout of 30 seconds.
- **Possible Causes**:
  - Open database connections not closed after tests.
  - Server (`app.listen`) not properly stopped after each test.

### 2. **Open Handles**
- **Description**: Jest detects lingering open handles (e.g., TCPWRAP).
- **Cause**: Test server (`server.listen`) or database connections remain active after tests.

---

## Current Workaround
### Standalone Test Scripts
- Standalone scripts like `test_db`, `test_funnel`, and `test_workflow` confirm that:
  - Database connections work.
  - API endpoints function as expected.

### Standalone Scripts Completed:
- `test_db.js`: Verifies database connection.
- `test_funnel.js`: Validates CRUD operations on the funnel.
- `test_workflow.js`: Confirms workflow-related endpoints.

---

## Next Steps
1. **Revisit Jest Tests Later**:
   - Debug asynchronous operations.
   - Use `jest --detectOpenHandles` for deeper insights.
   - Consider transaction-based test isolation with PostgreSQL.

2. **Proceed with Development**:
   - Build additional features.
   - Use standalone scripts for critical functionality.

---

## Notes
The Jest issues do not block the application’s core functionality. Manual and standalone testing confirms the app is stable and working as intended.
