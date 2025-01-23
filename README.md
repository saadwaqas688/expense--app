This Node.js application provides APIs for managing user accounts and financial data. The APIs cover functionalities like user registration, login, account updates, and managing financial records such as expenses, taxes, invoices, and incomes. JWT authentication ensures secure access to protected routes.

Features:

User Registration:

                 Allows new users to register their accounts.

User Login:

                Users can log in using their credentials.Upon successful login, a JWT token is generated for authentication.JWT Authentication.All APIs, except registration and login, require a valid JWT token for access.

Account Management:

                Update user account information.Add bank details.

Financial Data Management:
               Add records for Expenses,Taxes,Invoices,Incomes

View Financial Data:

              Retrieve detailed records of Expenses,Taxes,Invoices,Incomes.Data is displayed in a quarterly format.