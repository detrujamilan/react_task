# assement-task-react

**Assessment Task: Create a React Application**

**Objective:** Develop a React application that allows users to register, login, and view a dashboard that displays user details in a table. The application should utilize MUI for UI components and theming, Zustand for state management, React Query for data fetching, Tanstack Table for tabular data, and react-hook-form for form handling.

**Technologies:**
- React
- MUI (Material-UI)
- Zustand
- React Query
- Tanstack Table
- react-hook-form

**Functional Requirements:**

1. **Login Page:**
   - Users should be able to log in using their email and password.
   - Implement form validation using react-hook-form.
   - Use React Query to handle API requests.
   - Redirect to the dashboard upon successful login.

2. **Signup Page:**
   - Users should be able to register by providing necessary details as per API requirements.
   - Implement form validation and submission using react-hook-form.
   - Use React Query to handle API requests.
   - Redirect to the login page upon successful registration.

3. **Dashboard:**
   - Display the logged-in user's name on the header.
   - Implement logout functionality that redirects the user to the login page upon logout.
   - Use Tanstack Table to display a table of all user details fetched from the API using React Query.
   - Ensure the dashboard is accessible only to logged-in users.
   - If token is not valid user should direct go to this page.

**Non-Functional Requirements:**

1. **Theming:**
   - Use MUI to implement UI components and theming.
   - Provide a toggle to switch between dark and light themes.

2. **State Management:**
   - Use Zustand for managing global application state, such as user authentication status and user details.

**Additional Notes:**

- Ensure the application is responsive and provides a user-friendly experience.
- Implement error handling and display appropriate error messages to the user.
- Ensure code is clean, modular, and follows best practices for maintainability and readability.

**Deliverables:**

- Source code repository containing the React application.
- A README file containing:
  - Instructions on how to set up, run, and use the application.
  - A brief overview of the application structure and components.
- A demo of the application (optional, but recommended).

**Evaluation Criteria:**

- **Functionality:** Does the application perform as expected for all requirements?
- **Code Quality:** Is the code well-organized, easy to read, and follows best practices?
- **UI/UX:** Is the application easy to use and navigate? Is the design aesthetically pleasing?
- **Error Handling:** How well does the application handle potential errors and edge cases?
- **Documentation:** Is the documentation clear and does it effectively explain how to set up and use the application?

**Following Backen Repo**
https://github.com/Dot3-Solutions/assetment-task-backend.git

**PostMan collection**
https://api.postman.com/collections/27155561-ad9760ef-6a1a-4880-867d-902fcb5efdf8?access_key=PMAT-01HC4461X43ZPKQY99XBS3DB91
