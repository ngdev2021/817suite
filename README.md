
A backend application for managing workflows and funnels, designed with PostgreSQL, Node.js, and Express. This repository includes robust APIs, database models, and tests to ensure functionality.

## Table of Contents
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Testing](#testing)
- [Known Issues](#known-issues)
- [Future Features](#future-features)

---

## Features
- **User Management**: Register and log in users securely with hashed passwords.
- **Workflow Management**: Create and retrieve workflows with triggers and actions.
- **Funnel Management**: Add, update, and delete funnels with analytics tracking.
- **Database**: PostgreSQL for persistent data storage.
- **Middleware**: Authentication middleware to secure API endpoints.

---

## Setup

### Prerequisites
- Node.js (v20.15.0 or later)
- PostgreSQL
- Git

### Installation
1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/ngdev2021/817suite.git
   cd 817suite/workflow_funnel_backend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Configure the environment:
   - Create a \`.env\` file with the following variables:
     \`\`\`env
     DATABASE_URL=your_postgres_connection_string
     PORT=5000
     JWT_SECRET=your_jwt_secret
     \`\`\`

4. Run database migrations and seed data:
   \`\`\`bash
   node src/config/db.js
   \`\`\`

5. Start the server:
   \`\`\`bash
   npm start
   \`\`\`

---

## Usage
- The server will run on \`http://localhost:5000\`.
- Available endpoints:
  - **Users**:
    - \`POST /api/users/register\`: Register a user.
    - \`POST /api/users/login\`: Log in a user.
  - **Workflows**:
    - \`POST /api/workflows\`: Create a workflow.
    - \`GET /api/workflows\`: Retrieve all workflows.
  - **Funnels**:
    - \`POST /api/funnels\`: Create a funnel.
    - \`GET /api/funnels\`: Retrieve all funnels.

---

## Testing

### Run Standalone Tests
Standalone tests verify individual features:
\`\`\`bash
node test_db.js      # Test database connection
node test_funnel.js  # Test funnel endpoints
node test_workflow.js # Test workflow endpoints
\`\`\`

### Run Jest Tests
Comprehensive tests for all features:
\`\`\`bash
npm test -- --detectOpenHandles
\`\`\`

---

## Known Issues
1. **Jest Test Timeouts**:
   - Timeout errors due to unresolved asynchronous operations.
   - See \`JEST_ISSUES.md\` for details and workarounds.

2. **Open Handles**:
   - Persistent open TCP connections in Jest tests.
   - Mitigated by using standalone tests for now.

---

## Future Features
1. **Enhanced Analytics**:
   - Track detailed funnel performance metrics.
2. **Frontend Integration**:
   - Develop a React-based frontend to interact with APIs.
3. **Improved Test Suite**:
   - Resolve Jest test timeouts and optimize database transactions.
4. **Authorization Roles**:
   - Add role-based access control (e.g., admin vs. user).
5. **Workflow Automation**:
   - Implement cron jobs for automated workflow triggers.
6. **CI/CD Pipeline**:
   - Set up GitHub Actions for automated testing and deployment.
7. **API Documentation**:
   - Use Swagger for comprehensive API documentation.

---

## Contributing
1. Fork the repository.
2. Create a feature branch:
   \`\`\`bash
   git checkout -b feature/branch-name
   \`\`\`
3. Commit your changes:
   \`\`\`bash
   git commit -m "Add feature description"
   \`\`\`
4. Push to the branch:
   \`\`\`bash
   git push origin feature/branch-name
   \`\`\`
5. Open a pull request.

---

## License
[MIT License](LICENSE)

---

## Contact
**Author**: Reginald Brown (Reggie)  
**GitHub**: [@ngdev2021](https://github.com/ngdev2021)  
`;
