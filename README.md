Restaurant Menu Application

This project is a single-page web application built with Vue.js for the frontend, Tailwind CSS for styling, and Pinia for state management. The application displays a restaurant menu, allows users to add or remove items from a cart, and suggests meals based on user preferences through integration with the OpenAI API.

Features

Menu Display:
Organizes menu items by categories such as Appetizers, Mains, Desserts, etc. Each item includes: Title, Description, Price, Image (optional), Tags (e.g., Gluten-Free, Vegan)

Cart Functionality:
Users can add items to the cart, modify item quantities, remove items, and view the current total price of the cart.

Meal Suggestion:
Provides an input field where users can describe their dietary restrictions, preferences, and spice tolerance (e.g., "gluten-free, spicy, vegan").
Uses OpenAI API to suggest meals based on user input. The suggestion updates dynamically as the user types.

Prerequisites
Ensure you have the following installed:
Node.js (version 14 or above)
npm (version 6 or above)

Setup Instructions
1. Clone the repository
git clone https://github.com/your-username/restaurant-menu-app.git
cd restaurant-menu-app

3. Run the Development Server
Once the dependencies are installed, you can run the development server using:
npm run serve
Visit http://localhost:8080 in your browser to see the application in action.

4. Build for Production
When you're ready to deploy, build the project for production:
npm run build
This will generate a dist folder with the optimized production files.

5. Lint and Fix Files
To ensure that your code follows best practices and is properly formatted, you can lint your files:
npm run lint
This will check your files for any issues and automatically fix them where possible.

Usage Instructions

View Menu: The menu will be displayed in an organized layout with various categories like Soups, Salads, Mains, etc.

Add Items to Cart: Click on the "Add to Cart" button next to each menu item. The cart icon in the top right will update with the number of items added.

Modify Cart: Users can click on the cart icon to view the cart, adjust item quantities, or remove items.

Meal Suggestion:
Enter dietary preferences, restrictions, or taste preferences (e.g., "spicy, vegan") in the input field under the search bar. The meal suggestions will update in real-time, filtered based on the menu items and your preferences.

Category Navigation: Click on any of the category buttons to quickly navigate to that section of the menu.

Back to Menu: After receiving suggestions, you can click "Back to Menu" to return to the full menu.

Folder Structure
/src
  /assets              # Static files (images, fonts, etc.)
  /components          # Reusable components
  /views               # Vue pages (HomePage, MealSuggestions, etc.)
  /services            # External API calls (e.g., OpenAI API)
  /store               # Pinia state management store
  /router              # Vue Router setup for navigation
  /styles              # Global styles
/public
  /index.html          # Main HTML template
.env                    # Environment variable for API keys

Technologies Used
Vue.js: Framework for building the app's UI.
Tailwind CSS: Utility-first CSS framework for styling.
Pinia: State management solution for Vue.js.
Hugging Face API: Used to generate meal suggestions based on user preferences.
Axios: HTTP client to interact with APIs.

License
This project is licensed under the MIT License - see the LICENSE file for details.

